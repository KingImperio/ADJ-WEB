import { ProgramCard } from "@/components/sections/program-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { getProgram, type Program } from "@/lib/programs";

export function RelatedPrograms({ program }: { program: Program }) {
  const related = program.related
    .map((slug) => getProgram(slug))
    .filter((p): p is Program => Boolean(p));
  if (related.length === 0) return null;
  return (
    <div>
      <SectionHeading eyebrow="Keep exploring" title="Related programmes." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
    </div>
  );
}
