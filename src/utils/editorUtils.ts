// src/utils/editorUtils.ts

/**
 * Snap a value to the nearest grid increment
 * @param value - the raw coordinate
 * @param gridSize - size of the grid cell (e.g., 8, 10, 20)
 */
export function snapToGrid(value: number, gridSize: number = 10): number {
    return Math.round(value / gridSize) * gridSize;
  }
  
  /**
   * Align a component within a container
   * @param container - width and height of the canvas/container
   * @param element - width and height of the component
   * @param type - alignment type: center, left, right, top, bottom
   */
  export function alignElement(
    container: { width: number; height: number },
    element: { width: number; height: number },
    type: "center" | "left" | "right" | "top" | "bottom"
  ): { x: number; y: number } {
    const xMid = (container.width - element.width) / 2;
    const yMid = (container.height - element.height) / 2;
  
    switch (type) {
      case "center":
        return { x: xMid, y: yMid };
      case "left":
        return { x: 0, y: yMid };
      case "right":
        return { x: container.width - element.width, y: yMid };
      case "top":
        return { x: xMid, y: 0 };
      case "bottom":
        return { x: xMid, y: container.height - element.height };
      default:
        return { x: 0, y: 0 };
    }
  }
  
  /**
   * Generate a unique ID for new components
   * @param prefix - optional prefix (e.g., 'btn', 'card')
   */
  export function generateUniqueId(prefix = "comp"): string {
    return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
  }
  
  /**
   * Move a layer (component) up/down in the stack
   * @param layers - array of layer IDs
   * @param id - target ID to move
   * @param direction - "up" or "down"
   */
  export function reorderLayer(
    layers: string[],
    id: string,
    direction: "up" | "down"
  ): string[] {
    const index = layers.indexOf(id);
    if (index === -1) return layers;
  
    const newIndex = direction === "up" ? index + 1 : index - 1;
    if (newIndex < 0 || newIndex >= layers.length) return layers;
  
    const newLayers = [...layers];
    const [movedItem] = newLayers.splice(index, 1);
    newLayers.splice(newIndex, 0, movedItem);
  
    return newLayers;
  }
  
  /**
   * Calculate bounding box of multiple elements
   */
  export function getBoundingBox(elements: { x: number; y: number; width: number; height: number }[]) {
    const left = Math.min(...elements.map(el => el.x));
    const top = Math.min(...elements.map(el => el.y));
    const right = Math.max(...elements.map(el => el.x + el.width));
    const bottom = Math.max(...elements.map(el => el.y + el.height));
  
    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    };
  }
  
  /**
   * Check if two elements are overlapping
   */
  export function areOverlapping(
    a: { x: number; y: number; width: number; height: number },
    b: { x: number; y: number; width: number; height: number }
  ): boolean {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
  