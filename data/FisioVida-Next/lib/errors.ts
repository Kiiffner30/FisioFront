import { ApiRequestError } from '@/lib/api';

const translations: Record<string, string> = {
  'credenciales inválidas': 'E-mail ou senha inválidos.',
  'no autenticado': 'Sua sessão expirou. Entre novamente.',
  'solicitud inválida': 'Confira os dados informados.',
  'sesión inválida o expirada': 'Sua sessão expirou. Entre novamente.',
  'el usuario está inactivo': 'Este usuário está inativo.',
  'usuario no encontrado': 'Usuário não encontrado.',
  'acceso denegado': 'Você não tem permissão para esta ação.',
  'ya existe un usuario con ese email': 'Este e-mail já está cadastrado.',
  'recurso no encontrado': 'Recurso não encontrado.',
};

export function translateApiError(message: string): string {
  const normalized = message.trim().toLocaleLowerCase('es');
  return translations[normalized] ?? 'Não foi possível concluir a solicitação. Tente novamente.';
}

export type ErrorKind =
  | 'validation'
  | 'auth'
  | 'permission'
  | 'notFound'
  | 'conflict'
  | 'network'
  | 'server'
  | 'unknown';

export function classifyError(error: unknown): ErrorKind {
  if (error instanceof ApiRequestError) {
    if (error.status === 0) return 'network';

    switch (error.status) {
      case 400: return 'validation';
      case 401: return 'auth';
      case 403: return 'permission';
      case 404: return 'notFound';
      case 409: return 'conflict';
      case 500: return 'server';
      default: return 'unknown';
    }
  }

  if (error instanceof TypeError && error.message.toLowerCase().includes('fetch')) {
    return 'network';
  }

  return 'unknown';
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError && error.apiError.error === 'TimeoutError') {
    return error.apiError.message;
  }

  if (error instanceof ApiRequestError && error.status === 0) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
  }

  if (error instanceof ApiRequestError) {
    return translateApiError(error.apiError.message);
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}
