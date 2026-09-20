import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="mx-auto h-16 w-16 text-gold-400" />
      <h1 className="mt-6 font-display text-3xl text-white">Thank you for your order</h1>
      <p className="mt-3 text-white/60">
        This is a demo confirmation — no payment was charged since a payment provider isn&apos;t
        connected yet. A real store would email a receipt and order tracking details here.
      </p>
      <Link href="/shop" className="mt-8 inline-block rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-ink-950">
        Continue Shopping
      </Link>
    </div>
  );
}
