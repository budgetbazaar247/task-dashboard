"use client";

import { useToastStore } from "@/lib/toast-store";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export function Toaster() {
  const { toasts, dismiss } = useToastStore();

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((t) => {
        const Icon = icons[t.tone || "success"];
        return (
          <div
            key={t.id}
            className="animate-scale-in flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900/95 px-4 py-3 text-sm text-white shadow-premium backdrop-blur"
          >
            <Icon className="h-5 w-5 shrink-0 text-gold-400" />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss">
              <X className="h-4 w-4 text-white/50 hover:text-white" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
