import Link from "next/link";
import { ArrowRight, Building2, Wifi, MapPin, MonitorSmartphone, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedText } from "@/components/animated-text";
import { StatisticCards } from "@/components/statistic-cards";
import { TestimonialCard } from "@/components/testimonial-card";
import { TrustBand } from "@/components/sections/trust-band";
import { ProgramCard } from "@/components/sections/program-card";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { ConsultationForm } from "@/components/sections/consultation-form";
import { LocationBlock } from "@/components/sections/location-block";
import { SectionHeading, SampleBadge } from "@/components/sections/section-heading";
import { exams, faqs, site, testimonials } from "@/lib/site";
import { getProgram, type ProgramSlug } from "@/lib/programs";

const strip: ProgramSlug[] = ["jamb", "waec", "neco", "jupeb", "international", "admissions"];

export default function Home() {
  const cards = strip.map((slug) => getProgram(slug)).filter((p) => p !== undefined);
  return (
    <>
      {/* 1 — Hero: AkmanOS animated-text + Magic UI marquee + shadcn buttons */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 pb-14 -mt-20 pt-36 sm:-mt-[88px] sm:pt-44">
          <Badge className="border-gold/40 bg-gold/10 text-gold hover:bg-gold-15">
            <Handshake className="mr-1.5 h-3.5 w-3.5" />
            In partnership with {site.partner.name}
          </Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
            Pass JAMB, WAEC &amp; NECO —
          </h1>
          <AnimatedText
            text="then secure your admission."
            className="max-w-3xl"
            textClassName="font-display text-4xl font-bold leading-[1.05] tracking-tight text-gold sm:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {site.name} coaches secondary school students, school leavers and candidates across Ikorodu through every
            external exam that matters — with physical group classes in Laara, live online tutorials, and admission
            processing that follows through until your name is on the list.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ size: "lg", className: "bg-cobalt font-semibold text-white hover:bg-cobalt-deep" })}>
              Book a free consultation <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg", variant: "outline", className: "border-zinc-300 bg-transparent font-semibold text-zinc-900 hover:bg-zinc-100" })}
            >
              Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" /> Igbe-Laara, Ikorodu, Lagos
            </span>
            <span className="flex items-center gap-1.5">
              <MonitorSmartphone className="h-4 w-4 text-gold" /> Physical classes + live online groups
            </span>
          </div>
          <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee pauseOnHover className="[--duration:32s]">
              {exams.map((exam) => (
                <span key={exam} className="mx-1 rounded-full border border-zinc-200 bg-zinc-100 px-3.5 py-1.5 font-mono text-xs tracking-wide text-zinc-700">
                  {exam}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* 2 — Trust */}
      <TrustBand />

      {/* 3 — Services strip */}
      <section id="services" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="What we do" title="Every external exam, handled in one place." lede="Six programmes, one roof — pick yours or browse them all." />
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

      {/* 4 — Stats: AkmanOS statistic-cards */}
      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Track record" title="Figures that speak first." />
            <SampleBadge />
          </div>
          <div className="mt-8">
            <StatisticCards />
          </div>
        </div>
      </section>

      {/* 5 — Tutorials: shadcn cards */}
      <section id="tutorials" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Group tutorials" title="Learn in Laara — or join live from anywhere." lede="Same tutors, same rigour, same drills. Every session is a group session." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Building2 className="h-6 w-6 text-gold" />
                <h3 className="pt-1 font-display text-xl font-bold text-zinc-900">Physical group classes</h3>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-zinc-500">
                Evening and weekend cohorts at our Laara centre — serving {site.partner.serves.join(", ")} and
                surrounding communities.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Wifi className="h-6 w-6 text-gold" />
                <h3 className="pt-1 font-display text-xl font-bold text-zinc-900">Live online group tutorials</h3>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-zinc-500">
                Scheduled live sessions with notes after every lesson and the same timed drills as physical cohorts.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6 — Results: AkmanOS testimonial-cards */}
      <section id="results" className="scroll-mt-20 border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Student stories" title="Results our candidates carry into admission season." />
            <SampleBadge label="Sample stories — real results coming soon" />
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.imageSrc} quote={t.quote} name={t.name} role={t.detail} imageSrc={t.imageSrc} imageAlt={`Portrait placeholder for ${t.name}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 7 — About compact */}
      <section id="about" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
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

      {/* 8 — FAQ: AkmanOS bouncy-accordion */}
      <section id="faq" className="scroll-mt-20 border-t border-zinc-200">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Questions parents ask us" title="Everything you need to know before you visit." />
          <div className="mt-8">
            <FaqBlock faqs={faqs} />
          </div>
        </div>
      </section>

      {/* 9 — Contact: shadcn form primitives */}
      <section id="contact" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-5">
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

      {/* 10 — Closing CTA */}
      <ProgramCta headline="Ready when you are." detail="Message, call, or walk in — the first conversation is free." />
    </>
  );
}
