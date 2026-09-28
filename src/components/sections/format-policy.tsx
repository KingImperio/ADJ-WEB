import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { policies } from "@/lib/site";

const labels: Record<string, string> = {
  "Group sessions only — every class learns together at the same pace.": "Group-only",
  "No study-abroad placement or visas — exam scores only, with referrals onward.": "No placement",
  "Online means live group tutorials — never one-on-one.": "Live groups",
  "Fees confirmed during consultation — nothing published, no pre-commitment.": "No published fees",
};

export function FormatPolicy() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {policies.map((policy) => (
        <li key={policy} className="flex items-start gap-3 rounded-xl border border-white/10 bg-panel p-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span className="text-sm text-slate-300">
            <Badge variant="outline" className="mr-2 border-gold/40 bg-gold/10 text-[11px] text-gold">
              {labels[policy] ?? "Policy"}
            </Badge>
            {policy}
          </span>
        </li>
      ))}
    </ul>
  );
}
