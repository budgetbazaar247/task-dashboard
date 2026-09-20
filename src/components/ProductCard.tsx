"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useToastStore } from "@/lib/toast-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const showToast = useToastStore((s) => s.show);

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) return;
    addItem(product.id, 1);
    showToast(`${product.name} added to cart`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-800/60 bg-ink-900 shadow-premium transition-all hover:-translate-y-1 hover:shadow-gold">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-ink-800">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.compareAtPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-ink-950">
            SALE
          </span>
        )}
        {product.stock <= 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-colors hover:bg-black/60"
        >
          <Heart
            className={`h-4 w-4 ${wishlisted ? "fill-gold-400 text-gold-400" : "text-white"}`}
          />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-gold-400/80">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg text-white transition-colors group-hover:text-gold-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-xs text-white/60">
          <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-white">
            {siteConfig.currency} {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-white/40 line-through">
              {siteConfig.currency} {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={onAddToCart}
          disabled={product.stock <= 0}
          className="mt-2 w-full rounded-lg bg-gold-gradient py-2.5 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {product.stock <= 0 ? "Out of stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
