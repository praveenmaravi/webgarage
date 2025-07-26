'use client';
import { useRef } from 'react';
import { DirectionalLight, AmbientLight, PointLight, SpotLight } from '@react-three/drei';

export default function Lighting() {
  // Reference for directional light (for shadows)
  const directionalLightRef = useRef();

  return (
    <>
      {/* Ambient light - soft, all-around light */}
      <ambientLight intensity={0.5} />

      {/* Directional light - used for simulating sunlight or strong light */}
      <DirectionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}   // Set position of light source
        intensity={1}           // Light strength
        castShadow              // Enables shadow casting from objects
        shadow-mapSize-width={1024}  // Shadow map resolution
        shadow-mapSize-height={1024} // Shadow map resolution
      />

      {/* Point light - simulates light bulb or any omnidirectional light */}
      <PointLight
        position={[-3, 5, -3]}
        intensity={0.8}
        color="hotpink"
        distance={10}             // Light distance (where it fades out)
        decay={2}                 // Rate at which the light fades
      />

      {/* Spotlight - simulates focused light (like a stage light or flashlight) */}
      <SpotLight
        position={[3, 3, 3]}
        intensity={1}
        angle={0.3}               // Light spread (angle)
        penumbra={0.5}            // Soft edges on light
        castShadow
        target-position={[0, 0, 0]}  // What the spotlight is aiming at
      />
    </>
  );
}
