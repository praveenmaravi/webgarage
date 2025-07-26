// src/utils/arUtils.ts

import * as THREE from 'three';

// Check if WebXR and AR is supported
export const isARSupported = async (): Promise<boolean> => {
  if (navigator.xr && navigator.xr.isSessionSupported) {
    return await navigator.xr.isSessionSupported('immersive-ar');
  }
  return false;
};

// Create XR-compatible renderer with AR support
export const createARRenderer = (
  canvas: HTMLCanvasElement,
  antialias: boolean = true
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  return renderer;
};

// Start AR session
export const startARSession = async (
  renderer: THREE.WebGLRenderer
): Promise<void> => {
  const sessionInit = {
    requiredFeatures: ['hit-test', 'dom-overlay'],
    domOverlay: { root: document.body },
  };

  const session = await navigator.xr?.requestSession('immersive-ar', sessionInit);
  if (session) {
    renderer.xr.setSession(session);
  }
};

// Handle AR-compatible camera setup
export const setupARCamera = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): void => {
  // Place a reticle or environment setup here if needed
  camera.matrixAutoUpdate = false;
  camera.updateProjectionMatrix();
};

// Utility: Animate AR scene
export const animateARScene = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderCallback: () => void
) => {
  const loop = () => {
    renderer.setAnimationLoop(() => {
      renderCallback();
      renderer.render(scene, camera);
    });
  };
  loop();
};

// Utility: Add a basic AR reticle (optional)
export const createARReticle = (loader: THREE.TextureLoader): THREE.Mesh => {
  const geometry = new THREE.RingGeometry(0.15, 0.2, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: loader.load('/textures/reticle.png'),
    transparent: true,
    side: THREE.DoubleSide,
  });
  const reticle = new THREE.Mesh(geometry, material);
  reticle.rotation.x = -Math.PI / 2;
  reticle.visible = false;
  return reticle;
};
