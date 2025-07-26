// src/types/builder.d.ts

export type ComponentType =
  | 'button'
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'image'
  | 'text'
  | 'card'
  | 'container'
  | 'list'
  | 'modal'
  | 'video'
  | 'audio'
  | 'canvas'
  | '3d-model'
  | 'custom';

export interface Position {
  x: number;     // pixels or relative unit
  y: number;
  z?: number;    // optional for 3D positioning
}

export interface Size {
  width: number;   // pixels or %
  height: number;
  depth?: number;  // for 3D components
}

export interface StyleProps {
  [key: string]: string | number | undefined; 
  // Examples: backgroundColor, borderRadius, opacity, fontSize, etc.
}

export interface AnimationRef {
  animationId: string;     // Reference to an animation timeline
  trigger?: 'hover' | 'click' | 'load' | 'scroll' | 'manual';
}

export interface EventHandlers {
  [eventName: string]: string; 
  // e.g., "onClick": "handleSubmit", "onChange": "updateState"
}

export interface ComponentProps {
  id: string;
  type: ComponentType;
  name?: string;                 // Human-readable label, e.g. "Primary Button"
  position: Position;
  size: Size;
  styles?: StyleProps;
  children?: ComponentProps[];    // Nested components for containers
  animations?: AnimationRef[];    // Animations attached to this component
  events?: EventHandlers;         // Event handlers (JS function names or references)
  dataBindings?: Record<string, any>; // Bindings to data sources (API, state, etc.)
  visible?: boolean;              // Controls visibility
  locked?: boolean;               // Prevent editing/moving in builder
  meta?: Record<string, any>;    // Any additional metadata
}

export interface Page {
  id: string;
  name: string;
  slug: string;                  // URL slug for routing
  components: ComponentProps[];  // Top-level components on this page
  settings?: {
    backgroundColor?: string;
    gridEnabled?: boolean;
    gridSize?: number;
    responsive?: boolean;
    breakpoints?: number[];
  };
}

export interface ProjectLayout {
  id: string;
  name: string;
  pages: Page[];
  globalStyles?: StyleProps;
  assets?: {
    images?: string[];        // URLs or asset IDs
    fonts?: string[];
    models3D?: string[];
  };
}
