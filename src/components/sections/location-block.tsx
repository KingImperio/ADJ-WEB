import { MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/lib/site";

/* Location glue: shadcn Card fed by site address facts. */
export function LocationBlock({ compact = false }: { compact?: boolean }) {
  return (
    <Card>
      <CardContent className={`flex flex-col gap-3 text-sm text-zinc-600 ${compact ? "pt-5" : "pt-6"}`}>
        <span className="flex gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>
            {site.address.line1}, {site.address.line2}
            <span className="mt-1 block text-xs text-zinc-500">{site.address.landmark}</span>
          </span>
        </span>
        {!compact ? (
          <span className="flex gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.hours}
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
}
