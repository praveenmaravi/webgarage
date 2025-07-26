'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../helpers/useObjectStore'; // For tracking and updating state (optional)
import { MeshStandardMaterial } from 'three';

interface UIPlaneProps {
  position: [number, number, number];
  text: string;
  onClick: () => void;
}

export function UIPlane({ position = [0, 0, 0], text, onClick }: UIPlaneProps) {
  const mesh = useRef<any>(null);

  // Animation or effect on the UI element (e.g., hovering or rotation)
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;  // Rotate over time for a dynamic look
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={onClick}
      castShadow
      receiveShadow
      className="interactive-ui-plane"
    >
      {/* The Plane */}
      <planeGeometry args={[2, 1]} />
      <MeshStandardMaterial color="skyblue" metalness={0.5} roughness={0.1} />
      <Text3D text={text} />
    </mesh>
  );
}

interface Text3DProps {
  text: string;
}

const Text3D = ({ text }: Text3DProps) => {
  return (
    <mesh position={[0, 0, 0.05]}>
      <textGeometry args={[text, { font: 'Roboto', size: 0.2, height: 0.05 }]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
};
