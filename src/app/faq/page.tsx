import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { policies } from "@/data/policies";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${siteConfig.name}.`,
};

const faqs = [
  { id: "shipping", q: "What are your shipping options?", a: policies.shipping },
  { id: "returns", q: "What is your return policy?", a: policies.returns },
  { id: "warranty", q: "Do watches come with a warranty?", a: policies.warranty },
  { id: "payment", q: "How do I pay?", a: policies.payment },
  {
    id: "sizing",
    q: "How do I know what watch size fits me?",
    a: "Case diameter is listed on every product page under Specifications. Most watches range 38-44mm; smaller cases suit slimmer wrists, larger cases suit a bolder look.",
  },
  {
    id: "authenticity",
    q: "Are these authentic branded watches?",
    a: "Our watches are made by BudgetBazaar Atelier and BudgetBazaar Tech — they are not licensed replicas of luxury brands. Product pages describe exactly what you're buying.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-white">Frequently Asked Questions</h1>
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <div key={f.id} id={f.id} className="scroll-mt-24 rounded-xl border border-ink-800 bg-ink-900 p-5">
            <p className="font-semibold text-white">{f.q}</p>
            <p className="mt-2 text-sm text-white/60">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
