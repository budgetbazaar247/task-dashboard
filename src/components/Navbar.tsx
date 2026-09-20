"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Heart, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCartStore, getCartCount } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const cartCount = getCartCount(lines);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink-950 py-2 text-center text-xs text-gold-300">
        Free shipping across Saudi Arabia on orders over {siteConfig.currency}{" "}
        {siteConfig.shipping.freeShippingThreshold}
      </div>
      <nav className="border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-white">
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold-300"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/shop" aria-label="Search" className="text-white/80 hover:text-gold-300">
              <Search className="h-5 w-5" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative text-white/80 hover:text-gold-300">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ink-950">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-white/80 hover:text-gold-300">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ink-950">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="text-white/80 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-ink-950 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-white/90"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
