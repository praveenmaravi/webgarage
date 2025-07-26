// src/utils/mathUtils.ts

/**
 * Linearly interpolate between two values
 * @param a - Start value
 * @param b - End value
 * @param t - Interpolation factor (0–1)
 */
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
  
  /**
   * Clamp a number between a min and max
   * @param value - Value to clamp
   * @param min - Minimum bound
   * @param max - Maximum bound
   */
  export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
  
  /**
   * Snap a value to the nearest multiple of gridSize
   * @param value - Number to snap
   * @param gridSize - Grid step
   */
  export function snapToGrid(value: number, gridSize: number): number {
    return Math.round(value / gridSize) * gridSize;
  }
  
  /**
   * Calculate distance between two 2D points
   */
  export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  /**
   * Calculate distance between two 3D points
   */
  export function distance3D(p1: [number, number, number], p2: [number, number, number]): number {
    return Math.sqrt(
      Math.pow(p2[0] - p1[0], 2) +
      Math.pow(p2[1] - p1[1], 2) +
      Math.pow(p2[2] - p1[2], 2)
    );
  }
  
  /**
   * Convert degrees to radians
   */
  export function degToRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
  
  /**
   * Convert radians to degrees
   */
  export function radToDeg(radians: number): number {
    return (radians * 180) / Math.PI;
  }
  
  /**
   * Round to fixed precision
   */
  export function roundTo(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
  
  /**
   * Generate a random float between min and max
   */
  export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * Generate a random integer between min and max
   */
  export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  