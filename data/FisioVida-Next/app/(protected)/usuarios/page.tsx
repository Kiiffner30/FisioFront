'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { apiFetch, type User } from '@/lib/api';
import { getErrorMessage } from '@/lib/errors';

const userSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome.').max(120, 'Use até 120 caracteres.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  password: z.string().min(8, 'Use pelo menos 8 caracteres.').max(72, 'Use até 72 caracteres.'),
  role: z.enum(['ADMIN', 'ATENDENTE', 'FISIOTERAPEUTA']),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function UsuariosPage() {
  const { user, accessToken, onTokenRefreshed, onUnauthorized } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', password: '', role: 'FISIOTERAPEUTA' },
  });

  const onSubmit: SubmitHandler<UserFormValues> = async (values) => {
    try {
      const created = await apiFetch<User>('/users', {
        method: 'POST',
        accessToken,
        onTokenRefreshed,
        onUnauthorized,
        body: JSON.stringify(values),
      });

      showToast('success', `Usuário ${created.name} criado com sucesso.`);
      reset();
    } catch (error) {
      showToast('error', getErrorMessage(error));
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <section className="card card-pad" role="alert">
        <h1>Acesso negado</h1>
        <p>Esta área está disponível apenas para administradores.</p>
      </section>
    );
  }

  return (
    <>
      <header className="page-head">
        <h1>Usuários</h1>
        <p>Cadastre novos usuários do sistema.</p>
      </header>

      <section className="card card-pad">
        <h2>Novo usuário</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="user-name">Nome</label>
              <input id="user-name" {...register('name')} aria-invalid={Boolean(errors.name)} />
              {errors.name && <small role="alert">{errors.name.message}</small>}
            </div>

            <div className="form-field">
              <label htmlFor="user-email">E-mail</label>
              <input
                id="user-email"
                type="email"
                autoComplete="email"
                {...register('email')}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <small role="alert">{errors.email.message}</small>}
            </div>

            <div className="form-field">
              <label htmlFor="user-password">Senha</label>
              <input
                id="user-password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <small role="alert">{errors.password.message}</small>}
            </div>

            <div className="form-field">
              <label htmlFor="user-role">Perfil</label>
              <select id="user-role" {...register('role')}>
                <option value="ADMIN">ADMIN</option>
                <option value="ATENDENTE">ATENDENTE</option>
                <option value="FISIOTERAPEUTA">FISIOTERAPEUTA</option>
              </select>
              {errors.role && <small role="alert">{errors.role.message}</small>}
            </div>
          </div>

          <button className="btn-new" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="icon request-spinner" aria-hidden="true" />
                Criando...
              </>
            ) : 'Criar usuário'}
          </button>
        </form>
      </section>

      <section className="card card-pad" aria-live="polite">
        <h2>Listagem indisponível</h2>
        <p>Listagem de usuários não disponível no backend atual.</p>
      </section>
      <style jsx>{`
        .request-spinner { animation: request-spin 0.8s linear infinite; }
        @keyframes request-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .request-spinner { animation-duration: 2s; }
        }
      `}</style>
    </>
  );
}
