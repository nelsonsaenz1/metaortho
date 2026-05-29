import type { Metadata } from "next";
import PricingContent from "./PricingContent";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `MetaOrtho pricing: cash-pay specialty GLP-1 consult — ${INITIAL_CONSULT_PRICE_LABEL} initial, ${FOLLOW_UP_PRICE_LABEL} follow-up. Start with a free GLP-1 Management Profile. Transparent, flat-rate telehealth.`,
};

export default function PricingPage() {
  return <PricingContent />;
}
