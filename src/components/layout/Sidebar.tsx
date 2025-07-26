'use client';

import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  LayoutDashboard,
  PencilRuler,
  Store,
  Rocket,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Studio', icon: PencilRuler, path: '/studio' },
  { label: 'Marketplace', icon: Store, path: '/marketplace' },
  { label: 'Deploy', icon: Rocket, path: '/deploy' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();

  const currentPath = useMemo(() => router.pathname, [router.pathname]);

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r bg-muted p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">🚗 WebGarage</h2>
        <p className="text-sm text-muted-foreground">Build. Animate. Deploy.</p>
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = currentPath.startsWith(path);
          return (
            <button
              key={label}
              onClick={() => router.push(path)}
              className={`flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-all
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow'
                    : 'hover:bg-accent text-muted-foreground'
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
