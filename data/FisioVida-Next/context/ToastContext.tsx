'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  isExiting?: boolean;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (type: ToastType, message: string, duration?: number) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const closingIds = useRef(new Set<string>());

  const dismissToast = useCallback((id: string) => {
    if (closingIds.current.has(id)) return;
    closingIds.current.add(id);

    const autoTimer = timers.current.get(`auto:${id}`);
    if (autoTimer) clearTimeout(autoTimer);
    timers.current.delete(`auto:${id}`);

    setToasts((current) => current.map((toast) =>
      toast.id === id ? { ...toast, isExiting: true } : toast,
    ));

    const exitTimer = setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
      closingIds.current.delete(id);
      timers.current.delete(`exit:${id}`);
    }, 200);

    timers.current.set(`exit:${id}`, exitTimer);
  }, []);

  const showToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setToasts((current) => [...current, { id, type, message, duration }]);

    if (duration > 0) {
      const timer = setTimeout(() => dismissToast(id), duration);
      timers.current.set(`auto:${id}`, timer);
    }
  }, [dismissToast]);

  useEffect(() => () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
  }, []);

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  return context;
}
