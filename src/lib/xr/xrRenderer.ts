// src/lib/xr/xrRenderer.ts

import * as THREE from 'three';

export function createXRRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local-floor');
  return renderer;
}

export function setupXRAnimation(renderer: THREE.WebGLRenderer, onXRFrame: (time: number, frame: XRFrame) => void) {
  function onAnimationFrame(time: number, frame: XRFrame) {
    onXRFrame(time, frame);
    renderer.setAnimationLoop(onAnimationFrame);
  }
  renderer.setAnimationLoop(onAnimationFrame);
}
