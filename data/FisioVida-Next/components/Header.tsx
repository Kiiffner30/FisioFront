'use client';

import { useState } from 'react';
import { Loader2, LogOut, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const roleLabels = {
  ADMIN: 'Administrador',
  ATENDENTE: 'Atendente',
  FISIOTERAPEUTA: 'Fisioterapeuta',
} as const;

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials = user?.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      router.push('/login');
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="topbar">
      <button
        className="burger"
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        <Menu className="icon" aria-hidden="true" />
      </button>

      <div className="topbar-spacer" />

      <div className="who">
        <div className="avatar" aria-hidden="true">{initials || 'FV'}</div>
        <div>
          <div className="who-name">{user?.name ?? 'Usuário'}</div>
          {user && (
            <span className="badge blue">
              <span className="dot" />
              {roleLabels[user.role]}
            </span>
          )}
        </div>
      </div>

      <button
        className="icon-btn"
        type="button"
        onClick={() => void handleLogout()}
        disabled={isLoggingOut}
        aria-busy={isLoggingOut}
        aria-label={isLoggingOut ? 'Encerrando sessão' : 'Sair da conta'}
        title="Sair"
      >
        {isLoggingOut
          ? <Loader2 className="icon logout-spinner" aria-hidden="true" />
          : <LogOut className="icon" aria-hidden="true" />}
      </button>
      <style jsx>{`
        .logout-spinner { animation: logout-spin 0.8s linear infinite; }
        @keyframes logout-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .logout-spinner { animation-duration: 2s; }
        }
      `}</style>
    </header>
  );
}
