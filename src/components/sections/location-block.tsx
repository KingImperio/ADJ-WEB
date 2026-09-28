import { MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";

export function LocationBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <div className="flex flex-col gap-3 text-sm text-zinc-600">
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
      </div>
    </div>
  );
}
