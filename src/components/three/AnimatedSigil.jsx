import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sparkles } from '@react-three/drei';

function Sigil() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 2]} />
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.5}
          speed={2.5}
          roughness={0.2}
          metalness={0.8}
          emissive="#9333ea"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Sparkles 
        count={50} 
        scale={8} 
        size={3} 
        speed={0.4} 
        color="#ec4899"
      />
    </group>
  );
}

const AnimatedSigil = () => {
  return (
    <div className="w-full h-full max-w-2xl max-h-2xl">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />
        <pointLight position={[10, -10, -5]} intensity={0.8} color="#a855f7" />
        <Sigil />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedSigil;
