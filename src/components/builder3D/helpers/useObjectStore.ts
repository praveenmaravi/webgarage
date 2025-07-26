import { create } from 'zustand';

// Define the type for the 3D object
interface Object3D {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

// Zustand store for managing 3D objects
interface ObjectStore {
  objects: Object3D[];
  addObject: (object: Object3D) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<Object3D>) => void;
  resetStore: () => void; // Option to reset the store if needed
}

// Create the Zustand store
export const useObjectStore = create<ObjectStore>((set) => ({
  objects: [],
  addObject: (object: Object3D) => set((state) => ({ objects: [...state.objects, object] })),
  removeObject: (id: string) =>
    set((state) => ({ objects: state.objects.filter((object) => object.id !== id) })),
  updateObject: (id: string, updates: Partial<Object3D>) =>
    set((state) => ({
      objects: state.objects.map((object) =>
        object.id === id ? { ...object, ...updates } : object
      ),
    })),
  resetStore: () => set({ objects: [] }),
}));

