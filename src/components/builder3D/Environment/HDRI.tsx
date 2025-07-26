'use client';
import { Environment } from '@react-three/drei';

export default function HDRI() {
  return (
    // HDRI provides an environment texture for reflections, lighting, and background
    <Environment
      files="https://cdn.jsdelivr.net/gh/engieyan/hdri-images/hdri_sample_2k.hdr" // HDRI image URL or local file path
      background={true}  // Set to true to use HDRI as the background
      resolution={1024}  // Resolution of the environment map
    />
  );
}
