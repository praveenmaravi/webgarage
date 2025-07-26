// Default Material Presets for 3D Objects
export const DEFAULT_MATERIALS = {
    basic: {
      color: '#3498db',   // Default blue
      roughness: 0.5,
      metalness: 0,
    },
    glass: {
      color: '#ffffff',
      opacity: 0.5,
      transparent: true,
      roughness: 0,
      metalness: 0.5,
    },
    metal: {
      color: '#7f8c8d',
      roughness: 0.3,
      metalness: 1,
    },
    emissive: {
      color: '#e74c3c',  // Red color for emissive effect
      emissive: '#e74c3c',
      emissiveIntensity: 1,
      roughness: 0.5,
      metalness: 0.8,
    },
    grid: {
      color: '#2c3e50',
      opacity: 0.3,
      lineWidth: 2,
    },
  };
  
  // Predefined 3D Object Types
  export const OBJECT_TYPES = {
    box: 'boxGeometry',
    sphere: 'sphereGeometry',
    cylinder: 'cylinderGeometry',
    plane: 'planeGeometry',
  };
  
  // Default Scene Settings
  export const DEFAULT_CAMERA_POSITION = [5, 5, 5];
  export const DEFAULT_FOV = 50;
  export const DEFAULT_GRID_SIZE = 10;
  
  // Default Light Settings
  export const DEFAULT_LIGHT_POSITION = [5, 10, 5];
  export const DEFAULT_AMBIENT_LIGHT_INTENSITY = 0.5;
  export const DEFAULT_DIRECTIONAL_LIGHT_INTENSITY = 1;
  
  // Predefined Transform Settings (Used for Object Manipulation)
  export const TRANSFORM_CONTROLS = {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
  };
  
  // Default Object Colors
  export const OBJECT_COLORS = [
    '#3498db',  // Blue
    '#e74c3c',  // Red
    '#2ecc71',  // Green
    '#f39c12',  // Yellow
    '#8e44ad',  // Purple
  ];
  
  // 3D Editor States (for managing UI states)
  export const EDITOR_MODES = {
    SELECT: 'select',
    MOVE: 'move',
    SCALE: 'scale',
    ROTATE: 'rotate',
  };
  
  // Preset Grid Options
  export const GRID_PRESETS = [
    { name: 'Small', size: 5 },
    { name: 'Medium', size: 10 },
    { name: 'Large', size: 20 },
  ];
  
  