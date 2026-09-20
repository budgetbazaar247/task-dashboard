"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById } from "@/data/products";

export interface CartLine {
  productId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === productId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId
                  ? { ...l, quantity: l.quantity + quantity }
                  : l
              ),
            };
          }
          return { lines: [...state.lines, { productId, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) =>
                  l.productId === productId ? { ...l, quantity } : l
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "budgetbazaar-cart" }
  )
);

export function getCartDetails(lines: CartLine[]) {
  return lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof getProductById>>; quantity: number } => x !== null);
}

export function getCartTotal(lines: CartLine[]) {
  return getCartDetails(lines).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
}

export function getCartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
