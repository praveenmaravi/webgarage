'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useObjectStore } from '../helpers/useObjectStore';
import { useGLTF } from '@react-three/drei';

// Basic Box component with transform controls
export function BasicBox({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], color = 'skyblue' }) {
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // State for controlling transformations
  const [transform, setTransform] = useState({ position, scale, rotation });

  // Add to the store for object management
  const addObject = useObjectStore((state) => state.addObject);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01; // Add continuous rotation for the box
    }
  });

  // Function to update position
  const updatePosition = (newPosition: [number, number, number]) => {
    setTransform({ ...transform, position: newPosition });
  };

  // Function to update scale
  const updateScale = (newScale: [number, number, number]) => {
    setTransform({ ...transform, scale: newScale });
  };

  // Function to update rotation
  const updateRotation = (newRotation: [number, number, number]) => {
    setTransform({ ...transform, rotation: newRotation });
  };

  // Hover effect to show interaction
  const onPointerOver = () => setIsHovered(true);
  const onPointerOut = () => setIsHovered(false);

  return (
    <mesh
      ref={mesh}
      position={transform.position}
      scale={transform.scale}
      rotation={transform.rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={() => addObject({ name: 'Basic Box', id: 'box1', ...transform })}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHovered ? 'lightblue' : color} />
    </mesh>
  );
}
