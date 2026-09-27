import { Hero } from "@/components/home/hero";
import { Services, Tutorials, About } from "@/components/home/services";
import { Stats, Results, CbtBand } from "@/components/home/proof";
import { Faq } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Tutorials />
      <Results />
      <CbtBand />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
