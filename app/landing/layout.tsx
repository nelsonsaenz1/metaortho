import LandingShell from "./LandingShell";

export const metadata = {
  title: "Protect Your Muscles & Bones on GLP-1s | MetaOrtho",
  description:
    "Up to 40% of weight lost on Ozempic, Mounjaro & Wegovy is muscle and bone — not fat. Get a physician-led musculoskeletal assessment. $149. Telehealth.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingShell>{children}</LandingShell>;
}
