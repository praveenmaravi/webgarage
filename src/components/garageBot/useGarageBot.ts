import { useState } from "react";
import axios from "axios";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export function useGarageBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const newUserMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/garagebot", {
        messages: updatedMessages,
      });

      const botMessage: Message = {
        role: "assistant",
        content: response.data?.response || "Sorry, I didn't understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error("GarageBot error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
