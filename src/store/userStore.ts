// src/store/userStore.ts
import create from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  token: string | null;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setToken: (token: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => set({ user: userData, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  setToken: (token) =>
    set((state) => ({
      user: state.user ? { ...state.user, token } : null,
    })),
}));
