'use client';

import { useState } from 'react';
import { Menu, Sun, Moon, User, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full px-4 py-3 border-b bg-background shadow-sm z-50">
      {/* Left: Logo + Page Title */}
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-primary">🚗 WebGarage</span>
          <span className="text-muted-foreground text-sm hidden sm:inline">| Build the Future</span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Profile Dropdown (Mocked) */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-1 rounded px-3 py-1 hover:bg-muted transition">
            <User size={18} />
            <ChevronDown size={16} />
          </div>
          <div className="absolute right-0 mt-1 hidden group-hover:block bg-popover border rounded shadow-md text-sm min-w-[120px] z-50">
            <div className="px-4 py-2 hover:bg-muted cursor-pointer">Profile</div>
            <div className="px-4 py-2 hover:bg-muted cursor-pointer">Settings</div>
            <div className="px-4 py-2 hover:bg-muted cursor-pointer text-red-500">Logout</div>
          </div>
        </div>
      </div>
    </header>
  );
}
