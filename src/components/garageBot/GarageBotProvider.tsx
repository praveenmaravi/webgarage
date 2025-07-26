import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type GarageBotContextType = {
  messages: Message[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
};

const GarageBotContext = createContext<GarageBotContextType | undefined>(undefined);

export const GarageBotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const newUserMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post("/api/garagebot", { prompt: text });
      const botMessage: Message = { role: "assistant", content: res.data.response };

      setMessages([...updatedMessages, botMessage]);
    } catch (err) {
      console.error("GarageBot error:", err);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return (
    <GarageBotContext.Provider value={{ messages, loading, sendMessage, clearMessages }}>
      {children}
    </GarageBotContext.Provider>
  );
};

export const useGarageBotContext = (): GarageBotContextType => {
  const context = useContext(GarageBotContext);
  if (!context) {
    throw new Error("useGarageBotContext must be used within a GarageBotProvider");
  }
  return context;
};
