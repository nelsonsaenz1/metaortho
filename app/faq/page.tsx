import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about MetaOrtho's telehealth musculoskeletal care for GLP-1 patients, including sarcopenia, bone density, gout, pricing, and how virtual visits work.",
};

export default function FAQPage() {
  return <FAQContent />;
}
