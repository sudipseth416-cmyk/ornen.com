"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TorusKnot } from "@react-three/drei";

export function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth continuous rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    
    // Slight floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <TorusKnot ref={meshRef} args={[1.5, 0.4, 64, 8]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#0d1f0d"
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
      />
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.1} />
      </mesh>
    </TorusKnot>
  );
}
