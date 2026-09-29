"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/* Mount-gated reduced-motion. `useReducedMotion()` is false on the server but
   can be true in the browser (OS prefers-reduced-motion), which makes SSR HTML
   mismatch hydration and crashes React. Gating on mount keeps the first render
   identical on both sides; reduced-motion users get static output right after.
   Use in place of `useReducedMotion() ?? false` in AkmanOS blocks. */
export function useMountedReducedMotion(): boolean {
  const prefersReduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical mount gate: fires once, aligns hydration
    setMounted(true);
  }, []);
  return prefersReduced && mounted;
}
