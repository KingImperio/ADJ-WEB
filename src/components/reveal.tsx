"use client";

import { motion, useReducedMotion } from "motion/react";

/* Scroll-triggered entrance: fades/slides children in once they cross the
   viewport. Keeps the page feeling engineered instead of printed — and
   costs one IO instance per block, no library. */
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay: delay / 1000 }}>
      {children}
    </motion.div>
  );
}
