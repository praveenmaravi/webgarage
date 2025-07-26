import create from "zustand";

export interface Collaborator {
  id: string;                 // Unique user ID or socket ID
  name: string;               // Collaborator display name
  color: string;              // Cursor color or highlight color
  cursorPos: { x: number; y: number };  // Cursor position on canvas/editor
  lastActive: number;         // Timestamp for presence timeout (optional)
}

interface CollaborationState {
  collaborators: Collaborator[];
  addCollaborator: (collab: Collaborator) => void;
  updateCursor: (id: string, pos: { x: number; y: number }) => void;
  removeCollaborator: (id: string) => void;
  updateLastActive: (id: string, timestamp: number) => void;
  clearCollaborators: () => void;
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  collaborators: [],

  addCollaborator: (collab) =>
    set((state) => {
      // Avoid duplicate collaborators
      const exists = state.collaborators.find((c) => c.id === collab.id);
      if (exists) return state;
      return { collaborators: [...state.collaborators, collab] };
    }),

  updateCursor: (id, pos) =>
    set((state) => ({
      collaborators: state.collaborators.map((c) =>
        c.id === id ? { ...c, cursorPos: pos } : c
      ),
    })),

  updateLastActive: (id, timestamp) =>
    set((state) => ({
      collaborators: state.collaborators.map((c) =>
        c.id === id ? { ...c, lastActive: timestamp } : c
      ),
    })),

  removeCollaborator: (id) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.id !== id),
    })),

  clearCollaborators: () => set({ collaborators: [] }),
}));
