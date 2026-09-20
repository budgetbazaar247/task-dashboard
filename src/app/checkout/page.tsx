"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useCartStore, getCartDetails, getCartTotal } from "@/lib/cart-store";
import { siteConfig } from "@/config/site";

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const details = getCartDetails(lines);
  const subtotal = getCartTotal(lines);
  const shipping = subtotal === 0 || subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardFee;
  const total = subtotal + shipping;

  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // No payment provider is connected yet — this places a demo order only.
    setTimeout(() => {
      clear();
      router.push("/checkout/success");
    }, 600);
  }

  if (details.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-white">Nothing to check out</h1>
        <p className="mt-3 text-white/60">Add a watch to your cart first.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <fieldset className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
            <legend className="px-1 font-semibold text-white">Customer Information</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className="input" />
              <input required type="email" placeholder="Email" className="input" />
              <input required type="tel" placeholder="Phone (+966...)" className="input sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
            <legend className="px-1 font-semibold text-white">Shipping Address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Address line" className="input sm:col-span-2" />
              <input required placeholder="City" className="input" />
              <select required defaultValue="" className="input">
                <option value="" disabled>Region / Province</option>
                <option>Riyadh</option>
                <option>Makkah</option>
                <option>Eastern Province</option>
                <option>Madinah</option>
                <option>Other</option>
              </select>
              <input required placeholder="Postal code" className="input" />
              <select required defaultValue="Saudi Arabia" className="input">
                {siteConfig.shipping.regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-dashed border-ink-700 bg-ink-900/50 p-6">
            <legend className="px-1 font-semibold text-white">Payment</legend>
            <p className="mt-2 text-sm text-white/60">
              Payment processing is not yet connected on this demo storefront. Submitting will
              place a demo order without charging a card. Connect a real provider (Mada, STC Pay,
              or a card gateway) before going live.
            </p>
          </fieldset>
        </div>

        <div className="h-fit space-y-4 rounded-2xl border border-ink-800 bg-ink-900 p-6">
          <h2 className="font-semibold text-white">Order Summary</h2>
          <div className="space-y-2 text-sm text-white/70">
            {details.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span>{product.name} × {quantity}</span>
                <span>{siteConfig.currency} {(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-ink-800 pt-3 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{siteConfig.currency} {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `${siteConfig.currency} ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-white">
              <span>Total</span>
              <span>{siteConfig.currency} {total.toLocaleString()}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gold-gradient py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Placing order…" : "Place Order"}
          </button>
          <p className="flex items-center justify-center gap-2 text-xs text-white/40">
            <ShieldCheck className="h-4 w-4" /> Your information is transmitted securely
          </p>
        </div>
      </form>
    </div>
  );
}
