import Hero from "@/components/home/Hero";
import TheProblem from "@/components/home/TheProblem";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import DoctorPreview from "@/components/home/DoctorPreview";
import Supplements from "@/components/home/Supplements";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TheProblem />
      <HowItWorks />
      <Services />
      <DoctorPreview />
      <Supplements />
      <FinalCTA />
    </>
  );
}
