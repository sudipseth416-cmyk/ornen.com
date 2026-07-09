"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const drifts = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      // Fire/gold colors
      const isGold = Math.random() > 0.5;
      colors[i * 3] = isGold ? 0.83 : 1.0;
      colors[i * 3 + 1] = isGold ? 0.63 : 0.42;
      colors[i * 3 + 2] = isGold ? 0.09 : 0.0;

      sizes[i] = Math.random() * 3 + 1;
      speeds[i] = Math.random() * 0.008 + 0.003;
      drifts[i] = (Math.random() - 0.5) * 0.003;
    }

    return { positions, colors, sizes, speeds, drifts };
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += particles.drifts[i];
      positions[i * 3 + 1] += particles.speeds[i];

      // Reset particle when it goes above view
      if (positions[i * 3 + 1] > 12) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = -12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} color="#ff6a00" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#d4a017" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#ff6a00" />
        <Particles count={80} />
      </Canvas>
    </div>
  );
}
