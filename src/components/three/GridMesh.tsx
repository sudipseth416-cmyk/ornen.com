"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function GridMesh() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    // Slight panning effect for the grid
    gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, "#0d1f0d", "#0d1f0d"]}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    >
      <lineBasicMaterial attach="material" color="#0d1f0d" transparent opacity={0.3} />
    </gridHelper>
  );
}
