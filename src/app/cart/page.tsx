"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, getCartDetails, getCartTotal } from "@/lib/cart-store";
import { siteConfig } from "@/config/site";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const details = getCartDetails(lines);
  const subtotal = getCartTotal(lines);
  const shipping = subtotal === 0 || subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardFee;
  const total = subtotal + shipping;

  if (details.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-white">Your cart is empty</h1>
        <p className="mt-3 text-white/60">Browse the collection and find your next watch.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-ink-950"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Your Cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="divide-y divide-ink-800 border-y border-ink-800">
          {details.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 py-6">
              <Link href={`/product/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-900">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/product/${product.slug}`} className="font-semibold text-white hover:text-gold-300">
                      {product.name}
                    </Link>
                    <p className="text-sm text-white/50">{siteConfig.currency} {product.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeItem(product.id)} aria-label="Remove item" className="text-white/40 hover:text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-ink-700">
                    <button
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(product.id, Math.min(product.stock, quantity + 1))}
                      className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {siteConfig.currency} {(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-ink-800 bg-ink-900 p-6">
          <h2 className="font-semibold text-white">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{siteConfig.currency} {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `${siteConfig.currency} ${shipping}`}</span>
            </div>
            <div className="flex justify-between border-t border-ink-800 pt-2 text-base font-semibold text-white">
              <span>Total</span>
              <span>{siteConfig.currency} {total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-gold-gradient py-3 text-center text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
