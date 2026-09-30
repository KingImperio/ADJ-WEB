import type { Metadata } from "next";
import { StitchHero, StitchSections } from "@/components/stitch-page";

/* Results — rebuilt from the Stitch screen "results-matriculation-wall"
   (docs/stitch-reference/results-matriculation-wall.html). */

export const metadata: Metadata = {
  title: "Results",
  description:
    "Documented, verifiable admissions outcomes from Igbe-Laara candidates — admission letters uploaded and confirmed on JAMB CAPS.",
};

export default function ResultsPage() {
  return (
    <>
      <StitchHero
        slug="results"
        eyebrow="Documented Verifiable Scores"
        primary={{ label: "Join the Next Cohort", href: "/contact" }}
        secondary={{ label: "Read Parent Feedback", href: "#sections" }}
      />
      <StitchSections slug="results" />
    </>
  );
}
