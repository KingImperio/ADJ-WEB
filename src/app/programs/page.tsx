import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProgramCard } from "@/components/sections/program-card";
import { FaqBlock } from "@/components/sections/faq-block";
import { ProgramCta } from "@/components/sections/program-cta";
import { FormatPolicy } from "@/components/sections/format-policy";
import { Marquee } from "@/components/ui/marquee";
import { StatisticCards } from "@/components/statistic-cards";
import { SampleBadge } from "@/components/sections/sample-badge";
import { exams, programsIndexFaqs } from "@/lib/site";
import { programs } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Exam prep programmes in Ikorodu — JAMB, WAEC, NECO, JUPEB & more | ADJ",
  description: "All ADJ Educational Consultants programmes: JAMB, WAEC, NECO, GCE, JUPEB, international exams, admissions and group tutorials in Igbe-Laara, Ikorodu.",
};

const groups: { title: string; slugs: string[] }[] = [
  { title: "SS1–SS3 exams", slugs: ["jamb", "waec", "neco", "gce"] },
  { title: "Post-secondary routes", slugs: ["jupeb", "international"] },
  { title: "Services", slugs: ["admissions", "tutorials"] },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Pick the exam. We'll handle the path after it."
        sub="Eight programmes across every external exam that matters in Ikorodu — group classes in Laara plus live online groups."
        pills={["Physical in Laara", "Live online groups", "Group sessions only"]}
      />

      <section className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14">
          {groups.map((group) => (
            <div key={group.title}>
              <SectionHeading eyebrow={group.title} title={group.title} />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.slugs.map((slug) => {
                  const program = programs.find((p) => p.slug === slug);
                  if (!program) return null;
                  return <ProgramCard key={slug} program={program} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading eyebrow="Standing rules" title="How every programme runs." />
          <div className="mt-6">
            <FormatPolicy />
          </div>
        </div>
      </section>

      <div className="relative border-t border-zinc-200 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover className="[--duration:32s]">
          {exams.map((exam) => (
            <span key={exam} className="mx-1 rounded-full border border-zinc-200 bg-zinc-100 px-3.5 py-1.5 font-mono text-xs tracking-wide text-zinc-700">
              {exam}
            </span>
          ))}
        </Marquee>
      </div>

      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Track record" title="Figures across programmes." />
            <SampleBadge />
          </div>
          <div className="mt-8">
            <StatisticCards />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <SectionHeading eyebrow="Choosing" title="Which programme is yours?" />
          <div className="mt-8">
            <FaqBlock faqs={programsIndexFaqs} />
          </div>
        </div>
      </section>

      <ProgramCta headline="Not sure which fits?" detail="Describe the student's situation once — we'll recommend the programme and cohort." />
    </>
  );
}
