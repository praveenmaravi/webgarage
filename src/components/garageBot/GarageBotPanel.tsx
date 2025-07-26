'use client';

import { ChatWindow } from './ChatWindow';
import { PromptTemplates } from './PromptTemplates';
import { GarageBotProvider } from './GarageBotProvider';
import { Sparkles } from 'lucide-react';

export default function GarageBotPanel() {
  return (
    <GarageBotProvider>
      <aside className="w-[360px] bg-white dark:bg-zinc-900 p-4 shadow-2xl flex flex-col h-full border-l border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-yellow-400" />
          <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
            GarageBot
          </h2>
        </div>

        <PromptTemplates />

        <div className="flex-1 overflow-hidden border rounded-md border-zinc-700">
          <ChatWindow />
        </div>
      </aside>
    </GarageBotProvider>
  );
}
