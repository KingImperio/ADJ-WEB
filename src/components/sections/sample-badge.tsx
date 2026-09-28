import { Badge } from "@/components/ui/badge";

export function SampleBadge({ label = "Sample figures — real numbers coming soon" }: { label?: string }) {
  return (
    <Badge variant="outline" className="border-white/20 text-slate-400">
      {label}
    </Badge>
  );
}
