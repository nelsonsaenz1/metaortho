import LandingShell from "./LandingShell";

export const metadata = {
  title: "Specialty GLP-1 Management Consult | MetaOrtho",
  description:
    "Physician-led specialty GLP-1 management for people starting, taking, or questioning GLP-1 treatment. Start with a free GLP-1 Management Profile. Cash-pay consult: $400 initial, $200 follow-up. Telehealth.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingShell>{children}</LandingShell>;
}
