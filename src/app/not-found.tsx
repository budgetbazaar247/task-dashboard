import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">404</h1>
      <p className="mt-3 text-white/60">We couldn&apos;t find that page.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-ink-950">
        Back to Home
      </Link>
    </div>
  );
}
