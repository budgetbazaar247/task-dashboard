import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-white/70 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Terms of Service</h1>
      <p className="mt-6">
        This is a demo storefront. In a production deployment, this page would set out the terms
        governing use of the {siteConfig.name} website, order acceptance, pricing and currency
        (SAR), shipping and delivery commitments, returns and warranty terms, and limitation of
        liability, and would be reviewed by qualified legal counsel before launch.
      </p>
    </div>
  );
}
