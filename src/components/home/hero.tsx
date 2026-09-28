import Link from "next/link";
import { ArrowRight, MapPin, MonitorSmartphone, Handshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedText } from "@/components/animated-text";
import { Badge } from "@/components/ui/badge";
import { exams, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_-10%,rgba(45,82,232,0.35),transparent),radial-gradient(40rem_24rem_at_90%_10%,rgba(245,158,11,0.14),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:pt-24">
        <Badge className="border-gold/40 bg-gold/10 text-gold hover:bg-gold/15">
          <Handshake className="mr-1.5 h-3.5 w-3.5" />
          In partnership with {site.partner.name}
        </Badge>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Pass JAMB, WAEC &amp; NECO —
        </h1>
        {/* Gold headline line — AkmanOS animated-text (looping typewriter) */}
        <AnimatedText
          text="then secure your admission."
          className="max-w-3xl"
          textClassName="font-display text-4xl font-bold leading-[1.05] tracking-tight text-gold sm:text-6xl"
        />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {site.name} coaches secondary school students, school leavers and candidates across Ikorodu through every
          external exam that matters — with physical group classes in Laara, live online tutorials, and admission
          processing that follows through until your name is on the list.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contact"
            className={buttonVariants({ size: "lg", className: "bg-cobalt font-semibold text-white hover:bg-cobalt-deep" })}
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
              className: "border-white/20 bg-transparent font-semibold text-white hover:bg-white/10",
            })}
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gold" /> Igbe-Laara, Ikorodu, Lagos
          </span>
          <span className="flex items-center gap-1.5">
            <MonitorSmartphone className="h-4 w-4 text-gold" /> Physical classes + live online groups
          </span>
        </div>
        {/* Exams ticker — Magic UI marquee (21st-ecosystem block, MIT) */}
        <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee pauseOnHover className="[--duration:32s]">
            {exams.map((exam) => (
              <span
                key={exam}
                className="mx-1 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs tracking-wide text-slate-200"
              >
                {exam}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
