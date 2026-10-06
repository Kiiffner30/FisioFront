'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  CalendarDays,
  LayoutDashboard,
  Settings,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pacientes', label: 'Pacientes', icon: Users },
    { href: '/agenda', label: 'Agenda', icon: CalendarDays },
    ...(user?.role === 'ADMIN'
      ? [{ href: '/usuarios', label: 'Usuários', icon: UserRound }]
      : []),
  ];

  function linkIsActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className={cn('sidebar', isOpen && 'open')} id="sidebar">
      <div className="side-brand">
        <div className="brand-mark"><Activity className="icon" aria-hidden="true" /></div>
        <div>
          <div className="side-brand-name">FisioVida</div>
          <div className="side-brand-sub">Clínica de Fisioterapia</div>
        </div>
        <button
          className="side-close"
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <X className="icon" aria-hidden="true" />
        </button>
      </div>

      <nav className="nav-group" aria-label="Navegação principal">
        {links.map(({ href, label, icon: Icon }) => {
          const active = linkIsActive(href);

          return (
            <Link
              key={href}
              className={cn('nav-item', active && 'active')}
              href={href}
              onClick={onClose}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="icon" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="nav-spacer" />

      <nav className="nav-group nav-foot" aria-label="Configurações">
        <Link
          className={cn('nav-item', linkIsActive('/configuracoes') && 'active')}
          href="/configuracoes"
          onClick={onClose}
          aria-current={linkIsActive('/configuracoes') ? 'page' : undefined}
        >
          <Settings className="icon" aria-hidden="true" />
          Configurações
        </Link>
      </nav>
    </aside>
  );
}
