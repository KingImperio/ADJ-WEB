import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stats, testimonials, site } from "@/lib/site";

export function Stats() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-14 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-4 text-center lg:py-2">
            <p className="font-display text-4xl font-bold text-white sm:text-5xl">{s.value}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

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
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name + t.detail} className="flex flex-col border-white/10 bg-panel">
              <CardContent className="flex flex-1 flex-col pt-6">
                <Quote className="h-5 w-5 text-gold" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-200">“{t.quote}”</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.detail}</p>
                </div>
              </CardContent>
            </Card>
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
        <div className="relative overflow-hidden rounded-2xl border border-cobalt/40 bg-gradient-to-br from-cobalt-deep/40 via-panel to-panel p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_16rem_at_85%_20%,rgba(245,158,11,0.18),transparent)]"
          />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Train like it&apos;s exam day
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Timed CBT drills on our own practice platform.
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            ADJ candidates don&apos;t just study — they rehearse. Our EduQuest CBT platform serves timed questions,
            instant scoring and performance tracking, so the real JAMB interface feels like home.
          </p>
          <Link
            href={site.cbtUrl}
            className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft"
          >
            Try the practice platform <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
