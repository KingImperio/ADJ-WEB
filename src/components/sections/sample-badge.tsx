import { Badge } from "@/components/ui/badge";

export function SampleBadge({ label = "Sample figures — real numbers coming soon" }: { label?: string }) {
  return (
    <Badge variant="outline" className="border-zinc-300 text-zinc-500">
      {label}
    </Badge>
  );
}
