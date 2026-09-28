import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SampleBadge } from "@/components/sections/sample-badge";
import { StatisticCards } from "@/components/statistic-cards";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { ProgramCard } from "@/components/sections/program-card";
import { Badge } from "@/components/ui/badge";
import { StoriesExplorer } from "./stories-explorer";
import { results, resultsFaqs } from "@/lib/site";
import { getProgram } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Student results & success stories | ADJ Educational Consultants",
  description: "Results and success stories from ADJ Educational Consultants candidates in Ikorodu — JAMB, WAEC, NECO and admissions.",
};

/* DEMO secondary figures — TODO: confirm or remove with real data. */
const secondaryStats = [
  { key: "evenings", label: "Weeknight classes", value: 12, growth: 20.0 },
  { key: "weekends", label: "Weekend cohorts", value: 8, growth: 14.3 },
  { key: "online", label: "Online learners", value: 150, growth: 42.9 },
  { key: "centres", label: "Partner centres", value: 2, growth: 100.0 },
];

export default function ResultsPage() {
  const jamb = getProgram("jamb");
  const waec = getProgram("waec");
  const admissions = getProgram("admissions");
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Results our candidates carry into admission season."
        sub="Scores, admissions and the stories behind them — every figure below is labelled sample until real consented results replace it."
      />

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Track record" title="The stats wall." />
            <SampleBadge />
          </div>
          <div className="mt-8">
            <StatisticCards />
          </div>
          <div className="mt-3">
            <StatisticCards cards={secondaryStats} />
          </div>
          <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <Badge variant="outline" className="border-gold/40 bg-gold/10 text-[11px] text-gold">
              Sample stories
            </Badge>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              These figures and stories are placeholders illustrating the outcomes our programmes target. Real,
              consented results — names, exams, scores — replace them as each admission season concludes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0e1c]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Stories" title="In their own words." />
          <div className="mt-8">
            <StoriesExplorer />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Results table" title="Scannable results." lede="Real, consented rows land here. Until then, the table waits — we don't invent scores." />
          {results.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-sm text-slate-500">
              No published result rows yet. Detailed, consented records are shown during consultation.
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-widest text-slate-500">
                    <th className="px-4 py-3">Candidate</th>
                    <th className="px-4 py-3">Exam</th>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Area</th>
                    <th className="px-4 py-3">Programme</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row) => (
                    <tr key={`${row.name}-${row.exam}-${row.year}`} className="border-b border-white/5 text-slate-300">
                      <td className="px-4 py-3 font-semibold text-white">{row.name}</td>
                      <td className="px-4 py-3">{row.exam}</td>
                      <td className="px-4 py-3">{row.year}</td>
                      <td className="px-4 py-3 font-mono text-gold">{row.score}</td>
                      <td className="px-4 py-3">{row.area}</td>
                      <td className="px-4 py-3">{row.programme}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 rounded-2xl border border-white/10 bg-panel p-5">
            <p className="text-sm leading-relaxed text-slate-400">
              What these numbers do <span className="font-semibold text-white">not</span> claim: individual results
              vary with attendance, starting level and effort, and no admission is ever guaranteed. That honesty is
              part of the preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0e1c]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Where results come from" title="The programmes behind them." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[jamb, waec, admissions].map((p) => (p ? <ProgramCard key={p.slug} program={p} /> : null))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Trust" title="Fair questions." />
          <div className="mt-8">
            <FaqBlock faqs={resultsFaqs} />
          </div>
        </div>
      </section>

      <ProgramCta headline="Become the next story." detail="Free assessment first — then the programme that fits." />
    </>
  );
}
