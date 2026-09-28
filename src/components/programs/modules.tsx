import { BouncyAccordionList } from "@/components/bouncy-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Program } from "@/lib/programs";

export function Modules({ program }: { program: Program }) {
  return (
    <div>
      <SectionHeading eyebrow="Syllabus" title="Module by module." />
      <div className="mt-6">
        <BouncyAccordionList
          defaultValue="m-0"
          items={program.modules.map((m, i) => ({
            id: `m-${i}`,
            title: m.title,
            description: m.detail,
          }))}
        />
      </div>
    </div>
  );
}
