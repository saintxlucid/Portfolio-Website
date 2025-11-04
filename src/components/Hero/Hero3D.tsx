'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSigil() {
  const groupRef = useRef<THREE.Group>(null);
  const triangleRef = useRef<THREE.Mesh>(null);
  const circleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (triangleRef.current) {
      triangleRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
    if (circleRef.current) {
      circleRef.current.rotation.z = -state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Circle */}
      <mesh ref={circleRef} position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#b88cff"
          emissive="#b88cff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Triangle */}
      <mesh ref={triangleRef} position={[0, 0, 0]}>
        <coneGeometry args={[1.5, 2.6, 3]} />
        <meshStandardMaterial
          color="#70e1f5"
          emissive="#70e1f5"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>

      {/* Point Light */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#8ef5c3" />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <AnimatedSigil />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
