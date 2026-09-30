import type { Metadata } from "next";
import { StitchCta, StitchHero, StitchSections } from "@/components/stitch-page";

/* Contact — rebuilt from the Stitch screen "contact-free-consultation"
   (docs/stitch-reference/contact-free-consultation.html). */

export const metadata: Metadata = {
  title: "Contact & Free Consultation",
  description:
    "Book a free consultation at ADJ Educational Consultants, Off Igbe Road, Banana Estate / Laara, Igbe-Laara, Ikorodu. Physical and online slots available.",
};

export default function ContactPage() {
  return (
    <>
      <StitchHero
        slug="contact"
        eyebrow="Free First Session"
        primary={{ label: "Book Free Consultation", href: "#consultation" }}
        secondary={{ label: "Get Directions", href: "#sections" }}
      />
      <StitchSections slug="contact" />
      <StitchCta
        title="100% Free First Session"
        copy="Assessment, programme recommendation and fee confirmation all happen in the free consultation. You commit to nothing until you have seen the plan."
        label="Confirm Diagnostic Booking"
      />
    </>
  );
}
