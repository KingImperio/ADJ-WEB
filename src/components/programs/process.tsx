import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Program } from "@/lib/programs";

export function Process({ program }: { program: Program }) {
  return (
    <div>
      <SectionHeading eyebrow="Process" title="From first call to exam-ready." />
      <ol className="mt-6 grid gap-4 md:grid-cols-5">
        {program.process.map((step, i) => (
          <li key={step.step} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="font-display text-2xl font-bold text-gold">{i + 1}</p>
            <p className="mt-1 font-display text-sm font-bold text-zinc-900">{step.step}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const disclaimers: Record<string, { label: string; copy: string }> = {
  "no-study-abroad": {
    label: "Scope",
    copy: "Nigerian tertiary admissions only. We prepare test scores for international routes and refer placement and visas onward.",
  },
  "no-one-on-one": {
    label: "Group-only",
    copy: "Every class is a group session — shared pace, shared energy, one fee structure. No private coaching, by design.",
  },
  "partner-delivered": {
    label: "Partnership",
    copy: "Delivered with Greater Heights Tutorial Center. Test preparation only — no admissions placement or visas.",
  },
  "no-fees-published": {
    label: "Fees",
    copy: "Fees are confirmed during the free consultation. Nothing published, no commitment before you've seen the plan.",
  },
};

export function Disclaimer({ program }: { program: Program }) {
  if (!program.disclaimer) return null;
  const item = disclaimers[program.disclaimer];
  return (
    <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5 sm:p-6">
      <Badge variant="outline" className="border-gold/40 bg-gold/10 text-[11px] text-gold">
        {item.label}
      </Badge>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.copy}</p>
    </div>
  );
}
