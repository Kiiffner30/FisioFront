'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/Loading';
import { ApiRequestError } from '@/lib/api';
import {
  apiFetch,
  apiFetchNoAuth,
  type AuthResponse,
  type LoginResponse,
  type User,
} from '@/lib/api';
import { classifyError, getErrorMessage } from '@/lib/errors';
import { useToast } from '@/context/ToastContext';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  loadUser: () => Promise<void>;
  onTokenRefreshed: (response: AuthResponse) => void;
  onUnauthorized: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Refs guardam apenas o estado em memória e permitem ler a sessão mais recente
  // entre atualizações do React, sem persistir o token no navegador.
  const accessTokenRef = useRef<string | null>(null);
  const userRef = useRef<User | null>(null);
  const bootStartedRef = useRef(false);

  const saveSession = useCallback((token: string | null, nextUser: User | null) => {
    accessTokenRef.current = token;
    userRef.current = nextUser;
    setAccessToken(token);
    setUser(nextUser);
  }, []);

  const clearSession = useCallback(() => {
    saveSession(null, null);
  }, [saveSession]);

  const onTokenRefreshed = useCallback((response: AuthResponse) => {
    accessTokenRef.current = response.accessToken;
    setAccessToken(response.accessToken);

    if (response.user) {
      userRef.current = response.user;
      setUser(response.user);
    }
  }, []);

  const onUnauthorized = useCallback(() => {
    clearSession();
    router.push('/login');
  }, [clearSession, router]);

  const refresh = useCallback(async () => {
    try {
      const response = await apiFetchNoAuth<AuthResponse>('/auth/refresh', {
        method: 'POST',
      });

      accessTokenRef.current = response.accessToken;
      setAccessToken(response.accessToken);

      if (response.user) {
        userRef.current = response.user;
        setUser(response.user);
      }
    } catch (error) {
      if (classifyError(error) !== 'network') {
        clearSession();
      }
      throw error;
    }
  }, [clearSession]);

  const loadUser = useCallback(async () => {
    const currentUser = await apiFetch<User>('/auth/me', {
      accessToken: accessTokenRef.current,
      onTokenRefreshed,
      onUnauthorized,
    });

    userRef.current = currentUser;
    setUser(currentUser);
  }, [onTokenRefreshed, onUnauthorized]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiFetchNoAuth<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    saveSession(response.accessToken, response.user);
  }, [saveSession]);

  const logout = useCallback(async () => {
    try {
      await apiFetchNoAuth<void>('/auth/logout', { method: 'POST' });
    } catch {
      // A sessão local deve ser limpa mesmo quando a API está indisponível.
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const restoreSession = useCallback(async () => {
    setIsLoading(true);
    let safetyTimeout: ReturnType<typeof setTimeout> | undefined;
    const safetyTimeoutPromise = new Promise<never>((_, reject) => {
      safetyTimeout = setTimeout(() => reject(new ApiRequestError({
        timestamp: new Date().toISOString(),
        status: 0,
        error: 'TimeoutError',
        message: 'O servidor demorou para responder. Tente novamente.',
        path: '/api/auth/refresh',
      })), 15_000);
    });

    try {
      await Promise.race([refresh(), safetyTimeoutPromise]);

      // O backend atual inclui user no refresh; este fallback cobre respostas
      // que no futuro retornem apenas o access token.
      if (!userRef.current) {
        await loadUser();
      }
    } catch (error) {
      // Sem cookie válido, o usuário começa deslogado sem alerta de erro.
      if (classifyError(error) === 'network') {
        showToast('error', getErrorMessage(error));
      } else {
        clearSession();
      }
    } finally {
      if (safetyTimeout) clearTimeout(safetyTimeout);
      setIsLoading(false);
    }
  }, [clearSession, loadUser, refresh, showToast]);

  useEffect(() => {
    // Evita consumir duas vezes o refresh token rotativo no Strict Mode.
    if (bootStartedRef.current) return;
    bootStartedRef.current = true;
    void restoreSession();
  }, [restoreSession]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    accessToken,
    isLoading,
    isAuthenticated: user !== null && accessToken !== null,
    login,
    logout,
    refresh,
    loadUser,
    onTokenRefreshed,
    onUnauthorized,
  }), [
    user,
    accessToken,
    isLoading,
    login,
    logout,
    refresh,
    loadUser,
    onTokenRefreshed,
    onUnauthorized,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <Loading fullScreen label="Verificando sessão..." />
      ) : children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>.');
  }

  return context;
}
