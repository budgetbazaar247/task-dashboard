"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlist-store";
import { getProductById } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-white">Your wishlist is empty</h1>
        <p className="mt-3 text-white/60">Tap the heart icon on any watch to save it here.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-gold-gradient px-8 py-3 text-sm font-semibold text-ink-950">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <ProductGrid products={products} title="Your Wishlist" />
    </div>
  );
}
