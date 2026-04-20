import Hero from "@/components/home/Hero";
import TheProblem from "@/components/home/TheProblem";
import IsThisYou from "@/components/home/IsThisYou";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import DoctorPreview from "@/components/home/DoctorPreview";
import Supplements from "@/components/home/Supplements";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "MetaOrtho — Musculoskeletal Care for GLP-1 Patients",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <IsThisYou />
      <HowItWorks />
      <Services />
      <DoctorPreview />
      <Supplements />
      <FinalCTA />
    </>
  );
}
