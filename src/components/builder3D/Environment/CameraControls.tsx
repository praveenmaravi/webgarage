'use client';

import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function CameraControls() {
  const [enabled, setEnabled] = useState(true);
  const controlsRef = useRef<any>(null);

  // Listen to user input and enable/disable controls if needed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c') { // 'c' key toggles camera controls
        setEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update the OrbitControls if enabled
  useFrame(() => {
    if (controlsRef.current && enabled) {
      controlsRef.current.update();
    }
  });

  return <OrbitControls ref={controlsRef} enabled={enabled} />;
}
