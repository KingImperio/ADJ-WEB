"use client";

import { AnimatedGrowth } from "@/components/charts/animated-number";
import { GROWTH_BADGE_POSITIVE } from "./constants";

function isNeutralGrowth(value: number) {
  return Math.abs(value) < 0.05;
}

export function GrowthBadge({ value }: { value: number }) {
  const neutral = isNeutralGrowth(value);
  const isPositive = value > 0;

  const toneClass = neutral
    ? "bg-surface text-chart-muted"
    : isPositive
      ? ""
      : "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400";

  const style =
    !neutral && isPositive
      ? {
          backgroundColor: GROWTH_BADGE_POSITIVE.background,
          color: GROWTH_BADGE_POSITIVE.text,
        }
      : undefined;

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${toneClass}`}
      style={style}
    >
      {neutral ? <span className="tabular-nums">0.00%</span> : <AnimatedGrowth value={value} />}
    </span>
  );
}
