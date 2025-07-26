// src/pages/studio/types.ts

// === Builder Modes ===
export type BuilderMode = "2d" | "3d";

// === Basic 2D Component Types ===
export interface UIComponent2D {
  id: string;
  type: string;            // e.g. "button", "card", "input"
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;        // degrees
  styles: Record<string, any>; // CSS-like styles (color, fontSize, borderRadius, etc.)
  props?: Record<string, any>;  // Component-specific props (e.g. placeholder for input)
  children?: UIComponent2D[];
}

// === Basic 3D Component Types ===
export interface UIComponent3D {
  id: string;
  type: string;            // e.g. "mesh", "light", "camera", "group"
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number }; // radians
  scale: { x: number; y: number; z: number };
  material?: Record<string, any>;  // Material properties (color, texture, metalness, roughness)
  children?: UIComponent3D[];
}

// === Timeline Keyframe ===
export interface Keyframe {
  id: string;
  targetId: string;       // ID of the component being animated
  property: string;       // e.g. "opacity", "x", "rotation", "scale"
  time: number;           // time in milliseconds or seconds
  value: any;             // value at this keyframe (number, string, etc.)
  easing?: string;        // easing function name e.g. "ease-in-out"
}

// === Animation Track ===
export interface AnimationTrack {
  id: string;
  targetId: string;       // component ID this track animates
  property: string;       // property name
  keyframes: Keyframe[];
}

// === GarageBot Message ===
export interface GarageBotMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

// === Real-time Collaboration ===
export interface Collaborator {
  id: string;
  name: string;
  avatarUrl?: string;
  cursorPosition: { x: number; y: number };
  selectionIds: string[];  // IDs of components currently selected by collaborator
  isOnline: boolean;
}

// === Studio Props ===
export interface StudioLayoutProps {
  mode: BuilderMode;
  onModeChange: (mode: BuilderMode) => void;
  children: React.ReactNode;
}

// === Utility Types ===
export type Position2D = { x: number; y: number };
export type Size2D = { width: number; height: number };
export type RotationDegrees = number;
export type RotationRadians3D = { x: number; y: number; z: number };
export type Scale3D = { x: number; y: number; z: number };
