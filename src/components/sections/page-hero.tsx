import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_20%_-10%,rgba(45,82,232,0.35),transparent),radial-gradient(40rem_24rem_at_90%_10%,rgba(206,126,27,0.12),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-12 -mt-20 pt-[136px] sm:-mt-[88px] sm:pt-[168px]">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-300">{eyebrow}</span>
        </nav>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{sub}</p>
        {pills && pills.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <Badge key={pill} variant="outline" className="border-white/15 bg-white/5 font-mono text-xs text-slate-200">
                {pill}
              </Badge>
            ))}
          </div>
        ) : null}
        <Link
          href="/contact"
          className="mt-7 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold hover:text-gold-soft"
        >
          Book a free consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
