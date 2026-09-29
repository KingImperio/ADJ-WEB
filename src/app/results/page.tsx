import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading, SampleBadge } from "@/components/sections/section-heading";
import { StatisticCards } from "@/components/statistic-cards";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { ProgramCard } from "@/components/sections/program-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  const featured = ["jamb", "waec", "admissions"].map((s) => getProgram(s)).filter((p) => p !== undefined);
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Results our candidates carry into admission season."
        sub="Scores, admissions and the stories behind them — every figure below is labelled sample until real consented results replace it."
      />

      <section className="border-t border-zinc-200">
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
          <Card className="mt-6 border-gold/30 bg-gold/5">
            <CardContent className="pt-5">
              <Badge variant="outline" className="border-gold/40 bg-gold/10 text-[11px] text-gold">
                Sample stories
              </Badge>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                These figures and stories are placeholders illustrating the outcomes our programmes target. Real,
                consented results — names, exams, scores — replace them as each admission season concludes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Stories" title="In their own words." />
          <div className="mt-8">
            <StoriesExplorer />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Results table" title="Scannable results." lede="Real, consented rows land here. Until then, the table waits — we don't invent scores." />
          {results.length === 0 ? (
            <Card className="mt-6 border-dashed">
              <CardContent className="pt-5 text-sm text-zinc-500">
                No published result rows yet. Detailed, consented records are shown during consultation.
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Exam</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Programme</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((row) => (
                    <TableRow key={`${row.name}-${row.exam}-${row.year}`}>
                      <TableCell className="font-semibold">{row.name}</TableCell>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell>{row.year}</TableCell>
                      <TableCell className="font-mono text-gold">{row.score}</TableCell>
                      <TableCell>{row.area}</TableCell>
                      <TableCell>{row.programme}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <Card className="mt-6">
            <CardContent className="pt-5 text-sm leading-relaxed text-zinc-500">
              What these numbers do <span className="font-semibold text-zinc-900">not</span> claim: individual results
              vary with attendance, starting level and effort, and no admission is ever guaranteed.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Where results come from" title="The programmes behind them." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200">
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
