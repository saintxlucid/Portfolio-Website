'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
  Float,
  Trail,
  Stars,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';

// Particle field for depth and atmosphere
 
function ParticleField() {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#b88cff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Enhanced animated sigil with more sophisticated effects
function AnimatedSigil() {
  const groupRef = useRef<THREE.Group>(null);
  const triangleRef = useRef<THREE.Mesh>(null);
  const circleRef = useRef<THREE.Mesh>(null);
  const innerCircleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }

    if (triangleRef.current) {
      triangleRef.current.rotation.z = t * 0.3;
      triangleRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }

    if (circleRef.current) {
      circleRef.current.rotation.z = -t * 0.2;
    }

    if (innerCircleRef.current) {
      innerCircleRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Outer glow sphere */}
        <Sphere args={[3.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#b88cff"
            transparent
            opacity={0.1}
            distort={0.3}
            speed={2}
          />
        </Sphere>

        {/* Main outer circle (torus) */}
        <mesh ref={circleRef} position={[0, 0, 0]}>
          <torusGeometry args={[2.2, 0.08, 20, 100]} />
          <meshStandardMaterial
            color="#b88cff"
            emissive="#b88cff"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner circle with trail */}
        <Trail
          width={0.5}
          length={6}
          color="#70e1f5"
          attenuation={(width) => width * width}
        >
          <mesh ref={innerCircleRef} position={[0, 0, 0]}>
            <torusGeometry args={[1.5, 0.06, 16, 100]} />
            <meshStandardMaterial
              color="#70e1f5"
              emissive="#70e1f5"
              emissiveIntensity={1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Trail>

        {/* Triangle pyramid */}
        <mesh ref={triangleRef} position={[0, 0, 0]}>
          <coneGeometry args={[1.5, 2.6, 3]} />
          <meshStandardMaterial
            color="#8ef5c3"
            emissive="#8ef5c3"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Core light sphere */}
        <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </Sphere>

        {/* Dynamic point lights */}
        <pointLight position={[0, 0, 0]} intensity={2} color="#8ef5c3" />
        <pointLight position={[2, 2, 2]} intensity={1} color="#b88cff" />
        <pointLight position={[-2, -2, -2]} intensity={1} color="#70e1f5" />

        {/* Rim light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#e6c670"
        />
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Background stars */}
        <Stars
          radius={50}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />

        {/* Particle field for depth */}
        <ParticleField />

        {/* Main animated sigil */}
        <AnimatedSigil />

        {/* Interactive controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0b0b0e', 10, 30]} />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Vignette offset={0.5} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
