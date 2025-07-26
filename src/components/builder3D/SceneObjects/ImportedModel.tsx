'use client';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

type ImportedModelProps = {
  url: string; // URL to the 3D model (e.g., from public directory or an external link)
  position?: [number, number, number]; // Position of the model
  scale?: [number, number, number]; // Scale of the model
  rotation?: [number, number, number]; // Rotation of the model
};

export default function ImportedModel({
  url,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: ImportedModelProps) {
  // Load the 3D model using useGLTF from @react-three/drei
  const { nodes, materials } = useGLTF(url);
  
  // Reference for the object
  const modelRef = useRef();

  // Animation/rotation on every frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate the model
    }
  });

  return (
    <group ref={modelRef} position={position} scale={scale} rotation={rotation}>
      {/* Loop through the nodes from the loaded GLTF model */}
      {Object.values(nodes).map((node, idx) => {
        return (
          <mesh key={idx} geometry={node.geometry} material={materials[node.material?.name]} castShadow receiveShadow>
            {/* Optionally, you can use materials and textures here */}
          </mesh>
        );
      })}
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/your-3d-model.glb');
