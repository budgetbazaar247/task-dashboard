import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, title, subtitle }: { products: Product[]; title?: string; subtitle?: string }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-700 p-12 text-center text-white/50">
        No products match these filters yet.
      </div>
    );
  }
  return (
    <section>
      {title && (
        <div className="mb-8">
          <h2 className="font-display text-3xl text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-white/60">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
