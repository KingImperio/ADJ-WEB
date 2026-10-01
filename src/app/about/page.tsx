import type { Metadata } from "next";
import { StitchHero, StitchSections } from "@/components/stitch-page";

/* About — rebuilt from the Stitch screen "about-us-partnership"
   (docs/stitch-reference/about-us-partnership.html). */

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ADJ Educational Consultants is an Ikorodu exam-prep consultancy built on academic rigor, in delivery partnership with Greater Heights Tutorial Center.",
};

export const revalidate = 300;

export default async function AboutPage() {
  return (
    <>
      <StitchHero
        slug="about"
        eyebrow="Our Pedagogical Code"
        primary={{ label: "Meet an Academic Advisor", href: "/contact" }}
        secondary={{ label: "See Verified Results", href: "/results" }}
      />
      <StitchSections slug="about" />
    </>
  );
}
