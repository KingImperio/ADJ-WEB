import { Badge } from "@/components/ui/badge";
import { StatisticCards } from "@/components/statistic-cards";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/site";

/* Stats band — AkmanOS statistic-cards block (animated count-up + growth pills).
   Figures: src/components/statistic-cards/constants.ts (demo, TODO confirm). */
export function Stats() {
  return (
    <section className="border-t border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <StatisticCards />
      </div>
    </section>
  );
}

/* Results — AkmanOS testimonial-card blocks wired to ADJ stories. */
export function Results() {
  return (
    <section id="results" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">Student stories</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
            Results our candidates carry into admission season.
          </h2>
          <Badge variant="outline" className="border-zinc-300 text-zinc-500">
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
