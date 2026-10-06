const API_BASE_URL = '/api';
const API_REQUEST_TIMEOUT_MS = 10_000;

export type UserRole = 'ADMIN' | 'ATENDENTE' | 'FISIOTERAPEUTA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresInSeconds: number;
  user: User;
}

// Login e refresh retornam o mesmo formato no backend.
export type AuthResponse = LoginResponse;

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

/** Erro HTTP tipado, mantendo o corpo ApiError enviado pelo backend. */
export class ApiRequestError extends Error {
  readonly status: number;
  readonly apiError: ApiError;

  constructor(apiError: ApiError) {
    super(apiError.message || apiError.error || 'Não foi possível concluir a solicitação.');
    this.name = 'ApiRequestError';
    this.status = apiError.status;
    this.apiError = apiError;
  }
}

export interface ApiFetchOptions extends RequestInit {
  /** Access token mantido em memória pelo AuthContext e passado pela tela. */
  accessToken?: string | null;
  /** Atualiza o AuthContext quando um 401 exige renovar o access token. */
  onTokenRefreshed?: (response: AuthResponse) => void;
  /** Chamado quando o refresh falha e a sessão precisa ser encerrada. */
  onUnauthorized?: () => void;
}

function assertClientRequest(): void {
  if (typeof window === 'undefined') {
    throw new Error('apiFetch só pode ser chamado no navegador.');
  }
}

function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Aceita tanto "/auth/me" quanto "/api/auth/me" sem duplicar o prefixo.
  if (normalizedPath === API_BASE_URL || normalizedPath.startsWith(`${API_BASE_URL}/`)) {
    return normalizedPath;
  }

  return `${API_BASE_URL}${normalizedPath}`;
}

function createHeaders(options: RequestInit, accessToken?: string | null): Headers {
  const headers = new Headers(options.headers);

  if (options.body != null && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
}

async function parseApiError(response: Response): Promise<ApiError> {
  const fallback: ApiError = {
    timestamp: new Date().toISOString(),
    status: response.status,
    error: response.statusText || 'Erro na API',
    message: response.statusText || 'Não foi possível concluir a solicitação.',
    path: response.url,
  };

  try {
    const body: unknown = await response.json();
    if (typeof body !== 'object' || body === null) return fallback;

    const data = body as Partial<ApiError>;
    return {
      timestamp: typeof data.timestamp === 'string' ? data.timestamp : fallback.timestamp,
      status: typeof data.status === 'number' ? data.status : fallback.status,
      error: typeof data.error === 'string' ? data.error : fallback.error,
      message: typeof data.message === 'string' ? data.message : fallback.message,
      path: typeof data.path === 'string' ? data.path : fallback.path,
    };
  } catch {
    return fallback;
  }
}

async function throwForError(response: Response): Promise<never> {
  throw new ApiRequestError(await parseApiError(response));
}

function createNetworkError(path: string): ApiRequestError {
  return new ApiRequestError({
    timestamp: new Date().toISOString(),
    status: 0,
    error: 'NetworkError',
    message: 'Não foi possível conectar ao servidor.',
    path: getApiUrl(path),
  });
}

async function fetchWithNetworkHandling(
  path: string,
  options: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  let timedOut = false;
  const callerSignal = options.signal;
  const abortFromCaller = () => controller.abort(callerSignal?.reason);

  if (callerSignal?.aborted) {
    abortFromCaller();
  } else {
    callerSignal?.addEventListener('abort', abortFromCaller, { once: true });
  }

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, API_REQUEST_TIMEOUT_MS);

  try {
    return await fetch(getApiUrl(path), { ...options, signal: controller.signal });
  } catch {
    if (timedOut) {
      throw new ApiRequestError({
        timestamp: new Date().toISOString(),
        status: 0,
        error: 'TimeoutError',
        message: 'O servidor demorou para responder. Tente novamente.',
        path: getApiUrl(path),
      });
    }
    throw createNetworkError(path);
  } finally {
    clearTimeout(timeoutId);
    callerSignal?.removeEventListener('abort', abortFromCaller);
  }
}

/**
 * Chamada sem autenticação nem tentativa automática de refresh.
 * Use para login, refresh e logout para evitar recursão em respostas 401.
 */
export async function apiFetchNoAuth<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  assertClientRequest();

  const response = await fetchWithNetworkHandling(path, {
    ...options,
    headers: createHeaders(options),
    credentials: 'include',
  });

  if (!response.ok) await throwForError(response);
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

/** Chamada autenticada; em 401 renova a sessão uma vez e repete a requisição. */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  assertClientRequest();

  const {
    accessToken,
    onTokenRefreshed,
    onUnauthorized,
    ...requestOptions
  } = options;

  const request = (token?: string | null) =>
    fetchWithNetworkHandling(path, {
      ...requestOptions,
      headers: createHeaders(requestOptions, token),
      credentials: 'include',
    });

  let response = await request(accessToken);

  if (response.status === 401) {
    let refreshed: AuthResponse;

    try {
      refreshed = await apiFetchNoAuth<AuthResponse>('/auth/refresh', {
        method: 'POST',
      });
    } catch (error) {
      if (error instanceof ApiRequestError && error.status === 0) {
        throw error;
      }

      onUnauthorized?.();
      throw new ApiRequestError(await parseApiError(response));
    }

    onTokenRefreshed?.(refreshed);
    response = await request(refreshed.accessToken);

    // Se a requisição continuar sem autorização, não tenta renovar novamente.
    if (response.status === 401) {
      onUnauthorized?.();
    }
  }

  if (!response.ok) await throwForError(response);
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}
