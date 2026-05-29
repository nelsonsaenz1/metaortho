import type { Metadata } from "next";
import BookContent from "./BookContent";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Specialty GLP-1 Consult",
  description: `Book your cash-pay specialty GLP-1 consult — ${INITIAL_CONSULT_PRICE_LABEL} initial, ${FOLLOW_UP_PRICE_LABEL} follow-up. Start with a free GLP-1 Management Profile so your visit focuses on your questions. Physician-led telehealth.`,
};

export default function BookPage() {
  return <BookContent />;
}
