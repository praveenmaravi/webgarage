import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { useGarageBot } from "./useGarageBot";
import { Loader2 } from "lucide-react";

export const ChatWindow = () => {
  const { messages, sendMessage, isLoading } = useGarageBot();
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Chat messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-2 py-3 space-y-2 bg-zinc-900 rounded-md"
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="flex items-center text-sm text-gray-400">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> GarageBot is typing...
          </div>
        )}
      </div>

      {/* Input field */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-md placeholder:text-zinc-400"
          placeholder="Ask GarageBot anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};
