// Common base for all elements
export interface BaseElement {
    id: string;
    type: ElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    selected?: boolean;
    locked?: boolean;
    visible?: boolean;
    zIndex?: number;
  }
  
  // Specific Element Types
  export interface TextElement extends BaseElement {
    type: 'text';
    content: string;
    fontSize: number;
    fontFamily: string;
    fontWeight?: 'normal' | 'bold' | 'lighter';
    color: string;
    textAlign?: 'left' | 'center' | 'right';
  }
  
  export interface RectangleElement extends BaseElement {
    type: 'rectangle';
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
  }
  
  export interface ImageElement extends BaseElement {
    type: 'image';
    src: string;
    alt?: string;
    objectFit?: 'contain' | 'cover' | 'fill';
  }
  
  export interface ButtonElement extends BaseElement {
    type: 'button';
    label: string;
    onClickAction?: string; // For connecting to backend flow
    backgroundColor: string;
    color: string;
    borderRadius?: number;
  }
  
  // Union of all element types
  export type CanvasElement =
    | TextElement
    | RectangleElement
    | ImageElement
    | ButtonElement;
  
  // Supported string values for 'type'
  export type ElementType = 'text' | 'rectangle' | 'image' | 'button';
  