import Link from "next/link";
import { Building2, Wifi, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProgramCard } from "@/components/sections/program-card";
import { ConsultationForm } from "@/components/sections/consultation-form";
import { LocationBlock } from "@/components/sections/location-block";
import { getProgram, type ProgramSlug } from "@/lib/programs";
import { site } from "@/lib/site";

const strip: ProgramSlug[] = ["jamb", "waec", "neco", "jupeb", "international", "admissions"];

export function ServicesStrip() {
  const cards = strip.map((slug) => getProgram(slug)).filter((p) => p !== undefined);
  return (
    <section id="services" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Every external exam, handled in one place."
          lede="Six programmes, one roof — pick yours or browse them all."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
        <Link href="/programs" className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft">
          View all eight programmes <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function TutorialsSection() {
  return (
    <section id="tutorials" className="scroll-mt-20 border-t border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Group tutorials"
          title="Learn in Laara — or join live from anywhere."
          lede="Same tutors, same rigour, same drills. Every session is a group session."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <Building2 className="h-6 w-6 text-gold" />
            <h3 className="pt-2 font-display text-xl font-bold text-zinc-900">Physical group classes</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Evening and weekend cohorts at our Laara centre — serving {site.partner.serves.join(", ")} and
              surrounding communities.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <Wifi className="h-6 w-6 text-gold" />
            <h3 className="pt-2 font-display text-xl font-bold text-zinc-900">Live online group tutorials</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Scheduled live sessions with notes after every lesson and the same timed drills as physical cohorts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutCompact() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Who we are"
          title="An Ikorodu consultancy that stays past results day."
          lede="Coaching, registration, drills — then admission processing until matriculation. In partnership with Greater Heights Tutorial Center."
        />
        <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft">
          Our story, partner and values <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:py-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionHeading
            eyebrow="Free consultation"
            title="Tell us where you are. We'll map the way forward."
            lede="Fill this in and it opens WhatsApp with your message ready — or walk into the office."
          />
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7">
            <ConsultationForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Visit" title="Find us in Laara." />
          <div className="mt-6 flex flex-col gap-4">
            <LocationBlock />
            <Link href="/contact" className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft">
              More ways to reach us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
