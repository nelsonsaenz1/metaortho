import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service — MetaOrtho",
  description:
    "Terms and conditions for using MetaOrtho's telehealth musculoskeletal care services.",
};

export default function TermsPage() {
  return <TermsContent />;
}
