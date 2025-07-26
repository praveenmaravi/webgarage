"use client";

import React from "react";
import { useGarageBot } from "./useGarageBot";

const predefinedPrompts = [
  {
    label: "🎨 Design UI",
    prompt: "Generate a modern, responsive glassmorphic login UI using TailwindCSS.",
  },
  {
    label: "⚙️ Fix Code",
    prompt: "I have a bug in my React state logic. Help me debug it.",
  },
  {
    label: "🚀 Add Animation",
    prompt: "Add a bounce-in animation to the CTA button using Framer Motion.",
  },
  {
    label: "🧠 Explain Code",
    prompt: "Explain what this block of JavaScript code is doing.",
  },
  {
    label: "📦 Backend API",
    prompt: "Generate a secure Node.js Express endpoint for user login with JWT.",
  },
  {
    label: "🌐 Deploy Project",
    prompt: "Guide me to deploy a full-stack Next.js app with Vercel or Netlify.",
  },
];

export const PromptTemplates: React.FC = () => {
  const { sendMessage } = useGarageBot();

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {predefinedPrompts.map((item, index) => (
        <button
          key={index}
          onClick={() => sendMessage(item.prompt)}
          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-3 py-2 transition-all"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
