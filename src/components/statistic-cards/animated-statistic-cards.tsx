"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
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

export function AnimatedStatisticCards({ 
  cards, 
  columns = 4 
}: { 
  cards?: CustomStatCard[]; 
  columns?: 2 | 4 
} = {}) {
  const list: CustomStatCard[] = cards ?? [...STAT_CARDS];
  const [animated, setAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setAnimated(true);
    }
  }, [inView]);

  return (
    <div 
      ref={ref}
      className="w-full" 
      data-component="statistic-cards"
    >
      <div className={`grid grid-cols-2 gap-3 ${columns === 4 ? "sm:grid-cols-4" : "sm:grid-cols-2"}`}>
        {list.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={animated ? { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)" 
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className="flex flex-col gap-3 rounded-2xl bg-chart-card-bg px-3 py-3 shadow-modern hover:shadow-modern-lg transition-shadow"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={animated ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <MetricIconBox icon={CARD_ICONS[card.key] ?? FALLBACK_ICON} />
            </motion.div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-chart-muted">{card.label}</span>
              <div className="flex flex-wrap items-center gap-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={animated ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-2xl font-semibold tracking-tight text-foreground tabular-nums"
                >
                  <AnimatedNumber value={card.value} />
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={animated ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.25 }}
                >
                  <GrowthBadge value={card.growth} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
