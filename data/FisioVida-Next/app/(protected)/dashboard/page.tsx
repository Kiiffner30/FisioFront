'use client';

import { CalendarDays, ClipboardList, UserRound } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const roleLabels = {
  ADMIN: 'Administrador',
  ATENDENTE: 'Atendente',
  FISIOTERAPEUTA: 'Fisioterapeuta',
} as const;

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <header className="page-head">
        <h1>Dashboard</h1>
        <p>Bem-vindo{user?.name ? `, ${user.name}` : ''}.</p>
      </header>

      <div className="kpi-grid">
        <article className="card kpi">
          <div className="kpi-top"><UserRound aria-hidden="true" /></div>
          <div className="kpi-label">Usuário</div>
          <div className="kpi-value">{user?.name ?? '—'}</div>
        </article>
        <article className="card kpi">
          <div className="kpi-top"><ClipboardList aria-hidden="true" /></div>
          <div className="kpi-label">Perfil de acesso</div>
          <div className="kpi-value">{user ? roleLabels[user.role] : '—'}</div>
        </article>
        <article className="card kpi">
          <div className="kpi-top"><CalendarDays aria-hidden="true" /></div>
          <div className="kpi-label">E-mail</div>
          <div className="kpi-value">{user?.email ?? '—'}</div>
        </article>
      </div>

      <section className="card card-pad" aria-labelledby="clinical-notice-title">
        <h2 id="clinical-notice-title">Próximas funcionalidades</h2>
        <p>
          As funcionalidades clínicas de pacientes, agenda e sessões serão
          adicionadas quando as rotas correspondentes estiverem disponíveis no backend.
        </p>
      </section>
    </>
  );
}
