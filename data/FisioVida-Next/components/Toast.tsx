'use client';

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ToastItem, ToastType } from '@/context/ToastContext';

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const appearance: Record<ToastType, { icon: typeof CheckCircle2; label: string }> = {
  success: { icon: CheckCircle2, label: 'Sucesso' },
  error: { icon: XCircle, label: 'Erro' },
  info: { icon: Info, label: 'Informação' },
  warning: { icon: AlertTriangle, label: 'Atenção' },
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const { icon: Icon, label } = appearance[toast.type];

  return (
    <div
      className={`toast toast-${toast.type}${toast.isExiting ? ' toast-exiting' : ''}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      aria-label={label}
    >
      <Icon className="toast-icon" aria-hidden="true" />
      <p className="toast-message">{toast.message}</p>
      <button
        className="toast-close"
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fechar notificação"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <style jsx>{`
        .toast {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 280px;
          max-width: 100%;
          padding: 14px 16px;
          color: var(--ink-900);
          background: var(--surface, #fff);
          border: 1px solid var(--line);
          border-left: 4px solid var(--teal-500);
          border-radius: var(--radius-md);
          box-shadow: 0 12px 32px rgba(10, 35, 35, 0.18);
          opacity: 1;
          transform: translateX(0);
          animation: toast-enter 180ms ease-out both;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .toast-success { border-left-color: var(--green); }
        .toast-error { border-left-color: var(--red); }
        .toast-info { border-left-color: var(--blue); }
        .toast-warning { border-left-color: var(--amber); }
        .toast-success .toast-icon { color: var(--green); }
        .toast-error .toast-icon { color: var(--red); }
        .toast-info .toast-icon { color: var(--blue); }
        .toast-warning .toast-icon { color: var(--amber); }

        .toast-icon { flex: 0 0 auto; }
        .toast-message { flex: 1; margin: 0; font-size: 0.9rem; }
        .toast-close {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          padding: 4px;
          color: var(--ink-500);
          background: transparent;
          border: 0;
          border-radius: 6px;
          cursor: pointer;
        }
        .toast-close:hover { color: var(--ink-900); background: var(--bg); }
        .toast-exiting { opacity: 0; transform: translateX(14px); }

        @keyframes toast-enter {
          from { opacity: 0; transform: translateX(14px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .toast { animation-duration: 1ms; transition-duration: 1ms; }
        }
      `}</style>
    </div>
  );
}
