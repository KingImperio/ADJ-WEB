import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation-form";
import { StitchHero, StitchSections } from "@/components/stitch-page";

/* Contact — rebuilt from the Stitch screen "contact-free-consultation"
   (docs/stitch-reference/contact-free-consultation.html). */

export const metadata: Metadata = {
  title: "Contact & Free Consultation",
  description:
    "Book a free consultation at ADJ Educational Consultants, Off Igbe Road, Banana Estate / Laara, Igbe-Laara, Ikorodu. Physical and online slots available.",
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
