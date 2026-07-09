"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Particles } from "./Particles";
import { AbstractGeometry } from "./AbstractGeometry";
import { GridMesh } from "./GridMesh";

export function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-auto">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c9a84c" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#0d1f0d" />
        
        {/* 3D Elements */}
        <AbstractGeometry />
        <Particles count={800} />
        <GridMesh />
        
        {/* Environment for better reflections if needed */}
        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay gradient to blend scene with background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
