import LandingShell from "./LandingShell";
import {
  INITIAL_CONSULT_PRICE_LABEL,
  FOLLOW_UP_PRICE_LABEL,
} from "@/lib/site-config";

export const metadata = {
  title: "Specialty GLP-1 Management Consult | MetaOrtho",
  description: `Physician-led specialty GLP-1 management for people starting, taking, or questioning GLP-1 treatment. Start with a free GLP-1 Management Profile. Cash-pay consult: ${INITIAL_CONSULT_PRICE_LABEL} initial, ${FOLLOW_UP_PRICE_LABEL} follow-up. Telehealth.`,
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingShell>{children}</LandingShell>;
}
