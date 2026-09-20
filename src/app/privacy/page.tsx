import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-white/70 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Privacy Policy</h1>
      <p className="mt-6">
        This is a demo storefront. In a production deployment, this page would describe what
        customer data {siteConfig.name} collects (contact and shipping details entered at
        checkout, browsing behavior, cookies), how it is used and stored, who it may be shared
        with (e.g. shipping carriers, payment processors), and how customers can request access
        to or deletion of their data.
      </p>
      <p className="mt-4">
        Contact {siteConfig.supportEmail} with any privacy questions.
      </p>
    </div>
  );
}
