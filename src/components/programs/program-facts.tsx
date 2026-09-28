import { Check } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Program } from "@/lib/programs";

export function ProgramFacts({ program }: { program: Program }) {
  const facts = [
    { label: "Format", value: program.format.mode === "both" ? "Physical + live online" : program.format.mode },
    { label: "Class model", value: "Group sessions only" },
    { label: "Schedule", value: program.format.scheduleNote },
    { label: "Cohort size", value: program.format.capacityNote },
  ];
  return (
    <div>
      <SectionHeading eyebrow="Quick facts" title="At a glance." />
      <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-xl border border-zinc-200 bg-white p-4">
            <dt className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{fact.label}</dt>
            <dd className="mt-1 text-sm font-semibold text-zinc-900">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Audience({ program }: { program: Program }) {
  return (
    <div>
      <SectionHeading eyebrow="Who this is for" title="Built for students like yours." />
      <ul className="mt-6 space-y-2.5">
        {program.whoFor.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 sm:text-base">
            <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Outcomes({ program }: { program: Program }) {
  return (
    <div>
      <SectionHeading eyebrow="Outcomes" title="What the student walks out able to do." lede="Concrete abilities — never pass-rate claims." />
      <ul className="mt-6 space-y-2.5">
        {program.outcomes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 sm:text-base">
            <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
