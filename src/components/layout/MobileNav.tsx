'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';

const navLinks = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Studio', path: '/studio' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Deploy', path: '/deploy' },
  { name: 'Settings', path: '/settings' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        className="p-2 text-foreground focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-background border-t z-50 shadow-md">
          <nav className="flex flex-col px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  router.push(link.path);
                  closeMenu();
                }}
                className="text-left w-full px-2 py-2 rounded hover:bg-muted"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
