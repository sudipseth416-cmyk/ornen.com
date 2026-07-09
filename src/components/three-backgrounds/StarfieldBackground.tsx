"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";

/* ───────────── CONFIG ───────────── */
const CONFIG = {
  bgColor: "#0a0a24",
  flameColor: "#aee9ff",
  flameColor2: "#c79bff",
  flameAmt: 0.2,
  colorA: "#aef6cf",
  colorB: "#5fe6a0",
  colorC: "#eafff2",
  opacity: 2,
  pointSize: 50,
  brightness: 1.85,
  drift: 2.35,
  twinkle: 1,
  spin: 0.03,
  repelRadius: 5,
  repelStrength: 0.35,
};

/* ───────────── helpers ───────────── */
function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

/* ───────────── layers ───────────── */
const LAYERS = {
  NONE: 0,
  TORUS_SCENE: 1,
  BLOOM_SCENE: 2,
  ENTIRE_SCENE: 3,
};

/* ───────────── star vertex shader ───────────── */
const starVertexShader = /* glsl */ `
uniform float uTime; uniform float uSize; uniform float uDrift; uniform float uDepth; uniform float uTwinkle;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uColorC;
attribute float aScale; attribute float aPhase; attribute float aPalette; attribute float aBright;
varying vec3 vColor; varying float vTwinkle;
void main() {
  vec3 pos = position;
  pos.z = mod(pos.z + uDrift + (uDepth * 0.5), uDepth) - (uDepth * 0.5);
  float tw = sin(uTime * 1.6 + aPhase * 6.2831);
  vTwinkle = (1.0 - uTwinkle) + uTwinkle * (0.55 + 0.45 * tw);
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec3 toParticle = modelPosition.xyz - uCursor;
  float dist = length(toParticle);
  float falloff = smoothstep(uRepelRadius, 0.0, dist);
  modelPosition.xyz += normalize(toParticle + vec3(0.0001)) * falloff * uRepelStrength * uActivity;
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / -viewPosition.z);
  vec3 base = aPalette < 0.5 ? uColorA : (aPalette < 1.5 ? uColorB : uColorC);
  vColor = base * aBright;
}
`;

/* ───────────── star fragment shader ───────────── */
const starFragmentShader = /* glsl */ `
uniform float uOpacity; uniform float uBrightness;
varying vec3 vColor; varying float vTwinkle;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float strength = pow(1.0 - d * 2.0, 4.0);
  vec3 color = mix(vec3(0.0), vColor, strength);
  gl_FragColor = vec4(color * uBrightness, strength * uOpacity * vTwinkle);
}
`;

/* ───────────── final-pass shaders ───────────── */
const finalPassVertexShader = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const finalPassFragmentShader = /* glsl */ `
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

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */
export function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ---- renderer ---- */
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NoToneMapping;

    /* ---- scene / camera ---- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, -10);

    /* ---- star geometry ---- */
    const COUNT = 4200;
    const DEPTH = 30;

    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const palettes = new Float32Array(COUNT);
    const brights = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 24;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
      palettes[i] = Math.floor(Math.random() * 3);
      brights[i] = 0.7 + Math.random() * 0.6;
      scales[i] = 0.5 + Math.pow(Math.random(), 1.4) * 2.5;
      phases[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aPalette", new THREE.BufferAttribute(palettes, 1));
    geometry.setAttribute("aBright", new THREE.BufferAttribute(brights, 1));

    /* ---- star material ---- */
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: CONFIG.pointSize },
      uOpacity: { value: 0 }, // animated to CONFIG.opacity
      uDrift: { value: 0 },
      uDepth: { value: DEPTH },
      uTwinkle: { value: CONFIG.twinkle },
      uCursor: { value: new THREE.Vector3(0, 0, 0) },
      uRepelRadius: { value: CONFIG.repelRadius },
      uRepelStrength: { value: CONFIG.repelStrength },
      uActivity: { value: 0 },
      uColorA: { value: new THREE.Color(CONFIG.colorA) },
      uColorB: { value: new THREE.Color(CONFIG.colorB) },
      uColorC: { value: new THREE.Color(CONFIG.colorC) },
      uBrightness: { value: CONFIG.brightness },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.layers.enable(LAYERS.BLOOM_SCENE);

    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    /* ---- postprocessing ---- */
    let w = container.clientWidth || 1;
    let h = container.clientHeight || 1;

    // --- Torus composer (layer 1) ---
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(new RenderPass(scene, camera));
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    const torusBloom = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.2,
      0.22,
      0
    );
    torusComposer.addPass(torusBloom);
    torusComposer.addPass(new ShaderPass(CopyShader));

    // --- Bloom composer (layer 2) ---
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(new RenderPass(scene, camera));
    const sceneBloom = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.55,
      0.4,
      0
    );
    bloomComposer.addPass(sceneBloom);
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    // --- Final composer ---
    const FinalPassShader = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null as THREE.Texture | null },
        torusTexture: { value: torusComposer.renderTarget2.texture },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
        haloTexture: { value: null as THREE.Texture | null },
        uBg: { value: hexToVec3(CONFIG.bgColor) },
        uFlameA: { value: hexToVec3(CONFIG.flameColor) },
        uFlameB: { value: hexToVec3(CONFIG.flameColor2) },
        uFlameAmt: { value: CONFIG.flameAmt },
      },
      vertexShader: finalPassVertexShader,
      fragmentShader: finalPassFragmentShader,
    };

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(new RenderPass(scene, camera));
    const finalPass = new ShaderPass(FinalPassShader);
    finalComposer.addPass(finalPass);

    // Create a tiny 1×1 black texture for haloTexture placeholder
    const blackData = new Uint8Array([0, 0, 0, 255]);
    const blackTex = new THREE.DataTexture(blackData, 1, 1, THREE.RGBAFormat);
    blackTex.needsUpdate = true;
    FinalPassShader.uniforms.haloTexture.value = blackTex;

    /* ---- cursor tracking ---- */
    const mouse = new THREE.Vector2(9999, 9999);
    let lastMouseMove = 0;
    const raycaster = new THREE.Raycaster();
    // Invisible plane for raycasting cursor position to world coords
    const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      lastMouseMove = performance.now();
    }
    // Listen on window to capture moves even though canvas has pointer-events:none
    window.addEventListener("pointermove", onPointerMove);

    /* ---- intersection observer ---- */
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    /* ---- fade-in state ---- */
    let fadeStarted = false;
    let fadeStart = 0;
    const FADE_DELAY = 300; // ms
    const FADE_DURATION = 1400; // ms

    /* ---- animation ---- */
    let animationId: number;
    let prevTime = performance.now();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) {
        prevTime = performance.now();
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - prevTime) / 1000, 0.1); // cap to 100ms
      prevTime = now;

      // Time uniform
      uniforms.uTime.value += dt;

      // Continuous drift
      uniforms.uDrift.value += dt * CONFIG.drift;

      // Barrel roll
      group.rotation.z += dt * CONFIG.spin;

      // Fade in
      if (!fadeStarted) {
        fadeStarted = true;
        fadeStart = now;
      }
      const elapsed = now - fadeStart;
      if (elapsed < FADE_DELAY) {
        uniforms.uOpacity.value = 0;
      } else {
        const t = Math.min((elapsed - FADE_DELAY) / FADE_DURATION, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        uniforms.uOpacity.value = eased * CONFIG.opacity;
      }

      // Cursor repel
      raycaster.setFromCamera(mouse, camera);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(cursorPlane, target);
      if (target) {
        uniforms.uCursor.value.copy(target);
      }

      // Activity decay
      const idleMs = now - lastMouseMove;
      if (idleMs < 3000) {
        uniforms.uActivity.value = Math.min(
          uniforms.uActivity.value + dt * 3,
          1
        );
      } else {
        uniforms.uActivity.value = Math.max(
          uniforms.uActivity.value - dt * 1.5,
          0
        );
      }

      // Update final pass time
      FinalPassShader.uniforms.iTime.value = uniforms.uTime.value;

      // Render composers
      // Save original visibility of objects for selective rendering
      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();

      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();

      camera.layers.set(LAYERS.ENTIRE_SCENE);
      camera.layers.enable(LAYERS.NONE);
      camera.layers.enable(LAYERS.BLOOM_SCENE);
      camera.layers.enable(LAYERS.TORUS_SCENE);
      finalComposer.render();
    }

    /* ---- resize ---- */
    function onResize() {
      if (!container) return;
      w = container.clientWidth;
      h = container.clientHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      torusComposer.setSize(w, h);
      bloomComposer.setSize(w, h);
      finalComposer.setSize(w, h);

      torusBloom.resolution.set(w, h);
      sceneBloom.resolution.set(w, h);

      // Update final pass texture refs after resize (composer recreates targets)
      FinalPassShader.uniforms.torusTexture.value =
        torusComposer.renderTarget2.texture;
      FinalPassShader.uniforms.bloomTexture.value =
        bloomComposer.renderTarget2.texture;
    }
    window.addEventListener("resize", onResize);
    onResize();

    animate();

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);

      geometry.dispose();
      material.dispose();
      blackTex.dispose();

      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();

      renderer.dispose();
      container.removeChild(canvas);
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
