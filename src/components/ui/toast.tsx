"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  onClose?: () => void;
}

const variantClasses = {
  default: "bg-gray-900 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-yellow-500 text-white",
};

export function Toast({
  title,
  description,
  variant = "default",
  onClose,
}: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex w-full max-w-sm items-start gap-3 rounded-lg p-4 shadow-lg",
        variantClasses[variant]
      )}
    >
      <div className="flex-1">
        {title && (
          <p className="font-semibold">{title}</p>
        )}
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Toast context for global toast management
interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  removeToast: (index: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback((toast: ToastProps) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = React.useCallback((index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            {...toast}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
