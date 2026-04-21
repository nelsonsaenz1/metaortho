import Hero from "@/components/home/Hero";
import TheProblem from "@/components/home/TheProblem";
import IsThisYou from "@/components/home/IsThisYou";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import DoctorPreview from "@/components/home/DoctorPreview";
import Supplements from "@/components/home/Supplements";
import FinalCTA from "@/components/home/FinalCTA";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "MetaOrtho — Musculoskeletal Care for GLP-1 Patients",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <WaitlistForm
        variant="hero"
        source_page="/home"
        eyebrow="Get early access"
        headline={
          <>
            Be first when we open in your state.
          </>
        }
        subcopy={
          <>
            Join the MetaOrtho waitlist for a short monthly update on the
            science of GLP-1 musculoskeletal health — and an early notice the
            day we start accepting new patients where you live.
          </>
        }
        buttonText="Join the waitlist"
      />
      <IsThisYou />
      <HowItWorks />
      <Services />
      <DoctorPreview />
      <Supplements />
      <FinalCTA />
    </>
  );
}
