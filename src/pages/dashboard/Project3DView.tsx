// src/pages/dashboard/Project3DView.tsx

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, GridHelper, Stats } from "@react-three/drei";

interface Props {
  projectId: string;
}

// Simple animated box component representing a 3D project placeholder
const AnimatedBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2 + 1;
  });

  return (
    <mesh ref={meshRef} castShadow position={[0, 1, 0]}>
      <boxGeometry args={[3, 2, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
};

const Project3DView: React.FC<Props> = ({ projectId }) => {
  // TODO: Load project-specific 3D assets/models by projectId here

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [5, 5, 10], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 7]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Ground Plane */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {/* Grid helper */}
        <GridHelper args={[100, 100, `white`, `gray`]} />

        {/* Project 3D model placeholder */}
        <AnimatedBox />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2}
        />

        {/* Optional: Performance stats */}
        <Stats />
      </Canvas>
    </div>
  );
};

export default Project3DView;
