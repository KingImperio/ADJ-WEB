import type { LucideIcon } from "lucide-react";
import { Icon } from "./icon";

export function MetricIconBox({ icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-chart-metric-bg text-foreground">
      <Icon icon={icon} size="md" className="text-foreground" />
    </div>
  );
}
