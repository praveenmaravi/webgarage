import { useState } from "react";
import axios from "axios";

interface GarageBotHook {
  askBot: (prompt: string, options?: { systemMessage?: string }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  response: string;
  history: { role: "user" | "assistant"; content: string }[];
}

export const useGarageBot = (): GarageBotHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const askBot = async (prompt: string, options?: { systemMessage?: string }) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      prompt,
      history,
      systemMessage: options?.systemMessage || "You are GarageBot, a futuristic AI assistant for building websites and apps."
    };

    try {
      const res = await axios.post("/api/garagebot", payload);
      const aiReply = res.data.response;

      setResponse(aiReply);
      setHistory(prev => [
        ...prev,
        { role: "user", content: prompt },
        { role: "assistant", content: aiReply }
      ]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { askBot, isLoading, error, response, history };
};
