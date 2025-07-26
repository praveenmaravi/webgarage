import create from "zustand";

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setDarkMode: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  darkMode: false,
  sidebarOpen: true,

  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setDarkMode: (value) => set({ darkMode: value }),

  setSidebarOpen: (value) => set({ sidebarOpen: value }),
}));
