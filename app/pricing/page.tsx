import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "MetaOrtho pricing: cash-pay specialty GLP-1 consult — $400 initial, $200 follow-up. Start with a free GLP-1 Management Profile. Transparent, flat-rate telehealth.",
};

export default function PricingPage() {
  return <PricingContent />;
}
