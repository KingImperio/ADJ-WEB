/* AkmanOS statistic-cards — MODIFIED from verbatim (see PAGE-CONTENT-PLAN.md §13
   step 11): optional `cards` + `columns` props added with backwards-compatible
   defaults, so the homepage renders identically. Icon lookup falls back to
   GraduationCap for unknown keys. Everything else is untouched AkmanOS source. */
import type { LucideIcon } from "lucide-react";
import { Users, LayoutGrid, ClipboardCheck, GraduationCap } from "lucide-react";
import { AnimatedNumber } from "@/components/charts/animated-number";
import { MetricIconBox } from "@/components/icons/metric-icon-box";
import { STAT_CARDS, type StatCardKey } from "./constants";
import { GrowthBadge } from "./growth-badge";

export interface CustomStatCard {
  key: string;
  label: string;
  value: number;
  growth: number;
}

const CARD_ICONS: Record<string, LucideIcon> = {
  candidates: Users,
  cohorts: LayoutGrid,
  mocks: ClipboardCheck,
  admissions: GraduationCap,
} satisfies Record<StatCardKey, LucideIcon>;

const FALLBACK_ICON = GraduationCap;

export function StatisticCards({ cards, columns = 4 }: { cards?: CustomStatCard[]; columns?: 2 | 4 } = {}) {
  const list: CustomStatCard[] = cards ?? [...STAT_CARDS];
  return (
    <div className="w-full" data-component="statistic-cards">
      <div className={`grid grid-cols-2 gap-3 ${columns === 4 ? "sm:grid-cols-4" : "sm:grid-cols-2"}`}>
        {list.map((card) => (
          <div key={card.key} className="flex flex-col gap-3 rounded-2xl bg-chart-card-bg px-3 py-3">
            <MetricIconBox icon={CARD_ICONS[card.key] ?? FALLBACK_ICON} />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-chart-muted">{card.label}</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                  <AnimatedNumber value={card.value} />
                </span>
                <GrowthBadge value={card.growth} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
