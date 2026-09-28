import { Hero } from "@/components/home/hero";
import { Stats, Results } from "@/components/home/proof";
import { Faq } from "@/components/home/faq";
import { ServicesStrip, TutorialsSection, AboutCompact, ContactSection } from "@/components/home/sections";
import { TrustBand } from "@/components/sections/trust-band";
import { ProgramCta } from "@/components/sections/program-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBand />
      <ServicesStrip />
      <Stats />
      <TutorialsSection />
      <Results />
      <AboutCompact />
      <Faq />
      <ContactSection />
      <ProgramCta headline="Ready when you are." detail="Message, call, or walk in — the first conversation is free." />
    </>
  );
}
