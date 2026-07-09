"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

/* ------------------------------------------------------------------ */
/*  Shaders                                                           */
/* ------------------------------------------------------------------ */

const dustVertexShader = /* glsl */ `
attribute float size;
uniform float iTime;
uniform vec3 iShift;
uniform vec2 iResolution;
uniform vec3 iAnimation;
uniform float uDepth;
varying float transparency;
varying float warmness;
vec3 warp3d(vec3 pos, float t) {
  float curv = 0.9, a = 1.9, b = 0.25, b2 = 0.03, c = 0.02;
  pos *= 2.;
  pos.x += curv * sin(c * t + a * pos.y) + t * b2;
  pos.y += curv * cos(c * t + a * pos.x);
  pos.z += curv * cos(c * t + a * pos.y);
  pos.z += curv * sin(c * t + a * pos.x) + t * b;
  pos.z = abs(pos.z);
  return pos.xyz;
}
void main() {
  vec3 v = warp3d(position, iTime);
  v = uDepth * (2. * fract(v + iShift) - 1.) + iAnimation;
  vec4 vpos = modelViewMatrix * vec4(v, 1.);
  transparency = step(length(v), uDepth);
  warmness = step(.75, fract(size * 7.13));
  gl_PointSize = size * iResolution.y / 1000. / -vpos.z;
  gl_Position = projectionMatrix * vpos;
}
`;

const dustFragmentShader = /* glsl */ `
varying float transparency; varying float warmness;
uniform float iAlpha; uniform vec3 uCool; uniform vec3 uWarm;
void main() {
  vec3 color = mix(uCool * .8, uWarm * .8, warmness);
  float tex = smoothstep(1., .3, length(2. * gl_PointCoord - 1.));
  gl_FragColor = vec4(tex * color, tex * transparency * iAlpha);
}
`;

const finalPassVertexShader = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
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

/* ------------------------------------------------------------------ */
/*  Layer constants                                                   */
/* ------------------------------------------------------------------ */

const LAYERS = {
  NONE: 0,
  TORUS_SCENE: 1,
  BLOOM_SCENE: 2,
  ENTIRE_SCENE: 3,
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function CosmicDustBackground() {
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

    /* ---- scene / camera ---- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 22);

    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    const dpr = renderer.getPixelRatio();

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 80);
    camera.position.set(0, 0, 3);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.TORUS_SCENE);

    /* ---- dust geometry ---- */
    const count = 940;
    const positions: number[] = [];
    const sizes: number[] = [];

    for (let i = 0; i < count; i++) {
      positions.push(2 * Math.random() - 1, 2 * Math.random() - 1, 2 * Math.random() - 1);
      sizes.push(25 + 25 * Math.random());
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    dustGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );

    const dustUniforms = {
      iTime: { value: 0 },
      iShift: { value: new THREE.Vector3() },
      iAlpha: { value: 0 },
      iAnimation: { value: new THREE.Vector3(0, 0, 0) },
      iResolution: { value: new THREE.Vector2(w * dpr, h * dpr) },
      uDepth: { value: 3.7 },
      uCool: { value: hexToVec3("#b3401f") },
      uWarm: { value: hexToVec3("#ffc46b") },
    };

    const dustMaterial = new THREE.ShaderMaterial({
      vertexShader: dustVertexShader,
      fragmentShader: dustFragmentShader,
      uniforms: dustUniforms,
      transparent: true,
      depthWrite: false,
    });
    dustMaterial.stencilWrite = false;

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    dustPoints.position.set(0, 0, -1);
    dustPoints.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(dustPoints);

    /* ---- postprocessing: FinalPass shader ---- */
    const FinalPassShader = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null as THREE.Texture | null },
        torusTexture: { value: null as THREE.Texture | null },
        bloomTexture: { value: null as THREE.Texture | null },
        haloTexture: { value: null as THREE.Texture | null },
        uBg: { value: hexToVec3("#1a0a04") },
        uFlameA: { value: hexToVec3("#ff7a2a") },
        uFlameB: { value: hexToVec3("#ffce5a") },
        uFlameAmt: { value: 0.2 },
      },
      vertexShader: finalPassVertexShader,
      fragmentShader: finalPassFragmentShader,
    };

    /* ---- composers ---- */
    const renderSize = new THREE.Vector2(w * dpr, h * dpr);

    // torusComposer
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(new RenderPass(scene, camera));
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    const torusBloom = new UnrealBloomPass(renderSize, 0.3, 0.3, 0);
    torusComposer.addPass(torusBloom);
    torusComposer.addPass(new ShaderPass(CopyShader));

    // bloomComposer
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(new RenderPass(scene, camera));
    const bloomBloom = new UnrealBloomPass(renderSize, 0.5, 0.7, 0);
    bloomComposer.addPass(bloomBloom);
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    // finalComposer
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(new RenderPass(scene, camera));
    const finalPass = new ShaderPass(FinalPassShader);
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget2.texture;
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget2.texture;
    // haloTexture stays null (no halo in this section background)
    // Create a 1×1 black texture for haloTexture so the shader doesn't error
    const blackData = new Uint8Array([0, 0, 0, 255]);
    const blackTex = new THREE.DataTexture(blackData, 1, 1, THREE.RGBAFormat);
    blackTex.needsUpdate = true;
    finalPass.uniforms.haloTexture.value = blackTex;
    finalComposer.addPass(finalPass);

    /* ---- intersection observer ---- */
    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    /* ---- animation state ---- */
    const startTime = performance.now();
    const shiftAccum = new THREE.Vector3();
    const driftSpeed = 0.4;

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const now = performance.now();
      const elapsed = now / 1000;

      // Fade-in over 2200ms with smootherstep
      const fadeT = Math.min((now - startTime) / 2200, 1);
      const eased = fadeT * fadeT * fadeT * (fadeT * (fadeT * 6 - 15) + 10);
      dustUniforms.iAlpha.value = eased * 0.68;

      // Time uniform
      dustUniforms.iTime.value = elapsed;

      // Shift accumulation (camera stays at 0,0,3)
      shiftAccum.x += camera.position.x * 0.0022 * driftSpeed;
      shiftAccum.y += camera.position.y * 0.0022 * driftSpeed;
      shiftAccum.z += camera.position.z * 0.0022 * driftSpeed;
      dustUniforms.iShift.value.copy(shiftAccum);

      // FinalPass time
      finalPass.uniforms.iTime.value = elapsed;

      // Render the 3 composers
      // Isolate layers for torus composer (layer 1)
      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();

      // Bloom composer (layer 2 + 3)
      camera.layers.set(LAYERS.BLOOM_SCENE);
      camera.layers.enable(LAYERS.ENTIRE_SCENE);
      bloomComposer.render();

      // Final composer (all layers)
      camera.layers.set(LAYERS.NONE);
      camera.layers.enable(LAYERS.TORUS_SCENE);
      camera.layers.enable(LAYERS.BLOOM_SCENE);
      camera.layers.enable(LAYERS.ENTIRE_SCENE);
      finalComposer.render();
    }

    /* ---- resize ---- */
    function onResize() {
      const cw = container!.clientWidth;
      const ch = container!.clientHeight;
      if (cw === 0 || ch === 0) return;

      const pr = renderer.getPixelRatio();

      renderer.setSize(cw, ch, false);
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();

      dustUniforms.iResolution.value.set(cw * pr, ch * pr);

      const newSize = new THREE.Vector2(cw * pr, ch * pr);
      torusComposer.setSize(cw * pr, ch * pr);
      bloomComposer.setSize(cw * pr, ch * pr);
      finalComposer.setSize(cw * pr, ch * pr);

      torusBloom.resolution = newSize;
      bloomBloom.resolution = newSize;

      // Re-bind textures after resize (render targets get recreated)
      finalPass.uniforms.torusTexture.value =
        torusComposer.renderTarget2.texture;
      finalPass.uniforms.bloomTexture.value =
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

      dustGeometry.dispose();
      dustMaterial.dispose();
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
