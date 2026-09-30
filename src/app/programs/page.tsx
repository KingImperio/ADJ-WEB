import type { Metadata } from "next";
import { StitchHero, StitchSections } from "@/components/stitch-page";

/* Programmes index — rebuilt from the Stitch screen "programmes-overview"
   (docs/stitch-reference/programmes-overview.html). */

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Compare ADJ's JAMB, WAEC, NECO, JUPEB, international and admissions tracks, plus physical and online cohort schedules.",
};

export default function ProgramsPage() {
  return (
    <>
      <StitchHero
        slug="programmes"
        eyebrow="Academic Syllabus Tracks"
        primary={{ label: "Book Free Diagnostic Assessment", href: "/contact" }}
        secondary={{ label: "Compare Cohort Schedules", href: "#sections" }}
      />
      <StitchSections slug="programmes" />
    </>
  );
}
