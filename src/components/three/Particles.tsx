"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  
  // Generate random positions
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    // Slow rotation
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
    points.current.rotation.x = state.clock.elapsedTime * 0.02;

    // React to mouse
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    // Smooth interpolation towards mouse position
    points.current.rotation.x += (mouseY - points.current.rotation.x) * 0.05;
    points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c9a84c"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
