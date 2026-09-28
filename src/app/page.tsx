import { Hero } from "@/components/home/hero";
import { Stats, Results } from "@/components/home/proof";
import { Faq } from "@/components/home/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Results />
      <Faq />
    </>
  );
}
