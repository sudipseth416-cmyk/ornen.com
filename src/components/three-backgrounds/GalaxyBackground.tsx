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

function smootherstep(t: number): number {
  t = Math.max(0, Math.min(1, t));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/* ─── fixed parameters ─── */
const coreColor = "#fff3b0",
  midColor = "#ffb52a",
  rimColor = "#3a1402";
const twinkleColor = "#ff5e8a";
const galaxyCount = 79,
  spread = 13,
  R = 1.7;
const tumbleSpeed = 0.2,
  wobbleAmount = 0.205,
  wobbleSpeed = 0.35;
const gradientPow = 0.2,
  twinkleAmount = 0.71,
  twinkleSpeed = 2.45;
const cornerBlue = "#ffcf2a",
  cornerOrange = "#ff3b1f";
const atmoColor = "#ffd9a0",
  atmoCount = 350,
  atmoSize = 14,
  atmoSpeed = 0.8;

/* ─── shader sources ─── */
const galaxyVertexShader = /* glsl */ `
attribute float size; attribute float id; attribute float shell;
uniform float iTime; uniform float iAnimate; uniform float uExpand;
uniform float uWobbleAmount; uniform float uWobbleSpeed;
varying float vShell; varying float vId;
void main() {
  vShell = shell; vId = id;
  float ph = id * 6.2831853;
  vec3 wob = vec3(sin(iTime * uWobbleSpeed + ph),
                  cos(iTime * uWobbleSpeed * 1.3 + ph),
                  sin(iTime * uWobbleSpeed * 0.7 + ph)) * uWobbleAmount;
  vec3 p = (position + wob) * uExpand;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = size / -mv.z * (0.5 + 0.5 * iAnimate);
  vec4 res = projectionMatrix * mv;
  float a = pow(iAnimate, 0.6);
  res.xy *= clamp(2.0 * a + pow(id, 0.7) - 1.0, 0.0, 1.0);
  gl_Position = res;
}
`;

const galaxyFragmentShader = /* glsl */ `
uniform float iTime; uniform float uOpacity;
uniform vec3 uCore; uniform vec3 uMid; uniform vec3 uRim; uniform vec3 uTwinkle;
uniform float uGradientPow; uniform float uTwinkleAmount; uniform float uTwinkleSpeed;
varying float vShell; varying float vId;
vec3 grad3(vec3 a, vec3 b, vec3 c, float t) {
  return t < 0.5 ? mix(a, b, t * 2.0) : mix(b, c, clamp((t - 0.5) * 2.0, 0.0, 1.0));
}
void main() {
  float t = pow(vShell, uGradientPow);
  vec3 col = grad3(uCore, uMid, uRim, t);
  float tw = 0.5 + 0.5 * sin(iTime * uTwinkleSpeed + vId * 100.0);
  col = mix(col, uTwinkle, tw * uTwinkleAmount * (1.0 - t));
  col *= (0.45 + 0.85 * (1.0 - t));
  float tex = 1.0 - smoothstep(0.5, 1.0, length(2.0 * gl_PointCoord - 1.0));
  gl_FragColor = vec4(col * tex, tex * uOpacity);
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
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const finalFragmentShader = /* glsl */ `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 iCornerBlue; uniform vec3 iCornerOrange; varying vec2 vUv;
vec3 warp3d(vec3 pos, float t) {
  float curv = .8, a = 1.9, b = 0.7; pos *= 2.;
  pos.x += curv * sin(t + a * pos.y) + t * b; pos.y += curv * cos(t + a * pos.x);
  pos.y += curv * sin(t + a * pos.z) + t * b; pos.z += curv * cos(t + a * pos.y);
  pos.z += curv * sin(t + a * pos.x) + t * b; pos.x += curv * cos(t + a * pos.z);
  return 0.5 + 0.5 * cos(pos.xyz + vec3(1, 2, 4));
}
void main() {
  vec2 uv = 2. * vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime * 1.5), vec3(1.5));
  vec3 col = 1.5 * iCornerBlue * w.x; col *= w.y; col += iCornerOrange * w.z;
  col *= smoothstep(0.6, 1., abs(uv.y));
  col *= smoothstep(-.5, 1., -uv.y*uv.x); col *= smoothstep(-.5, 1., -uv.y*uv.x);
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  vec3 atmoBg = vec3(0.02, 0.03, 0.10) * (1.0 - 0.4 * length(uv));
  gl_FragColor = vec4(atmoBg + col * 0.2 + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`;

/* ─── layers ─── */
const LAYER_NONE = 0;
const LAYER_TORUS_SCENE = 1;
const LAYER_BLOOM_SCENE = 2;
const LAYER_ENTIRE_SCENE = 3;

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ─── renderer ─── */
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClear = false;

    /* ─── scene / camera ─── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    let w = container.clientWidth;
    let h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 80);
    camera.position.set(0, 0, 14);
    camera.layers.enable(LAYER_ENTIRE_SCENE);

    /* ─── galaxy cloud geometry ─── */
    const N = 90000;
    const K = galaxyCount;
    const SP = spread;

    const positions = new Float32Array(N * 3);
    const shells = new Float32Array(N);
    const sizes = new Float32Array(N);
    const ids = new Float32Array(N);

    interface Frame {
      m: THREE.Matrix4;
      size: number;
      ecc: number;
      thick: number;
      ox: number;
      oy: number;
      oz: number;
    }

    const frames: Frame[] = [];
    for (let k = 0; k < K; k++) {
      frames.push({
        m: new THREE.Matrix4().makeRotationFromEuler(
          new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          )
        ),
        size: 0.18 + 0.34 * Math.random(),
        ecc: 0.45 + 0.42 * Math.random(),
        thick: 0.06 + 0.05 * Math.random(),
        ox: (Math.random() - 0.5) * 2 * SP,
        oy: (Math.random() - 0.5) * 2 * SP,
        oz: (Math.random() - 0.5) * 2 * SP * 0.6,
      });
    }

    const tmp = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      const f = frames[i % K];
      const th = Math.random() * 2 * Math.PI;
      const rad = Math.pow(Math.random(), 1.4);
      const rx = f.size * R * rad;
      const rz = f.size * R * f.ecc * rad;
      const y = (Math.random() - 0.5) * 2 * f.thick * R * rad;
      tmp
        .set(rx * Math.cos(th), y, rz * Math.sin(th))
        .applyMatrix4(f.m);
      tmp.x += f.ox;
      tmp.y += f.oy;
      tmp.z += f.oz;
      positions[i * 3] = tmp.x;
      positions[i * 3 + 1] = tmp.y;
      positions[i * 3 + 2] = tmp.z;
      shells[i] = rad;
      sizes[i] = 6 + 9 * Math.random();
      ids[i] = Math.random();
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    galaxyGeo.setAttribute("shell", new THREE.BufferAttribute(shells, 1));
    galaxyGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    galaxyGeo.setAttribute("id", new THREE.BufferAttribute(ids, 1));

    const galaxyUniforms = {
      iTime: { value: 0 },
      iAnimate: { value: 0 },
      uExpand: { value: 1 },
      uOpacity: { value: 1 },
      uWobbleAmount: { value: wobbleAmount },
      uWobbleSpeed: { value: wobbleSpeed },
      uCore: { value: hexToVec3(coreColor) },
      uMid: { value: hexToVec3(midColor) },
      uRim: { value: hexToVec3(rimColor) },
      uTwinkle: { value: hexToVec3(twinkleColor) },
      uGradientPow: { value: gradientPow },
      uTwinkleAmount: { value: twinkleAmount },
      uTwinkleSpeed: { value: twinkleSpeed },
    };

    const galaxyMat = new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: galaxyUniforms,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const galaxyCloud = new THREE.Points(galaxyGeo, galaxyMat);
    galaxyCloud.position.set(0, 0, -0.8);
    galaxyCloud.layers.set(LAYER_ENTIRE_SCENE);

    const group = new THREE.Group();
    group.add(galaxyCloud);
    group.position.z = -20; // start off-screen for slide-in
    scene.add(group);

    /* ─── atmosphere motes ─── */
    const atmoN = atmoCount;
    const atmoPositions = new Float32Array(atmoN * 3);
    const atmoSizes = new Float32Array(atmoN);
    const atmoSeeds = new Float32Array(atmoN);

    for (let i = 0; i < atmoN; i++) {
      atmoPositions[i * 3] = 2 * Math.random() - 1;
      atmoPositions[i * 3 + 1] = 2 * Math.random() - 1;
      atmoPositions[i * 3 + 2] = 2 * Math.random() - 1;
      atmoSizes[i] = atmoSize * (0.4 + Math.random());
      atmoSeeds[i] = Math.random();
    }

    const atmoGeo = new THREE.BufferGeometry();
    atmoGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(atmoPositions, 3)
    );
    atmoGeo.setAttribute("size", new THREE.BufferAttribute(atmoSizes, 1));
    atmoGeo.setAttribute("seed", new THREE.BufferAttribute(atmoSeeds, 1));

    const dpr = Math.min(window.devicePixelRatio, 2);

    const atmoUniforms = {
      uTime: { value: 0 },
      uColor: { value: hexToVec3(atmoColor) },
      uRes: { value: new THREE.Vector2(w * dpr, h * dpr) },
    };

    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: atmoVertexShader,
      fragmentShader: atmoFragmentShader,
      uniforms: atmoUniforms,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const atmoCloud = new THREE.Points(atmoGeo, atmoMat);
    atmoCloud.frustumCulled = false;
    atmoCloud.layers.set(LAYER_ENTIRE_SCENE);
    camera.add(atmoCloud);
    scene.add(camera);

    /* ─── postprocessing ─── */
    const renderSize = new THREE.Vector2(w, h);

    // --- torus composer (no torus geometry, but keeps the pipeline intact) ---
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    const torusRenderPass = new RenderPass(scene, camera);
    torusRenderPass.clear = true;
    torusComposer.addPass(torusRenderPass);
    const torusGammaPass = new ShaderPass(GammaCorrectionShader);
    torusComposer.addPass(torusGammaPass);
    const torusBloomPass = new UnrealBloomPass(renderSize, 0.22, 0.2, 0);
    torusComposer.addPass(torusBloomPass);
    const torusCopyPass = new ShaderPass(CopyShader);
    torusComposer.addPass(torusCopyPass);

    // --- bloom composer ---
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    const bloomRenderPass = new RenderPass(scene, camera);
    bloomRenderPass.clear = true;
    bloomComposer.addPass(bloomRenderPass);
    const bloomPass = new UnrealBloomPass(renderSize, 0.35, 0.5, 0);
    bloomComposer.addPass(bloomPass);
    const bloomGammaPass = new ShaderPass(GammaCorrectionShader);
    bloomComposer.addPass(bloomGammaPass);

    // --- halo render target (empty, just a blank texture to satisfy the uniform) ---
    const haloRT = new THREE.WebGLRenderTarget(w, h);

    // --- final composer ---
    const FinalPassShader = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null as THREE.Texture | null },
        torusTexture: { value: torusComposer.renderTarget2.texture },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
        haloTexture: { value: haloRT.texture },
        iCornerBlue: { value: hexToVec3(cornerBlue) },
        iCornerOrange: { value: hexToVec3(cornerOrange) },
      },
      vertexShader: finalVertexShader,
      fragmentShader: finalFragmentShader,
    };

    const finalComposer = new EffectComposer(renderer);
    finalComposer.renderToScreen = true;
    const finalRenderPass = new RenderPass(scene, camera);
    finalComposer.addPass(finalRenderPass);
    const finalPass = new ShaderPass(FinalPassShader);
    finalComposer.addPass(finalPass);

    /* ─── visibility observer ─── */
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    /* ─── animation ─── */
    let animationId: number;
    let startTime = -1;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      if (startTime < 0) startTime = t;
      const elapsed = t - startTime;

      // iAnimate ramp: 0→1 over ~1.7s with smootherstep
      const animateProgress = smootherstep(Math.min(elapsed / 1.7, 1));
      galaxyUniforms.iAnimate.value = animateProgress;

      // slide-in: z from -20 to 0 over ~2s
      const slideProgress = smootherstep(Math.min(elapsed / 2.0, 1));
      group.position.z = -20 * (1 - slideProgress);

      // tumble
      group.rotation.y += dt * tumbleSpeed;

      // update galaxy uniforms
      galaxyUniforms.iTime.value = t;

      // atmosphere motes
      atmoUniforms.uTime.value = t * atmoSpeed * 8.0;

      // final pass time
      finalPass.uniforms.iTime.value = t;

      // Layer-based rendering:
      // For torusComposer – render with camera on TORUS_SCENE layer only
      camera.layers.set(LAYER_TORUS_SCENE);
      torusComposer.render();

      // For bloomComposer – render with camera on BLOOM_SCENE layer only
      camera.layers.set(LAYER_BLOOM_SCENE);
      bloomComposer.render();

      // For finalComposer – render with camera on ENTIRE_SCENE layer
      camera.layers.set(LAYER_NONE);
      camera.layers.enable(LAYER_ENTIRE_SCENE);
      finalComposer.render();
    }

    animate();

    /* ─── resize ─── */
    function onResize() {
      w = container!.clientWidth;
      h = container!.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(dpr);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      torusComposer.setSize(w, h);
      bloomComposer.setSize(w, h);
      finalComposer.setSize(w, h);

      torusBloomPass.resolution.set(w, h);
      bloomPass.resolution.set(w, h);

      haloRT.setSize(w, h);

      // Update final pass texture references after resize
      finalPass.uniforms.torusTexture.value =
        torusComposer.renderTarget2.texture;
      finalPass.uniforms.bloomTexture.value =
        bloomComposer.renderTarget2.texture;
      finalPass.uniforms.haloTexture.value = haloRT.texture;

      atmoUniforms.uRes.value.set(w * dpr, h * dpr);
    }

    window.addEventListener("resize", onResize);
    onResize();

    /* ─── cleanup ─── */
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);

      // dispose geometry & material
      galaxyGeo.dispose();
      galaxyMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();

      // dispose composers
      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();

      // dispose halo RT
      haloRT.dispose();

      // dispose renderer
      renderer.dispose();

      // remove canvas
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
