import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/lib/programs";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-cobalt/60"
    >
      <Badge variant="outline" className="w-fit border-cobalt/50 bg-cobalt/10 font-mono text-[11px] text-zinc-700">
        {program.exam}
      </Badge>
      <h3 className="pt-3 font-display text-lg font-bold text-zinc-900 group-hover:text-gold">{program.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{program.hero.sub}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold">
        View programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
