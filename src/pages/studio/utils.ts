// src/pages/studio/utils.ts

/**
 * Converts degrees to radians.
 * Useful for 3D rotations or canvas transforms.
 */
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 */
export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Snaps a value to the nearest grid size.
 * Useful for grid snapping in 2D/3D editors.
 *
 * @param value - The value to snap
 * @param gridSize - Size of the snapping grid
 */
export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two numbers.
 * Useful for smooth animations and transitions.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Converts a mouse event position to canvas coordinates
 * considering the canvas bounding rect and zoom scale.
 *
 * @param event - Mouse event
 * @param canvas - HTMLCanvasElement
 * @param zoom - Zoom level (1 = 100%)
 */
export function getCanvasCoordinates(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  zoom: number = 1
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) / zoom;
  const y = (event.clientY - rect.top) / zoom;
  return { x, y };
}

/**
 * Generates a unique ID (simple version).
 * Useful for keys or component IDs in editor.
 */
export function generateId(prefix = "id"): string {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Checks if a point (x,y) is inside a rectangle.
 *
 * @param pointX - X coordinate of the point
 * @param pointY - Y coordinate of the point
 * @param rectX - X of rect top-left corner
 * @param rectY - Y of rect top-left corner
 * @param rectWidth - Width of rectangle
 * @param rectHeight - Height of rectangle
 */
export function isPointInRect(
  pointX: number,
  pointY: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number
): boolean {
  return (
    pointX >= rectX &&
    pointX <= rectX + rectWidth &&
    pointY >= rectY &&
    pointY <= rectY + rectHeight
  );
}
