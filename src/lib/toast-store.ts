"use client";

import { create } from "zustand";

export interface ToastItem {
  id: number;
  message: string;
  tone?: "success" | "error" | "info";
}

interface ToastState {
  toasts: ToastItem[];
  show: (message: string, tone?: ToastItem["tone"]) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (message, tone = "success") =>
    set((state) => {
      const id = nextId++;
      setTimeout(() => {
        useToastStore.getState().dismiss(id);
      }, 3200);
      return { toasts: [...state.toasts, { id, message, tone }] };
    }),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
