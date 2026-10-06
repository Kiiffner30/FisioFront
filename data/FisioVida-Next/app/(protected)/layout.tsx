'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div id="view-app">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="main">
          <Header onMenuClick={() => setIsSidebarOpen((open) => !open)} />
          <main className="content" id="content">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
