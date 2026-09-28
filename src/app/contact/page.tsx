import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ConsultationForm } from "@/components/sections/consultation-form";
import { LocationBlock } from "@/components/sections/location-block";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { bookingExpectations, contactFaqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free consultation — ADJ Educational Consultants, Ikorodu",
  description: "Book a free consultation with ADJ Educational Consultants in Igbe-Laara, Ikorodu. Call, WhatsApp, or send the form — physical and online group classes.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us where your child is. We'll tell you exactly what comes next."
        sub="First consultation is free — assessment, programme recommendation and fee confirmation before any commitment."
      />

      <section id="contact" className="scroll-mt-20 border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Free consultation" title="Book in under a minute." />
            <div className="mt-6 rounded-2xl border border-white/10 bg-panel p-5 sm:p-7">
              <ConsultationForm />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2">
            <SectionHeading eyebrow="Prefer to just talk?" title="Three taps." />
            <a href={site.phoneHref} className={buttonVariants({ size: "lg", className: "bg-cobalt font-semibold text-white hover:bg-cobalt-deep" })}>
              <Phone className="mr-2 h-4 w-4" /> {site.phoneDisplay}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", className: "bg-gold font-semibold text-ink hover:bg-gold-soft" })}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp us
            </a>
            <a
              href={`mailto:${site.email}`}
              className={buttonVariants({ size: "lg", variant: "outline", className: "border-white/20 bg-transparent text-white hover:bg-white/10" })}
            >
              <Mail className="mr-2 h-4 w-4" /> {site.email}
            </a>
            <LocationBlock />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0e1c]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="What happens next" title="Three steps, no surprises." />
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {bookingExpectations.map((step, i) => (
              <li key={step} className="rounded-2xl border border-white/10 bg-panel p-6">
                <p className="font-display text-3xl font-bold text-gold">{i + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-gold/40 bg-gold/10 text-gold">
              Fees confirmed during consultation
            </Badge>
            <p className="text-sm text-slate-500">
              We don&apos;t publish fees, and we don&apos;t ask for commitment before you&apos;ve seen the plan.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Before you visit" title="Contact questions, answered." />
          <div className="mt-8">
            <FaqBlock faqs={contactFaqs} />
          </div>
        </div>
      </section>

      <ProgramCta headline="Ready when you are." detail="Message, call, or walk in — the first conversation is free." />
    </>
  );
}
