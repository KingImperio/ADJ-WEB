import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { policies } from "@/lib/site";

export function TrustBand() {
  return (
    <section className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-6 sm:gap-3">
        {policies.slice(0, 3).map((policy, i) => (
          <span key={policy} className="flex items-center gap-2 sm:gap-3">
            {i > 0 ? <Separator orientation="vertical" className="hidden h-4 bg-zinc-300 sm:block" /> : null}
            <Badge variant="outline" className="border-zinc-200 bg-zinc-100 text-xs font-normal text-zinc-600">
              {policy}
            </Badge>
          </span>
        ))}
      </div>
    </section>
  );
}
