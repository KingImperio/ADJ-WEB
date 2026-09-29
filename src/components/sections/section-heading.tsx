import { Badge } from "@/components/ui/badge";
import { ScrollAnimate } from "@/components/ui/scroll-animate";

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
      <ScrollAnimate delay={0.1} from="left">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      </ScrollAnimate>
      <ScrollAnimate delay={0.2} from="left">
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-zinc-900 sm:text-4xl">{title}</h2>
      </ScrollAnimate>
      {lede ? (
        <ScrollAnimate delay={0.3} from="left">
          <p className="mt-3 max-w-2xl text-zinc-500">{lede}</p>
        </ScrollAnimate>
      ) : null}
    </div>
  );
}

export function SampleBadge({ label = "Sample figures — real numbers coming soon" }: { label?: string }) {
  return (
    <Badge variant="outline" className="border-zinc-300 text-zinc-500 hover:bg-zinc-100 transition-colors">
      {label}
    </Badge>
  );
}
