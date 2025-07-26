import { ReactNode } from 'react';
import GarageBot from '../garageBot/GarageBot';
import { Bot, Cube, Layers, Settings } from 'lucide-react';

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Studio Sidebar */}
      <aside className="w-16 md:w-20 bg-muted border-r flex flex-col items-center py-4 space-y-6">
        <ToolButton label="2D" icon={<Layers size={20} />} />
        <ToolButton label="3D" icon={<Cube size={20} />} />
        <ToolButton label="Anim" icon={<Settings size={20} />} />
        <ToolButton label="Bot" icon={<Bot size={20} />} />
      </aside>

      {/* Main Canvas + Timeline */}
      <div className="flex-1 flex flex-col relative">
        {/* Canvas / Builder Area */}
        <div className="flex-1 overflow-auto relative bg-zinc-100 dark:bg-zinc-900">
          {children}
        </div>

        {/* Animation Timeline Editor */}
        <div className="h-48 border-t bg-muted px-4 py-2">
          <p className="text-sm font-medium text-muted-foreground">🎞️ Animation Timeline (GSAP / Framer)</p>
          {/* Timeline component will go here */}
        </div>
      </div>

      {/* GarageBot Assistant */}
      <div className="hidden xl:block w-[360px] border-l bg-background">
        <GarageBot />
      </div>
    </div>
  );
}

function ToolButton({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <button
      className="flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-background rounded-xl hover:bg-accent transition"
      title={label}
    >
      {icon}
      <span className="text-[10px] mt-1 hidden md:block">{label}</span>
    </button>
  );
}
