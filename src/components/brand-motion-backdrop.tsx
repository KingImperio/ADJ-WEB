"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * A quiet brand-native atmosphere: compass rings, a rising path, and book
 * lines. It only animates compositor-friendly transforms and becomes static
 * when the user prefers reduced motion.
 */
export function BrandMotionBackdrop({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion ? undefined : { duration: compact ? 22 : 28, repeat: Infinity, ease: "linear" as const };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -right-32 -top-44 size-[34rem] rounded-full border border-[#D5A11E]/30 will-change-transform sm:size-[44rem]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={loop}
      >
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D5A11E] shadow-[0_0_22px_rgba(213,161,30,.75)]" />
      </motion.div>
      <motion.div
        className="absolute -right-12 -top-24 size-[23rem] rounded-full border border-white/15 will-change-transform sm:size-[31rem]"
        animate={reduceMotion ? undefined : { rotate: -360, scale: [1, 1.025, 1] }}
        transition={reduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: "linear" }}
      />
      <motion.svg
        className="absolute -bottom-10 left-[4%] h-[55%] w-[58%] opacity-25 will-change-transform"
        viewBox="0 0 600 260"
        fill="none"
        animate={reduceMotion ? undefined : { x: [0, 10, 0], y: [0, -5, 0] }}
        transition={reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M-20 245C110 210 122 160 244 163C371 167 397 88 640 34" stroke="#D5A11E" strokeWidth="3" />
        <path d="M-40 264C105 229 130 189 252 191C393 193 429 116 660 62" stroke="white" strokeOpacity=".38" />
        <path d="M-48 282C96 250 142 217 268 219C405 221 461 145 674 92" stroke="white" strokeOpacity=".22" />
      </motion.svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,transparent_0,rgba(7,24,88,.10)_38%,rgba(7,24,88,.42)_100%)]" />
    </div>
  );
}
