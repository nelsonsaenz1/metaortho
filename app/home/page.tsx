import Hero from "@/components/home/Hero";
import PortalPreview from "@/components/home/PortalPreview";
import TheProblem from "@/components/home/TheProblem";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import ConsultOffer from "@/components/home/ConsultOffer";
import IsThisYou from "@/components/home/IsThisYou";
import DoctorPreview from "@/components/home/DoctorPreview";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Specialty GLP-1 Management",
  description:
    "MetaOrtho is a physician-led specialty GLP-1 management practice. Start with a personalized GLP-1 Management Profile, then meet our team for a cash-pay specialty consult.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PortalPreview />
      <TheProblem />
      <HowItWorks />
      <Services />
      <ConsultOffer />
      <IsThisYou />
      <DoctorPreview />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
