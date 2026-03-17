"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  X,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                     */
/* ------------------------------------------------------------------ */

interface ToastVariantConfig {
  icon: LucideIcon;
  bar: string;
  iconColor: string;
  bg: string;
  border: string;
}

const variantConfig: Record<string, ToastVariantConfig> = {
  success: {
    icon: CheckCircle2,
    bar: "bg-green-500",
    iconColor: "text-green-600",
    bg: "bg-white",
    border: "border-green-200",
  },
  error: {
    icon: XCircle,
    bar: "bg-emergency-500",
    iconColor: "text-emergency-500",
    bg: "bg-white",
    border: "border-emergency-500/20",
  },
  warning: {
    icon: AlertTriangle,
    bar: "bg-amber-500",
    iconColor: "text-amber-600",
    bg: "bg-white",
    border: "border-amber-200",
  },
  info: {
    icon: Info,
    bar: "bg-navy-500",
    iconColor: "text-navy-500",
    bg: "bg-white",
    border: "border-navy-200",
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type ToastVariant = keyof typeof variantConfig;

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  /** Auto-dismiss duration in ms (default 5000, set 0 to disable) */
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

/** Hook to imperatively create toasts. Must be inside <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast() must be used within a <ToastProvider>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                          */
/* ------------------------------------------------------------------ */

let toastCounter = 0;

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Maximum number of visible toasts (default 5) */
  limit?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  limit = 5,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => [...prev.slice(-(limit - 1)), { ...toast, id }]);
      return id;
    },
    [limit],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/*  Container (portal)                                                */
/* ------------------------------------------------------------------ */

const ToastContainer: React.FC = () => {
  const ctx = useContext(ToastContext);
  if (!ctx || typeof window === "undefined") return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-3 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence mode="popLayout">
        {ctx.toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => ctx.removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

/* ------------------------------------------------------------------ */
/*  Individual toast                                                  */
/* ------------------------------------------------------------------ */

interface ToastItemProps {
  toast: ToastData;
  onDismiss: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { variant, title, description, duration = 5000 } = toast;
  const config = variantConfig[variant] ?? variantConfig.info;
  const Icon = config.icon;

  /* ---- Auto-dismiss timer ---- */
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [progress, setProgress] = useState(100);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (duration <= 0) return;

    startRef.current = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct > 0) rafId = requestAnimationFrame(frame);
    };

    let rafId = requestAnimationFrame(frame);

    timerRef.current = setTimeout(onDismiss, duration);
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafId);
    };
  }, [duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={[
        "pointer-events-auto relative w-80 overflow-hidden rounded-lg border shadow-lg",
        config.bg,
        config.border,
        "font-body",
      ].join(" ")}
      role="alert"
    >
      {/* Content */}
      <div className="flex items-start gap-3 px-4 py-3">
        <Icon className={`mt-0.5 shrink-0 ${config.iconColor}`} size={18} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-navy-900">{title}</p>
          {description && (
            <p className="mt-0.5 text-xs text-navy-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-0.5 text-navy-400 transition-colors hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div className="h-0.5 w-full bg-warm-200">
          <div
            className={`h-full transition-none ${config.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default ToastProvider;
