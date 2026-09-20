import Link from "next/link";
import { Truck, ShieldCheck, RotateCcw, Headphones, Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { getFeatured, getBestSellers, getNewArrivals } from "@/data/products";
import { siteConfig } from "@/config/site";

const categories = [
  { name: "Chronograph", blurb: "Bold, multi-function precision" },
  { name: "Dive", blurb: "Rugged and water-resistant" },
  { name: "Dress", blurb: "Refined for formal occasions" },
  { name: "Smart", blurb: "Connected, everyday tech" },
  { name: "Minimalist", blurb: "Clean lines, quiet confidence" },
];

const reviews = [
  { name: "Faisal A.", city: "Riyadh", quote: "The chronograph looks even better in person. Delivery to Riyadh took 3 days." },
  { name: "Noura S.", city: "Jeddah", quote: "Great communication and the watch matched the photos exactly." },
  { name: "Omar K.", city: "Dammam", quote: "Easy returns process gave me confidence to order without trying it first." },
];

const faqs = [
  { q: "Do you ship across Saudi Arabia?", a: `Yes — ${siteConfig.shipping.estimatedDays.split(",")[0]} within KSA, and we also ship to the wider GCC.` },
  { q: "Can I return a watch?", a: `Yes, within ${siteConfig.returns.windowDays} days of delivery if it's unused and in original packaging.` },
  { q: "Is checkout secure?", a: "Your information is transmitted securely. Note: this demo storefront does not yet process live payments." },
];

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProductGrid products={getFeatured()} title="Featured Watches" subtitle="Hand-picked pieces from our current collection" />
      </section>

      <section className="bg-ink-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductGrid products={getBestSellers()} title="Best Sellers" subtitle="What our customers love most" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProductGrid products={getNewArrivals()} title="New Arrivals" subtitle="Just landed" />
      </section>

      <section className="bg-ink-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl text-white">Why Shop With Us</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Truck, title: "GCC Shipping", desc: siteConfig.shipping.estimatedDays },
              { icon: RotateCcw, title: "Easy Returns", desc: `${siteConfig.returns.windowDays}-day return window` },
              { icon: ShieldCheck, title: "12-Month Warranty", desc: "On every timepiece" },
              { icon: Headphones, title: "Real Support", desc: "WhatsApp & email assistance" },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <f.icon className="mx-auto h-8 w-8 text-gold-400" />
                <p className="mt-3 font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-white">Shop by Category</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/shop?category=${c.name}`}
              className="group rounded-2xl border border-ink-800 bg-ink-900 p-6 text-center transition-colors hover:border-gold-500/50"
            >
              <p className="font-display text-lg text-white group-hover:text-gold-300">{c.name}</p>
              <p className="mt-1 text-xs text-white/50">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl text-white">What Customers Say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl border border-ink-800 bg-ink-950 p-6">
                <div className="flex gap-1 text-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/70">&ldquo;{r.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-white">{r.name} · {r.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl text-white">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-ink-800 bg-ink-900 p-5">
              <p className="font-semibold text-white">{f.q}</p>
              <p className="mt-2 text-sm text-white/60">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/faq" className="text-sm font-semibold text-gold-300 hover:underline">
            View all FAQs →
          </Link>
        </div>
      </section>

      <section className="bg-gold-gradient py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-ink-950">Join the {siteConfig.name} List</h2>
          <p className="mt-2 text-ink-800">Get early access to new arrivals and offers.</p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border-0 px-5 py-3 text-sm text-ink-950 focus:outline-none focus:ring-2 focus:ring-ink-950"
            />
            <button
              type="submit"
              className="rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
