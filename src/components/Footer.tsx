import Link from "next/link";
import { siteConfig } from "@/config/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Watches" },
      { href: "/shop?category=Chronograph", label: "Chronographs" },
      { href: "/shop?category=Dive", label: "Dive Watches" },
      { href: "/shop?category=Smart", label: "Smartwatches" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/faq#shipping", label: "Shipping" },
      { href: "/faq#returns", label: "Returns" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-display text-2xl font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm text-white/60">{siteConfig.description}</p>
            <div className="mt-4 flex gap-4 text-sm text-white/50">
              <a href="#" aria-label="Instagram" className="hover:text-gold-300">Instagram</a>
              <a href="#" aria-label="X" className="hover:text-gold-300">X</a>
              <a href="#" aria-label="TikTok" className="hover:text-gold-300">TikTok</a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-gold-300">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Demo storefront — not a real store.
        </div>
      </div>
    </footer>
  );
}
