import Link from "next/link";
import { ArrowRight, Building2, Wifi, MapPin, MonitorSmartphone, Handshake, Sparkles } from "lucide-react";
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
import { AnimatedStatisticCards } from "@/components/statistic-cards/animated-statistic-cards";

const strip: ProgramSlug[] = ["jamb", "waec", "neco", "jupeb", "international", "admissions"];

export default function Home() {
  const cards = strip.map((slug) => getProgram(slug)).filter((p) => p !== undefined);
  return (
    <>
      {/* 1 — Hero: Animated gradient background + modern typography + enhanced buttons */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cobalt via-gold/20 to-cobalt-deep adire-pattern">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#2563EB_0%,#F5B800_50%,#1D4ED8_100%)] bg-[length:400%_400%] animate-gradient opacity-10"></div>
        <div className="relative mx-auto max-w-6xl px-4 pb-14 -mt-20 pt-36 sm:-mt-[88px] sm:pt-44">
          <Badge className="border-gold/40 bg-gold/10 text-gold hover:bg-gold/20 transition-smooth hover-lift">
            <Handshake className="mr-1.5 h-3.5 w-3.5" />
            In partnership with {site.partner.name}
          </Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Pass JAMB, WAEC &amp; NECO —
          </h1>
          <AnimatedText
            text="then secure your admission."
            className="max-w-3xl"
            textClassName="font-display text-4xl font-bold leading-[1.05] tracking-tight text-gradient sm:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {site.name} coaches secondary school students, school leavers and candidates across Ikorodu through every
            external exam that matters — with physical group classes in Laara, live online tutorials, and admission
            processing that follows through until your name is on the list.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link 
              href="/contact" 
              className={buttonVariants({ 
                size: "lg", 
                className: "bg-gradient-to-r from-cobalt to-cobalt-deep text-white font-semibold shadow-glow hover:shadow-glow hover:scale-105 transition-smooth btn-squish"
              })}
            >
              Book a free consultation <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ 
                size: "lg", 
                variant: "outline", 
                className: "border-gold/40 bg-white/10 backdrop-blur-sm text-gold font-semibold hover:bg-gold/20 transition-smooth btn-squish"
              })}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" /> Igbe-Laara, Ikorodu, Lagos
            </span>
            <span className="flex items-center gap-1.5">
              <MonitorSmartphone className="h-4 w-4 text-gold" /> Physical classes + live online groups
            </span>
          </div>
          <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee pauseOnHover className="[--duration:45s]">
              {exams.map((exam) => (
                <span key={exam} className="mx-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 font-mono text-xs tracking-wide text-white">
                  {exam}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* 2 — Trust */}
      <TrustBand />
      {/* Decorative divider */}
      <div className="h-1 bg-gradient-to-r from-cobalt via-gold to-emerald opacity-30"></div>

      {/* 3 — Services strip */}
      <section id="services" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="What we do" title="Every external exam, handled in one place." lede="Six programmes, one roof — pick yours or browse them all." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((program, index) => (
              <div key={program.slug} className="transition-smooth hover-lift">
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
          <Link href="/programs" className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft transition-smooth group">
            View all eight programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 4 — Stats: Animated statistic-cards */}
      <section className="border-t border-zinc-200 bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Track record" title="Figures that speak first." />
            <SampleBadge />
          </div>
          <div className="mt-8">
            <AnimatedStatisticCards />
          </div>
        </div>
      </section>

      {/* 5 — Tutorials: Enhanced shadcn cards with glass effect */}
      <section id="tutorials" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Group tutorials" title="Learn in Laara — or join live from anywhere." lede="Same tutors, same rigour, same drills. Every session is a group session." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card className="glass border border-cobalt/20 shadow-modern-lg transition-smooth hover-lift">
              <CardHeader>
                <Building2 className="h-6 w-6 text-gold" />
                <h3 className="pt-1 font-display text-xl font-bold text-zinc-900">Physical group classes</h3>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-zinc-600">
                Evening and weekend cohorts at our Laara centre — serving {site.partner.serves.join(", ")} and
                surrounding communities.
              </CardContent>
            </Card>
            <Card className="glass border border-gold/20 shadow-modern-lg transition-smooth hover-lift">
              <CardHeader>
                <Wifi className="h-6 w-6 text-cobalt" />
                <h3 className="pt-1 font-display text-xl font-bold text-zinc-900">Live online group tutorials</h3>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-zinc-600">
                Scheduled live sessions with notes after every lesson and the same timed drills as physical cohorts.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6 — Results: Enhanced testimonial-cards */}
      <section id="results" className="scroll-mt-20 border-t border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Student stories" title="Results our candidates carry into admission season." />
            <SampleBadge label="Sample stories — real results coming soon" />
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {testimonials.map((t, index) => (
              <div key={t.imageSrc} className="transition-smooth hover-lift">
                <TestimonialCard 
                  quote={t.quote} 
                  name={t.name} 
                  role={t.detail} 
                  imageSrc={t.imageSrc} 
                  imageAlt={`Portrait placeholder for ${t.name}`}
                />
              </div>
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
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft transition-smooth group">
            Our story, partner and values <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 8 — FAQ: Enhanced bouncy-accordion */}
      <section id="faq" className="scroll-mt-20 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Questions parents ask us" title="Everything you need to know before you visit." />
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-cobalt/5 to-gold/5 p-1">
            <FaqBlock faqs={faqs} />
          </div>
        </div>
      </section>

      {/* 9 — Contact: Enhanced form with glass effect */}
      <section id="contact" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="Free consultation"
              title="Tell us where you are. We'll map the way forward."
              lede="Fill this in and it opens WhatsApp with your message ready — or walk into the office."
            />
            <div className="mt-6 rounded-2xl border border-cobalt/20 bg-white/80 backdrop-blur-sm p-5 sm:p-7 shadow-modern-lg">
              <ConsultationForm />
            </div>
          </div>
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Visit" title="Find us in Laara." />
            <div className="mt-6 flex flex-col gap-4">
              <LocationBlock />
              <Link href="/contact" className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft transition-smooth group">
                More ways to reach us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
