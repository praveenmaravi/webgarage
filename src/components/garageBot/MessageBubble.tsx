import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils"; // Utility for class merging

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="mr-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            🤖
          </div>
        </div>
      )}

      <div
        className={cn(
          "rounded-xl px-4 py-2 max-w-[70%] text-sm whitespace-pre-wrap",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-zinc-800 text-gray-100 rounded-bl-none"
        )}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>

      {isUser && (
        <div className="ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold">
            🙋
          </div>
        </div>
      )}
    </div>
  );
}
