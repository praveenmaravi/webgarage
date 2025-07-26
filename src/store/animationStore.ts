import create from "zustand";
import { nanoid } from "nanoid";

export interface Keyframe {
  id: string;              // unique keyframe ID
  targetId: string;        // component ID this keyframe affects
  property: string;        // e.g. "opacity", "x", "scale", "rotation"
  value: any;              // value of the property at this keyframe
  time: number;            // time in milliseconds or frame number
  easing?: string;         // easing function name, e.g. "easeInOut", optional
}

interface AnimationState {
  keyframes: Keyframe[];

  // Add a new keyframe
  addKeyframe: (keyframe: Omit<Keyframe, "id">) => string;

  // Update existing keyframe by id
  updateKeyframe: (id: string, updates: Partial<Omit<Keyframe, "id" | "targetId">>) => void;

  // Remove a keyframe by id
  removeKeyframe: (id: string) => void;

  // Clear all keyframes
  clearAll: () => void;

  // Get keyframes for a specific component (target)
  getKeyframesByTarget: (targetId: string) => Keyframe[];
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  keyframes: [],

  addKeyframe: (keyframe) => {
    const id = nanoid();
    set((state) => ({
      keyframes: [...state.keyframes, { id, ...keyframe }],
    }));
    return id;
  },

  updateKeyframe: (id, updates) =>
    set((state) => ({
      keyframes: state.keyframes.map((kf) =>
        kf.id === id ? { ...kf, ...updates } : kf
      ),
    })),

  removeKeyframe: (id) =>
    set((state) => ({
      keyframes: state.keyframes.filter((kf) => kf.id !== id),
    })),

  clearAll: () => set({ keyframes: [] }),

  getKeyframesByTarget: (targetId) => {
    return get().keyframes.filter((kf) => kf.targetId === targetId);
  },
}));
