// src/utils/domUtils.ts

/**
 * Get the position and size of a DOM element relative to the document.
 */
export function getElementRect(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
  
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      right: rect.right + window.scrollX,
      bottom: rect.bottom + window.scrollY,
    };
  }
  
  /**
   * Get the mouse position relative to a target container
   */
  export function getRelativeMousePosition(
    event: MouseEvent | PointerEvent,
    container: HTMLElement
  ) {
    const containerRect = container.getBoundingClientRect();
  
    return {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    };
  }
  
  /**
   * Snap a value to the nearest grid step
   */
  export function snapToGrid(value: number, gridSize: number) {
    return Math.round(value / gridSize) * gridSize;
  }
  
  /**
   * Snap a point (x, y) to a grid
   */
  export function snapPointToGrid(
    x: number,
    y: number,
    gridSize: number
  ): { x: number; y: number } {
    return {
      x: snapToGrid(x, gridSize),
      y: snapToGrid(y, gridSize),
    };
  }
  
  /**
   * Check if a point is within the bounds of a DOM element
   */
  export function isPointInsideElement(
    x: number,
    y: number,
    element: HTMLElement
  ): boolean {
    const rect = element.getBoundingClientRect();
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }
  
  /**
   * Convert a DOMRect to a simpler object
   */
  export function simplifyRect(rect: DOMRect) {
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }
  
  /**
   * Measure the offset of an element relative to its parent (used in builder)
   */
  export function getOffsetInParent(element: HTMLElement): { x: number; y: number } {
    const parent = element.offsetParent as HTMLElement;
    if (!parent) return { x: 0, y: 0 };
  
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
  
    return {
      x: elementRect.left - parentRect.left,
      y: elementRect.top - parentRect.top,
    };
  }
  