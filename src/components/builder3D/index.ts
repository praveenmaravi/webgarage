// Exports for cleaner imports
export { default as Editor3DCanvas } from './Editor3DCanvas';       // Main canvas with 3D scene
export { default as ObjectPanel } from './ObjectPanel';             // UI to manage objects
export { default as ObjectControls } from './ObjectControls';       // Object transformations (move, scale, rotate)
export { BasicBox } from './SceneObjects/BasicBox';                 // Basic 3D Box Object
export { ImportedModel } from './SceneObjects/ImportedModel';       // Load GLTF/GLB models
export { UIPlane } from './SceneObjects/UIPlane';                   // 3D UI Plane for interactive elements

export { default as Lighting } from './Environment/Lighting';      // Lights setup for 3D scene
export { default as HDRI } from './Environment/HDRI';               // Environment maps
export { default as CameraControls } from './Environment/CameraControls'; // Camera control logic

export { useObjectStore } from './helpers/useObjectStore';          // Zustand store for 3D objects management
export { default as constants } from './helpers/constants';        // Default materials and scene presets
