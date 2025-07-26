// src/store/garageBotStore.ts
import create from "zustand";

export interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: number;
  type?: "text" | "image" | "code" | "error"; // extendable
}

interface GarageBotState {
  messages: Message[];
  isLoading: boolean;
  userInput: string;

  // Actions
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setUserInput: (input: string) => void;
  removeMessage: (id: string) => void;
}

export const useGarageBotStore = create<GarageBotState>((set, get) => ({
  messages: [],
  isLoading: false,
  userInput: "",

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setUserInput: (input) => set({ userInput: input }),

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));
