import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story behind ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-wide text-gold-400">Our Story</p>
      <h1 className="mt-2 font-display text-4xl text-white">Built for people who value their time</h1>
      <div className="mt-8 space-y-6 text-white/70">
        <p>
          {siteConfig.name} started with a simple idea: give customers across Saudi Arabia and
          the GCC access to well-made watches, priced fairly, backed by real support — without
          the markup of a traditional boutique.
        </p>
        <p>
          Every piece in our collection is chosen for its build quality, materials, and everyday
          wearability, spanning chronographs, dive watches, dress watches, and modern smartwatches.
        </p>
        <p>
          We ship across the region, stand behind every order with a {siteConfig.returns.windowDays}-day
          return window and a 12-month warranty, and our team is reachable by WhatsApp and email
          for anything you need before or after your purchase.
        </p>
      </div>
    </div>
  );
}
