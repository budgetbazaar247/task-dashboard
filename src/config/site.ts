export const siteConfig = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "BudgetBazaar247",
  description:
    "Premium watches and accessories, shipped across Saudi Arabia and the GCC.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  currency: "SAR",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000",
  supportEmail: "support@budgetbazaar247.com",
  aiAssistantName: "BudgetBazaar AI",
  shipping: {
    freeShippingThreshold: 500,
    standardFee: 25,
    regions: ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Bahrain", "Oman"],
    estimatedDays: "2-5 business days within KSA, 4-8 business days for GCC",
  },
  returns: {
    windowDays: 14,
    policy:
      "Items can be returned within 14 days of delivery if unused, in original packaging, with all tags and accessories intact.",
  },
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
