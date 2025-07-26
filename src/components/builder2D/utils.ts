// utils.ts

// ✅ Snap element to nearest grid (useful for pixel-perfect positioning)
export function snapToGrid(value: number, gridSize = 8): number {
    return Math.round(value / gridSize) * gridSize;
  }
  
  // ✅ Generate a unique element ID (can be replaced with uuid if preferred)
  export function generateElementId(prefix = "el"): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // ✅ Check if a point is inside a given element's bounding box
  export function isPointInElement(x: number, y: number, element: any): boolean {
    return (
      x >= element.x &&
      x <= element.x + element.width &&
      y >= element.y &&
      y <= element.y + element.height
    );
  }
  
  // ✅ Clamp a value between min and max
  export function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
  }
  
  // ✅ Calculate new size & position when resizing from a specific handle
  export function getResizedDimensions(
    handle: string,
    deltaX: number,
    deltaY: number,
    element: any
  ): { x: number; y: number; width: number; height: number } {
    let { x, y, width, height } = element;
  
    switch (handle) {
      case "top-left":
        x += deltaX;
        y += deltaY;
        width -= deltaX;
        height -= deltaY;
        break;
      case "top-right":
        y += deltaY;
        width += deltaX;
        height -= deltaY;
        break;
      case "bottom-left":
        x += deltaX;
        width -= deltaX;
        height += deltaY;
        break;
      case "bottom-right":
        width += deltaX;
        height += deltaY;
        break;
      default:
        break;
    }
  
    return {
      x,
      y,
      width: clamp(width, 10, 5000),
      height: clamp(height, 10, 5000),
    };
  }
  
  // ✅ Detect overlap between two elements (used for snapping/alignment)
  export function isOverlapping(a: any, b: any): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  