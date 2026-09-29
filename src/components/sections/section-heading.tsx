import { Badge } from "@/components/ui/badge";

/* Section heading + sample-flag glue: type + shadcn badge only. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-zinc-900 sm:text-4xl">{title}</h2>
      {lede ? <p className="mt-3 max-w-2xl text-zinc-500">{lede}</p> : null}
    </div>
  );
}

export function SampleBadge({ label = "Sample figures — real numbers coming soon" }: { label?: string }) {
  return (
    <Badge variant="outline" className="border-zinc-300 text-zinc-500">
      {label}
    </Badge>
  );
}
