import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StitchSections } from "@/components/stitch-page";
import { ProgrammeExplorer } from "@/components/programme-explorer";
import { getTracks } from "@/lib/content";

/* Programmes index — rebuilt from the Stitch screen "programmes-overview"
   (docs/stitch-reference/programmes-overview.html). */

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Compare ADJ's JAMB, WAEC, NECO, JUPEB, international and admissions tracks, plus physical and online cohort schedules.",
};

export const revalidate = 300;

export default async function ProgramsPage() {
  const tracks = await getTracks();
  return (
    <>
      <section className="weave-catalogue-hero"><div className="weave-container"><span className="weave-eyebrow">The programme directory</span><h1>Choose your<br /><em>next chapter.</em></h1><p>Exams. Admissions. A stronger academic foundation.</p><Link className="weave-action" href="/contact">Find the right fit <ArrowUpRight size={20} /></Link></div></section>
      <section className="weave-catalogue"><div className="weave-container"><ProgrammeExplorer tracks={tracks} catalogue /></div></section>
      <div id="sections"><StitchSections slug="programmes" /></div>
    </>
  );
}
