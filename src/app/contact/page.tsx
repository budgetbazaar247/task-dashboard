"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { useToastStore } from "@/lib/toast-store";

export default function ContactPage() {
  const showToast = useToastStore((s) => s.show);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    showToast("Message sent — we'll get back to you soon.");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Contact Us</h1>
      <p className="mt-2 text-white/60">We usually respond within one business day.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink-800 bg-ink-900 p-6">
          <input required placeholder="Your name" className="input" />
          <input required type="email" placeholder="Your email" className="input" />
          <textarea required placeholder="How can we help?" rows={5} className="input resize-none" />
          <button
            type="submit"
            className="w-full rounded-full bg-gold-gradient py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
          >
            {sent ? "Sent!" : "Send Message"}
          </button>
        </form>

        <div className="space-y-4">
          <a
            href={whatsappLink("Hi! I have a question about BudgetBazaar247.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-ink-800 bg-ink-900 p-5 hover:border-gold-500/50"
          >
            <MessageCircle className="h-6 w-6 text-[#25D366]" />
            <div>
              <p className="font-semibold text-white">WhatsApp</p>
              <p className="text-sm text-white/60">Fastest way to reach us</p>
            </div>
          </a>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="flex items-center gap-3 rounded-2xl border border-ink-800 bg-ink-900 p-5 hover:border-gold-500/50"
          >
            <Mail className="h-6 w-6 text-gold-400" />
            <div>
              <p className="font-semibold text-white">Email</p>
              <p className="text-sm text-white/60">{siteConfig.supportEmail}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
