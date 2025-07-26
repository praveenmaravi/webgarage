// src/store/projectStore.ts

import create from "zustand";
import { nanoid } from "nanoid";

export interface ComponentData {
  id: string;
  type: string; // e.g. 'button', 'text', 'image', 'container', etc.
  props: Record<string, any>; // e.g. style, content, events
  children?: ComponentData[];  // Nested components for containers
}

interface ProjectState {
  projectId: string | null;
  projectName: string;
  components: ComponentData[];

  // Actions
  setProjectId: (id: string) => void;
  setProjectName: (name: string) => void;

  addComponent: (component: Omit<ComponentData, "id">) => string; // returns new id
  updateComponent: (id: string, newProps: Partial<ComponentData["props"]>) => void;
  removeComponent: (id: string) => void;

  resetProject: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectId: null,
  projectName: "Untitled Project",
  components: [],

  setProjectId: (id) => set({ projectId: id }),

  setProjectName: (name) => set({ projectName: name }),

  addComponent: (component) => {
    const id = nanoid();
    const newComponent: ComponentData = { id, ...component };
    set((state) => ({ components: [...state.components, newComponent] }));
    return id;
  },

  updateComponent: (id, newProps) => {
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, props: { ...comp.props, ...newProps } } : comp
      ),
    }));
  },

  removeComponent: (id) => {
    // Recursive helper to remove component and its children by id
    function filterComponents(comps: ComponentData[]): ComponentData[] {
      return comps
        .filter((comp) => comp.id !== id)
        .map((comp) =>
          comp.children
            ? { ...comp, children: filterComponents(comp.children) }
            : comp
        );
    }
    set((state) => ({ components: filterComponents(state.components) }));
  },

  resetProject: () => set({ projectId: null, projectName: "Untitled Project", components: [] }),
}));
