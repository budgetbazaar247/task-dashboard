"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts, type ProductCategory } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

const categories: ProductCategory[] = ["Chronograph", "Dress", "Dive", "Smart", "Minimalist"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const products = useMemo(() => {
    let list = getAllProducts();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => [p.name, p.brand, p.description].join(" ").toLowerCase().includes(q));
    }
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [query, category, maxPrice, sort, inStockOnly]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Shop All Watches</h1>
      <p className="mt-2 text-white/60">{products.length} products</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-white">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches…"
              className="mt-2 w-full rounded-lg border border-ink-700 bg-ink-900 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-white">Category</label>
            <div className="mt-2 space-y-2">
              <button
                onClick={() => setCategory("")}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                  category === "" ? "bg-gold-gradient text-ink-950" : "text-white/70 hover:bg-ink-800"
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                    category === c ? "bg-gold-gradient text-ink-950" : "text-white/70 hover:bg-ink-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-white">Max Price: SAR {maxPrice}</label>
            <input
              type="range"
              min={200}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-gold-500"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-gold-500"
            />
            In stock only
          </label>
        </aside>

        <div>
          <div className="mb-6 flex justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-ink-700 bg-ink-900 px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-24 text-center text-white/50">Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
