import type { Metadata } from "next";
import BookContent from "./BookContent";

export const metadata: Metadata = {
  title: "Book a Specialty GLP-1 Consult",
  description:
    "Book your cash-pay specialty GLP-1 consult — $400 initial, $200 follow-up. Start with a free GLP-1 Management Profile so your visit focuses on your questions. Physician-led telehealth.",
};

export default function BookPage() {
  return <BookContent />;
}
