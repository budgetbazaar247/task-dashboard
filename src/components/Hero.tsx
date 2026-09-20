import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,143,52,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(196,143,52,0.12),transparent_40%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <span className="animate-fade-up rounded-full border border-gold-500/40 px-4 py-1 text-xs uppercase tracking-widest text-gold-300">
          Precision. Presence. Provenance.
        </span>
        <h1 className="animate-fade-up mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Timepieces built for the moments that matter.
        </h1>
        <p className="animate-fade-up mt-6 max-w-lg text-lg text-white/70">
          Discover a curated collection of chronographs, dive watches, and dress watches — shipped across Saudi Arabia and the GCC.
        </p>
        <div className="animate-fade-up mt-8 flex gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-ink-950 shadow-gold transition-transform hover:scale-105"
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
