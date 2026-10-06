'use client';

interface LoadingProps {
  fullScreen?: boolean;
  label?: string;
}

export function Loading({ fullScreen = false, label = 'Carregando...' }: LoadingProps) {
  return (
    <div
      className={fullScreen ? 'loading-wrap loading-fullscreen' : 'loading-wrap'}
      role="status"
      aria-live="polite"
    >
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>

      <style jsx>{`
        .loading-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--ink-500);
        }

        .loading-fullscreen {
          display: flex;
          position: fixed;
          inset: 0;
          min-height: 100vh;
          background: var(--surface, #fff);
          z-index: 50;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--teal-100);
          border-top-color: var(--teal-500);
          border-radius: 50%;
          animation: fisio-spin 0.8s linear infinite;
        }

        @keyframes fisio-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-spinner {
            animation-duration: 2s;
          }
        }
      `}</style>
    </div>
  );
}
