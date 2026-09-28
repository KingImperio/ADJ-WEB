"use client";

/* eslint-disable react-hooks/set-state-in-effect -- vendored AkmanOS source (verbatim); the synchronous set covers reduced-motion + loop-reset cases */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  ANIMATED_TEXT_CHAR_MS,
  ANIMATED_TEXT_DEFAULT,
  ANIMATED_TEXT_ENTER_SPRING,
  ANIMATED_TEXT_LOOP_PAUSE_MS,
  ANIMATED_TEXT_START_DELAY_MS,
} from "./constants";

export type AnimatedTextProps = {
  text?: string;
  loop?: boolean;
  charDelayMs?: number;
  loopPauseMs?: number;
  startDelayMs?: number;
  className?: string;
  textClassName?: string;
};

export function AnimatedText({
  text = ANIMATED_TEXT_DEFAULT,
  loop = true,
  charDelayMs = ANIMATED_TEXT_CHAR_MS,
  loopPauseMs = ANIMATED_TEXT_LOOP_PAUSE_MS,
  startDelayMs = ANIMATED_TEXT_START_DELAY_MS,
  className,
  textClassName,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const chars = useMemo(() => text.split(""), [text]);
  const [visibleCount, setVisibleCount] = useState(
    reduceMotion ? chars.length : 0,
  );

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(chars.length);
      return;
    }

    let count = 0;
    let timeoutId = 0;

    setVisibleCount(0);

    const schedule = (ms: number, fn: () => void) => {
      timeoutId = window.setTimeout(fn, ms);
    };

    const typeNext = () => {
      count += 1;
      setVisibleCount(count);

      if (count < chars.length) {
        schedule(charDelayMs, typeNext);
        return;
      }

      if (!loop) {
        return;
      }

      schedule(loopPauseMs, () => {
        count = 0;
        setVisibleCount(0);
        schedule(charDelayMs, typeNext);
      });
    };

    schedule(startDelayMs, typeNext);

    return () => window.clearTimeout(timeoutId);
  }, [
    charDelayMs,
    chars.length,
    loop,
    loopPauseMs,
    reduceMotion,
    startDelayMs,
    text,
  ]);

  return (
    <div data-component="animated-text" className={cn("w-full", className)}>
      <p
        className={cn(
          "font-sans text-base font-medium leading-snug text-foreground",
          textClassName,
        )}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${text}-${index}`}
            initial={false}
            animate={{
              opacity: index < visibleCount ? 1 : 0,
              y: index < visibleCount ? 0 : 6,
              filter: index < visibleCount ? "blur(0px)" : "blur(4px)",
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.2 },
                    y: ANIMATED_TEXT_ENTER_SPRING,
                    filter: { duration: 0.25 },
                  }
            }
            className="inline-block"
            style={{ minWidth: char === " " ? "0.25em" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

/** Gallery preview — default quote, centered. */
export function AnimatedTextShowcase() {
  return (
    <AnimatedText className="mx-auto max-w-lg px-4 py-10 text-center sm:px-6" />
  );
}
