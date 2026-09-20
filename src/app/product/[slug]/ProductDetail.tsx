"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Truck, RotateCcw, Minus, Plus, Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useToastStore } from "@/lib/toast-store";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const showToast = useToastStore((s) => s.show);
  const router = useRouter();

  const inStock = product.stock > 0;

  function handleAddToCart() {
    addItem(product.id, quantity);
    showToast(`${quantity} x ${product.name} added to cart`);
  }

  function handleBuyNow() {
    addItem(product.id, quantity);
    router.push("/checkout");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-900">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
                  activeImage === i ? "border-gold-400" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm uppercase tracking-wide text-gold-400">{product.category}</p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">{product.name}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
          <div className="flex text-gold-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold-400" : ""}`} />
            ))}
          </div>
          <span>{product.rating} ({product.reviewCount} reviews)</span>
          <span className="text-white/30">·</span>
          <span>SKU: {product.sku}</span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-3xl font-semibold text-white">
            {siteConfig.currency} {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-white/40 line-through">
              {siteConfig.currency} {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className={`mt-3 text-sm font-medium ${inStock ? "text-green-400" : "text-red-400"}`}>
          {inStock ? `In stock — ${product.stock} available` : "Out of stock"}
        </p>

        <p className="mt-6 text-white/70">{product.description}</p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-ink-700">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
              className="flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 text-white/70 hover:text-white"
          >
            <Heart className={`h-5 w-5 ${wishlisted ? "fill-gold-400 text-gold-400" : ""}`} />
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 rounded-full border border-gold-500 py-3 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-500/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className="flex-1 rounded-full bg-gold-gradient py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-8 space-y-3 rounded-xl border border-ink-800 bg-ink-900 p-4 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-gold-400" />
            {siteConfig.shipping.estimatedDays}
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-gold-400" />
            {siteConfig.returns.windowDays}-day returns on unused items
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold text-white">Specifications</h2>
          <dl className="mt-3 divide-y divide-ink-800 border-y border-ink-800 text-sm">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2">
                <dt className="text-white/50">{key}</dt>
                <dd className="text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
