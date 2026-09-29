import Link from "next/link";
import { Badge } from "@/components/ui/badge";

/* Page hero glue: eyebrow + headline + sub + pills + consultation link.
   Visuals are shadcn badge + type only — no custom hero component. */
export function PageHero({
  eyebrow,
  title,
  sub,
  pills,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  pills?: string[];
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pb-12 -mt-20 pt-[136px] sm:-mt-[88px] sm:pt-[168px]">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-zinc-700">{eyebrow}</span>
        </nav>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">{sub}</p>
        {pills && pills.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <Badge key={pill} variant="outline" className="border-zinc-200 bg-zinc-100 font-mono text-xs text-zinc-700">
                {pill}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
