// src/context/GarageBotContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Define types for chat history and bot responses
interface GarageBotContextProps {
  chatHistory: { user: string; bot: string }[]; // Store user & bot conversation pairs
  sendMessage: (message: string) => void;      // Function to send a message to the bot
  isLoading: boolean;                          // Is the bot responding
}

const GarageBotContext = createContext<GarageBotContextProps | undefined>(undefined);

// Create a mock function for API integration (e.g., OpenAI's GPT)
const fetchBotResponse = async (message: string): Promise<string> => {
  // Simulating an API call to a backend service (e.g., OpenAI)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Bot Response to: "${message}"`);
    }, 1000); // Simulate a delay of 1 second
  });
};

export const GarageBotProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to send a message to the bot
  const sendMessage = useCallback(async (message: string) => {
    // Add user message to chat history
    setChatHistory((prev) => [...prev, { user: message, bot: "" }]);

    setIsLoading(true);

    // Get bot response (mocked here, can be integrated with real API)
    const botResponse = await fetchBotResponse(message);

    // Add bot response to chat history
    setChatHistory((prev) => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1].bot = botResponse; // Set the latest bot response
      return newHistory;
    });

    setIsLoading(false);
  }, []);

  return (
    <GarageBotContext.Provider value={{ chatHistory, sendMessage, isLoading }}>
      {children}
    </GarageBotContext.Provider>
  );
};

// Custom hook to use the GarageBot context
export const useGarageBot = () => {
  const context = useContext(GarageBotContext);
  if (!context) {
    throw new Error("useGarageBot must be used within a GarageBotProvider");
  }
  return context;
};
