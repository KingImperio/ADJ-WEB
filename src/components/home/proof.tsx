import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatisticCards } from "@/components/statistic-cards";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/site";

/* Stats band — AkmanOS statistic-cards block (animated count-up + growth pills).
   Figures: src/components/statistic-cards/constants.ts (demo, TODO confirm). */
export function Stats() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <StatisticCards />
      </div>
    </section>
  );
}

/* Results — AkmanOS testimonial-card blocks wired to ADJ stories. */
export function Results() {
  return (
    <section id="results" className="scroll-mt-20 border-t border-white/10 bg-[#0a0e1c]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">Student stories</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
            Results our candidates carry into admission season.
          </h2>
          <Badge variant="outline" className="border-white/20 text-slate-400">
            Sample stories — real results coming soon
          </Badge>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.imageSrc}
              quote={t.quote}
              name={t.name}
              role={t.detail}
              imageSrc={t.imageSrc}
              imageAlt={`Portrait placeholder for ${t.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CbtBand() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel p-8 opacity-80 sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Train like it&apos;s exam day
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-slate-300 sm:text-4xl">
            Timed CBT drills on our own practice platform.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500">
            ADJ candidates don&apos;t just study — they rehearse. Our EduQuest CBT platform will serve timed questions,
            instant scoring and performance tracking, so the real JAMB interface feels like home.
          </p>
          <span className="mt-6 inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2.5 font-display text-sm font-bold text-slate-500">
            Practice platform — coming soon <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
