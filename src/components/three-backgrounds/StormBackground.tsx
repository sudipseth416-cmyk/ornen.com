"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";

/* ─── helpers ─── */
function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

/* ─── config ─── */
const CONFIG = {
  bgColor: "#1a0418",
  flameColor: "#ff2d6b",
  flameColor2: "#ffd36b",
  flameAmt: 0.2,
  atmoColor: "#ff7ab0",
  atmoCount: 300,
  atmoSize: 24,
  atmoSpeed: 1.0,
  coreColor: "#6a0a2a",
  midColor: "#ff2d6b",
  rimColor: "#ffd36b",
  opacity: 2,
  pointSize: 80,
  brightness: 1.6,
  spin: 0.03,
  blowUp: 0,
  repelRadius: 1.4,
  repelStrength: 4,
};

/* ─── layer constants ─── */
const NONE = 0;
const TORUS_SCENE = 1;
const BLOOM_SCENE = 2;
const ENTIRE_SCENE = 3;

/* ─── shaders ─── */
const particleVertexShader = /* glsl */ `
uniform float uTime; uniform float uSize; uniform float uBlowUp;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
uniform vec3 uCore; uniform vec3 uMid; uniform vec3 uRim;
attribute float aScale; attribute float aNoise; attribute float aRadialPush; attribute float aMix;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec3 pos = position;
  float t = uTime * 1.4 + aNoise * 6.2831;
  float wobble = sin(t) * 0.1 * aRadialPush;
  pos *= 1.0 + wobble;
  float swirlAngle = uTime * 0.05 + aNoise * 6.2831;
  mat2 swirl = mat2(cos(swirlAngle), -sin(swirlAngle), sin(swirlAngle), cos(swirlAngle));
  pos.xz = swirl * pos.xz;
  vec3 outward = normalize(pos + vec3(0.0001));
  float blow = uBlowUp * uBlowUp;
  pos += outward * blow * (10.0 + aNoise * 18.0) * aRadialPush;
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec3 toParticle = modelPosition.xyz - uCursor;
  float dist = length(toParticle);
  float falloff = smoothstep(uRepelRadius, 0.0, dist);
  modelPosition.xyz += normalize(toParticle + vec3(0.0001)) * falloff * uRepelStrength * uActivity;
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);
  float t1 = smoothstep(0.25, 0.85, aMix);
  vec3 mix1 = mix(uCore, uMid, t1);
  float t2 = clamp((aMix - 0.7) * 3.0, 0.0, 1.0);
  vColor = mix(mix1, uRim, t2);
  vBlowUp = uBlowUp;
}
`;

const particleFragmentShader = /* glsl */ `
uniform float uOpacity; uniform float uBrightness;
varying vec3 vColor; varying float vBlowUp;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float strength = pow(1.0 - d * 2.0, 4.5);
  vec3 color = mix(vec3(0.0), vColor, strength);
  float blowFade = 1.0 - smoothstep(0.15, 1.0, vBlowUp);
  gl_FragColor = vec4(color * uBrightness, strength * uOpacity * blowFade);
}
`;

const atmoVertexShader = /* glsl */ `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

const atmoFragmentShader = /* glsl */ `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
`;

const finalVertexShader = /* glsl */ `
varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const finalFragmentShader = /* glsl */ `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
  vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.25, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`;

/* ─── component ─── */
export function StormBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── renderer ── */
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NoToneMapping;

    /* ── scene & camera ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    let w = container.clientWidth;
    let h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 80);
    camera.position.set(0, 0, 7);
    camera.layers.enable(NONE);
    camera.layers.enable(TORUS_SCENE);
    camera.layers.enable(BLOOM_SCENE);
    camera.layers.enable(ENTIRE_SCENE);

    /* ── group for rotation ── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── plasma orb geometry ── */
    const count = 50000;
    const radius = 2.5;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const noises = new Float32Array(count);
    const radialPush = new Float32Array(count);
    const mixv = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let u: number, v: number, s: number;
      do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
      } while (s >= 1 || s === 0);
      const factor = 2 * Math.sqrt(1 - s);
      const dx = u * factor;
      const dy = v * factor;
      const dz = 1 - 2 * s;
      const rN = Math.pow(Math.random(), 0.4);
      const r = radius * (0.55 + rN * 0.45);
      positions[i3] = dx * r;
      positions[i3 + 1] = dy * r;
      positions[i3 + 2] = dz * r;
      mixv[i] = rN;
      scales[i] = 0.45 + Math.random() * 0.8;
      noises[i] = Math.random();
      radialPush[i] = 0.4 + rN * 1.1;
    }

    const orbGeo = new THREE.BufferGeometry();
    orbGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    orbGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    orbGeo.setAttribute("aNoise", new THREE.BufferAttribute(noises, 1));
    orbGeo.setAttribute("aRadialPush", new THREE.BufferAttribute(radialPush, 1));
    orbGeo.setAttribute("aMix", new THREE.BufferAttribute(mixv, 1));

    /* ── plasma orb material ── */
    const orbUniforms = {
      uTime: { value: 0 },
      uSize: { value: CONFIG.pointSize },
      uOpacity: { value: 0 },
      uBlowUp: { value: CONFIG.blowUp },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: CONFIG.repelRadius },
      uRepelStrength: { value: CONFIG.repelStrength },
      uActivity: { value: 0 },
      uCore: { value: hexToVec3(CONFIG.coreColor) },
      uMid: { value: hexToVec3(CONFIG.midColor) },
      uRim: { value: hexToVec3(CONFIG.rimColor) },
      uBrightness: { value: CONFIG.brightness },
    };

    const orbMat = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: orbUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const orbPoints = new THREE.Points(orbGeo, orbMat);
    orbPoints.layers.set(BLOOM_SCENE);
    group.add(orbPoints);

    /* ── atmosphere motes ── */
    const N = CONFIG.atmoCount;
    const atmoPositions = new Float32Array(N * 3);
    const atmoSizes = new Float32Array(N);
    const atmoSeeds = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      atmoPositions[i * 3] = 2 * Math.random() - 1;
      atmoPositions[i * 3 + 1] = 2 * Math.random() - 1;
      atmoPositions[i * 3 + 2] = 2 * Math.random() - 1;
      atmoSizes[i] = CONFIG.atmoSize * (0.4 + Math.random());
      atmoSeeds[i] = Math.random();
    }

    const atmoGeo = new THREE.BufferGeometry();
    atmoGeo.setAttribute("position", new THREE.BufferAttribute(atmoPositions, 3));
    atmoGeo.setAttribute("size", new THREE.BufferAttribute(atmoSizes, 1));
    atmoGeo.setAttribute("seed", new THREE.BufferAttribute(atmoSeeds, 1));

    const dpr = renderer.getPixelRatio();
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: atmoVertexShader,
      fragmentShader: atmoFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3(CONFIG.atmoColor) },
        uRes: { value: new THREE.Vector2(w * dpr, h * dpr) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });

    const atmoPoints = new THREE.Points(atmoGeo, atmoMat);
    atmoPoints.frustumCulled = false;
    atmoPoints.layers.set(ENTIRE_SCENE);
    atmoPoints.onBeforeRender = () => {
      const t = performance.now() / 1000;
      atmoMat.uniforms.uTime.value = t * CONFIG.atmoSpeed * 8.0;
      atmoPoints.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;
    };
    scene.add(atmoPoints);

    /* ── postprocessing ── */
    // A blank 1x1 black texture for haloTexture (no halo mesh in this component)
    const blackPixel = new Uint8Array([0, 0, 0, 255]);
    const haloTex = new THREE.DataTexture(blackPixel, 1, 1, THREE.RGBAFormat);
    haloTex.needsUpdate = true;

    // Final composite pass
    const FinalPassShader = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null },
        torusTexture: { value: null },
        bloomTexture: { value: null },
        haloTexture: { value: haloTex },
        uBg: { value: hexToVec3(CONFIG.bgColor) },
        uFlameA: { value: hexToVec3(CONFIG.flameColor) },
        uFlameB: { value: hexToVec3(CONFIG.flameColor2) },
        uFlameAmt: { value: CONFIG.flameAmt },
      },
      vertexShader: finalVertexShader,
      fragmentShader: finalFragmentShader,
    };

    const finalPass = new ShaderPass(FinalPassShader);

    // Torus composer (renderToScreen = false)
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(new RenderPass(scene, camera));
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(
      new UnrealBloomPass(new THREE.Vector2(w, h), 0.22, 0.2, 0)
    );
    torusComposer.addPass(new ShaderPass(CopyShader));

    // Bloom composer (renderToScreen = false)
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(new RenderPass(scene, camera));
    bloomComposer.addPass(
      new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.55, 0)
    );
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    // Final composer (renderToScreen = true)
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(new RenderPass(scene, camera));
    finalComposer.addPass(finalPass);

    // Wire textures
    finalPass.uniforms.bloomTexture.value =
      bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value =
      torusComposer.renderTarget1.texture;

    /* ── cursor tracking ── */
    const mouse = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const cursorTarget = new THREE.Vector3();
    let lastMouseMove = 0;
    let activity = 0;

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      lastMouseMove = performance.now();
    }
    container.style.pointerEvents = "none";
    // Attach to window so we can still track the cursor even with pointer-events: none on container
    window.addEventListener("pointermove", onPointerMove);

    /* ── intersection observer ── */
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    /* ── fade-in ── */
    let started = false;
    let fadeStart = 0;
    const FADE_DELAY = 300;
    const FADE_DURATION = 1400;

    /* ── animation ── */
    let animationId: number;
    let prevTime = performance.now();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;
      const t = now / 1000;

      // Fade-in logic
      if (!started) {
        started = true;
        fadeStart = now;
      }
      const elapsed = now - fadeStart;
      if (elapsed > FADE_DELAY) {
        const fadeProgress = Math.min(
          (elapsed - FADE_DELAY) / FADE_DURATION,
          1
        );
        orbUniforms.uOpacity.value = fadeProgress * CONFIG.opacity;
      }

      // Update time
      orbUniforms.uTime.value = t;

      // Group rotation
      group.rotation.y += dt * CONFIG.spin;
      group.rotation.x += dt * CONFIG.spin * 0.33;

      // Cursor repel: project mouse onto z=0 plane in world space
      raycaster.setFromCamera(mouse, camera);
      const intersection = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(cursorPlane, intersection)) {
        cursorTarget.copy(intersection);
      }
      orbUniforms.uCursor.value.lerp(cursorTarget, 0.08);

      // Activity decay: active when mouse recently moved
      const timeSinceMove = (now - lastMouseMove) / 1000;
      const targetActivity = timeSinceMove < 3 ? 1 : 0;
      activity += (targetActivity - activity) * (1 - Math.exp(-dt * 2));
      orbUniforms.uActivity.value = activity;

      // Render with layer switching
      camera.layers.set(TORUS_SCENE);
      torusComposer.render();
      camera.layers.set(BLOOM_SCENE);
      bloomComposer.render();
      camera.layers.set(ENTIRE_SCENE);
      finalComposer.render();
    }
    animate();

    /* ── resize ── */
    function onResize() {
      if (!container) return;
      w = container.clientWidth;
      h = container.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const currentDpr = renderer.getPixelRatio();
      atmoMat.uniforms.uRes.value.set(w * currentDpr, h * currentDpr);

      torusComposer.setSize(w, h);
      bloomComposer.setSize(w, h);
      finalComposer.setSize(w, h);

      // Re-wire textures after resize (composers recreate render targets)
      finalPass.uniforms.bloomTexture.value =
        bloomComposer.renderTarget1.texture;
      finalPass.uniforms.torusTexture.value =
        torusComposer.renderTarget1.texture;
    }
    window.addEventListener("resize", onResize);
    onResize();

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);

      orbGeo.dispose();
      orbMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      haloTex.dispose();

      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();

      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
