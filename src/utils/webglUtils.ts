// webglUtils.ts

import * as THREE from 'three';

/**
 * Initializes a Three.js scene with camera, renderer, and lighting.
 */
export function initScene(container: HTMLDivElement): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: any;
} {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f0f0f0');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // OrbitControls (optional)
  let controls: any = null;
  try {
    const { OrbitControls } = require('three/examples/jsm/controls/OrbitControls');
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  } catch (error) {
    console.warn("OrbitControls not loaded. Make sure it's imported properly.");
  }

  return { scene, camera, renderer, controls };
}

/**
 * Handles responsive resizing of the WebGL renderer and camera.
 */
export function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  container: HTMLDivElement
) {
  const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });

  resizeObserver.observe(container);

  return () => resizeObserver.disconnect();
}

/**
 * Runs a basic animation loop.
 */
export function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls?: any,
  onFrame?: () => void
) {
  const render = () => {
    requestAnimationFrame(render);

    if (controls) controls.update();
    if (onFrame) onFrame();

    renderer.render(scene, camera);
  };

  render();
}
