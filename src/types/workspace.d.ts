// src/types/workspace.d.ts

export type WorkspaceMode = '2d' | '3d' | 'animation' | 'backend' | 'preview';

export interface SelectedComponent {
  id: string;
  type: string;
}

export interface CanvasTransform {
  zoom: number;
  position: { x: number; y: number };
  rotation?: { x: number; y: number; z: number }; // for 3D mode
}

export interface WorkspaceState {
  currentProjectId: string | null;
  currentPageId: string | null;
  selectedComponent: SelectedComponent | null;
  hoveredComponentId: string | null;
  mode: WorkspaceMode;
  isPreviewMode: boolean;
  canvasTransform: CanvasTransform;
  snappingEnabled: boolean;
  gridVisible: boolean;
  showGuides: boolean;
  collaborationActive: boolean;
}
