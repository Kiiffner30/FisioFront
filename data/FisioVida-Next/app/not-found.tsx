'use client';

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Loading } from '@/components/Loading';

export default function NotFound() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading fullScreen label="Verificando sessão..." />;
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'var(--bg)',
      }}
    >
      <section className="card card-pad" style={{ maxWidth: 520, textAlign: 'center' }}>
        <FileQuestion
          size={48}
          aria-hidden="true"
          style={{ color: 'var(--teal-500)', margin: '0 auto 16px' }}
        />
        <h1>Página não encontrada</h1>
        <p>A página que você tentou acessar não existe ou foi movida.</p>
        <Link className="btn btn-primary" href={isAuthenticated ? '/dashboard' : '/login'}>
          {isAuthenticated ? 'Voltar ao dashboard' : 'Ir para o login'}
        </Link>
      </section>
    </main>
  );
}
