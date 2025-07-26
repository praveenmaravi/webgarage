'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Top Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-background">
          {children}
        </main>

        {/* Optional Footer */}
        <Footer />
      </div>
    </div>
  );
}
