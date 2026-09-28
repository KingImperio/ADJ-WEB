import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { policies } from "@/lib/site";

export function TrustBand() {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-6 sm:gap-3">
        {policies.slice(0, 3).map((policy, i) => (
          <span key={policy} className="flex items-center gap-2 sm:gap-3">
            {i > 0 ? <Separator orientation="vertical" className="hidden h-4 bg-white/15 sm:block" /> : null}
            <Badge variant="outline" className="border-white/15 bg-white/5 text-xs font-normal text-slate-300">
              {policy}
            </Badge>
          </span>
        ))}
      </div>
    </section>
  );
}
