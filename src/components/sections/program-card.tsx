import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Program } from "@/lib/programs";

/* Programme card glue: shadcn Card fed by programs.ts data. */
export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={`/programs/${program.slug}`} className="group flex">
      <Card className="flex flex-1 flex-col transition-colors hover:border-cobalt/60">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit border-cobalt/50 bg-cobalt/10 font-mono text-[11px] text-zinc-700">
            {program.exam}
          </Badge>
          <h3 className="pt-2 font-display text-lg font-bold text-zinc-900 group-hover:text-cobalt">
            {program.name}
          </h3>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <p className="flex-1 text-sm leading-relaxed text-zinc-500">{program.hero.sub}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold">
            View programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
