import Hero from "@/components/home/Hero";
import IsThisYou from "@/components/home/IsThisYou";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import DoctorPreview from "@/components/home/DoctorPreview";
import PortalPreview from "@/components/home/PortalPreview";
import Supplements from "@/components/home/Supplements";
import CostComparison from "@/components/home/CostComparison";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "MetaOrtho — Musculoskeletal Care for GLP-1 Patients",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PortalPreview />
      <IsThisYou />
      <HowItWorks />
      <Services />
      <CostComparison />
      <Supplements />
      <FinalCTA />
      <DoctorPreview />
    </>
  );
}
