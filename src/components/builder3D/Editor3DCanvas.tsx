'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Loader } from '@react-three/drei';

import Lighting from './Environment/Lighting';
import CameraControls from './Environment/CameraControls';
import { BasicBox } from './SceneObjects/BasicBox';
import { UIPlane } from './SceneObjects/UIPlane';
import { ImportedModel } from './SceneObjects/ImportedModel';

export default function Editor3DCanvas() {
  return (
    <div className="w-full h-full relative">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 45 }}
        style={{ background: '#1a1a1a' }}
      >
        <Suspense fallback={null}>
          {/* Lighting & Environment */}
          <Lighting />
          <Environment preset="city" />

          {/* Helpers */}
          <Grid infinite cellSize={0.5} />

          {/* 3D Objects (Example) */}
          <BasicBox position={[0, 0.5, 0]} />
          <UIPlane position={[2, 1, 0]} />
          <ImportedModel url="/models/sample.glb" position={[-2, 0, 0]} />

          {/* Controls */}
          <OrbitControls />
          <CameraControls />
        </Suspense>
      </Canvas>

      {/* Loading Progress */}
      <Loader />
    </div>
  );
}
