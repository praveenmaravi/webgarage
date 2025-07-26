// src/pages/studio/Builder3D.tsx

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, Html } from "@react-three/drei";
import * as THREE from "three";

// Example editable 3D Box component
const EditableBox = ({ id, position, onSelect, isSelected }: {
  id: string;
  position: [number, number, number];
  onSelect: (id: string) => void;
  isSelected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Simple rotation animation
  useFrame(() => {
    if (meshRef.current && !isSelected) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation(); // prevent canvas deselect
        onSelect(id);
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isSelected ? "orange" : "royalblue"} />
    </mesh>
  );
};

const Builder3D: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Example objects in the scene
  const objects = [
    { id: "box1", position: [0, 0.5, 0] as [number, number, number] },
    { id: "box2", position: [2, 0.5, -1] as [number, number, number] },
  ];

  // Ref for TransformControls to attach to selected object
  const transformRef = useRef<any>(null);
  const { camera, gl, scene } = useThree();

  // Attach TransformControls to selected mesh
  useEffect(() => {
    if (!transformRef.current) return;

    if (selectedId) {
      const selectedMesh = scene.getObjectByName(selectedId);
      if (selectedMesh) {
        transformRef.current.attach(selectedMesh);
      }
    } else {
      transformRef.current.detach();
    }
  }, [selectedId, scene]);

  // Deselect on background click
  const onCanvasClick = () => {
    setSelectedId(null);
  };

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 60 }}
        onPointerMissed={onCanvasClick}
      >
        {/* Ambient + directional lights */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={1.5}
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
          rotation-x={-Math.PI / 2}
          position={[0, 0, 0]}
          receiveShadow
          name="ground"
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {/* Render editable boxes */}
        {objects.map(({ id, position }) => (
          <EditableBox
            key={id}
            id={id}
            position={position}
            onSelect={setSelectedId}
            isSelected={selectedId === id}
          />
        ))}

        {/* Transform controls for selected object */}
        <TransformControls
          ref={transformRef}
          mode="translate"
          showX={true}
          showY={true}
          showZ={true}
          // Disable orbit controls when dragging
          onDragStart={() => {
            const controls = orbitRef.current;
            if (controls) controls.enabled = false;
          }}
          onDragEnd={() => {
            const controls = orbitRef.current;
            if (controls) controls.enabled = true;
          }}
        />

        {/* Orbit controls to rotate around */}
        <OrbitControls ref={orbitRef} />
      </Canvas>
    </div>
  );
};

// OrbitControls ref for toggling
const orbitRef = React.createRef<any>();

export default Builder3D;
