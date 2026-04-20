import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing & Services",
  description:
    "MetaOrtho pricing: Initial MSK Assessment starting at $149, monthly monitoring subscriptions from $79/month, supplement bundles, and more. Transparent, flat-rate telehealth.",
};

export default function PricingPage() {
  return <PricingContent />;
}
