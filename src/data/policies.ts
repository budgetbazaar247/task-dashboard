import { siteConfig } from "@/config/site";

export type PolicyType = "shipping" | "returns" | "warranty" | "payment";

export const policies: Record<PolicyType, string> = {
  shipping: `We ship across ${siteConfig.shipping.regions.join(
    ", "
  )}. Estimated delivery: ${siteConfig.shipping.estimatedDays}. Orders over ${
    siteConfig.currency
  } ${siteConfig.shipping.freeShippingThreshold} ship free; otherwise a flat fee of ${
    siteConfig.currency
  } ${siteConfig.shipping.standardFee} applies.`,
  returns: `Items can be returned within ${siteConfig.returns.windowDays} days of delivery if unused, in original packaging, with all tags and accessories intact. Contact support to start a return.`,
  warranty:
    "Every watch includes a 12-month limited warranty covering manufacturing defects in movement and materials. Warranty does not cover accidental damage, water damage beyond the stated resistance rating, or normal wear.",
  payment:
    "Online payment processing is not yet connected on this demo storefront. Orders are currently placed for review; a real payment provider (e.g. Mada, STC Pay, Visa/Mastercard via a gateway) must be integrated before accepting live payments.",
};

export function getStorePolicy(type: string): string {
  const key = type.trim().toLowerCase() as PolicyType;
  return policies[key] || "That policy isn't available. Please contact support for details.";
}
