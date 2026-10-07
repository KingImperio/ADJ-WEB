import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation-form";
import { StitchHero, StitchSections } from "@/components/stitch-page";

/* Contact — rebuilt from the Stitch screen "contact-free-consultation"
   (docs/stitch-reference/contact-free-consultation.html). */

export const metadata: Metadata = {
  title: "Contact & Free Consultation",
  description:
    "Book a free consultation with ADJ Educational Consultants in Lagos, Nigeria. Physical and online sessions are available; see the address and directions below.",
};

export const revalidate = 300;

export default async function ContactPage() {
  return (
    <>
      <StitchHero
        slug="contact"
        eyebrow="Free First Session"
        primary={{ label: "Start Your Application", href: "#apply" }}
        secondary={{ label: "Get Directions", href: "#sections" }}
      />
      <StitchSections slug="contact" />
      <ConsultationForm id="apply" />
    </>
  );
}
