'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { getErrorMessage } from '@/lib/errors';

const loginSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard');
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    try {
      await login(email, password);
      showToast('success', 'Login realizado com sucesso.');
      router.push('/dashboard');
    } catch (error) {
      showToast('error', getErrorMessage(error));
    }
  };

  if (isLoading || isAuthenticated) {
    return (
      <main className="login-form-wrap" role="status" aria-live="polite">
        Verificando sessão...
      </main>
    );
  }

  return (
    <main id="view-login">
      <section className="login-art" aria-label="FisioVida">
        <div className="brand">
          <div className="brand-mark"><Activity aria-hidden="true" /></div>
          <div>
            <div className="brand-name">FisioVida</div>
            <div className="brand-sub">Clínica de Fisioterapia</div>
          </div>
        </div>

        <div>
          <h1>Mais movimento, mais qualidade de vida.</h1>
          <p>Gestão da clínica com foco em quem mais importa: seus pacientes.</p>
          <div className="art-figure">
            <div className="art-chip"><b>Seguro</b><span>Acesso à equipe</span></div>
            <div className="art-chip"><b>Privado</b><span>Sessão protegida</span></div>
            <div className="art-chip"><b>FisioVida</b><span>Painel da clínica</span></div>
          </div>
        </div>

        <div className="login-foot">© 2026 FisioVida — painel de uso interno da clínica</div>
      </section>

      <section className="login-form-wrap">
        <form className="login-card" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Bem-vindo de volta</h2>
          <p>Acesse o painel administrativo da clínica.</p>

          <div className="field">
            <label htmlFor="login-email">E-mail</label>
            <div className="input-wrap">
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="seu@email.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                {...register('email')}
              />
            </div>
            {errors.email && <small id="login-email-error" role="alert">{errors.email.message}</small>}
          </div>

          <div className="field">
            <label htmlFor="login-password">Senha</label>
            <div className="input-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                {...register('password')}
              />
              <button
                className="toggle-eye"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <small id="login-password-error" role="alert">{errors.password.message}</small>}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </section>
    </main>
  );
}
