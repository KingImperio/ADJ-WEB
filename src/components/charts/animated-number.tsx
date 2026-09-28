"use client";

/* eslint-disable react-hooks/set-state-in-effect -- vendored AkmanOS source (verbatim); the synchronous set covers reduced-motion + zero-duration cases */

import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 280;
const INITIAL_DURATION = 450;

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function getAdaptiveDuration(start: number, end: number) {
  const delta = Math.abs(end - start);

  if (delta === 0) {
    return 0;
  }

  if (start === 0 && end > 1000) {
    return INITIAL_DURATION;
  }

  if (delta < 1500) {
    return 180;
  }

  if (delta < 10000) {
    return DEFAULT_DURATION;
  }

  return 360;
}

function getGrowthAnimationDuration(start: number, end: number) {
  const delta = Math.abs(end - start);

  if (delta === 0) {
    return 0;
  }

  if (delta < 2) {
    return 280;
  }

  if (delta < 8) {
    return 360;
  }

  return 450;
}

type UseAnimatedNumberOptions = {
  duration?: number;
  getDuration?: (start: number, end: number) => number;
};

export function useAnimatedNumber(
  value: number,
  { duration, getDuration }: UseAnimatedNumberOptions = {},
) {
  const [displayValue, setDisplayValue] = useState(0);
  const animatedValueRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      animatedValueRef.current = value;
      setDisplayValue(value);
      return;
    }

    const startValue = animatedValueRef.current;
    const animationDuration =
      duration ?? getDuration?.(startValue, value) ?? getAdaptiveDuration(startValue, value);

    if (animationDuration === 0) {
      animatedValueRef.current = value;
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / animationDuration, 1);
      const current = startValue + (value - startValue) * easeOutCubic(progress);

      animatedValueRef.current = current;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        animatedValueRef.current = value;
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value, duration, getDuration]);

  return displayValue;
}

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
};

export function AnimatedNumber({
  value,
  duration,
  format = (current) => Math.round(current).toLocaleString("en-US"),
  className,
}: AnimatedNumberProps) {
  const animatedValue = useAnimatedNumber(value, { duration });

  return <span className={className}>{format(animatedValue)}</span>;
}

type AnimatedGrowthProps = {
  value: number;
  duration?: number;
  className?: string;
};

export function AnimatedGrowth({
  value,
  duration,
  className,
}: AnimatedGrowthProps) {
  const animatedValue = useAnimatedNumber(value, {
    duration,
    getDuration: getGrowthAnimationDuration,
  });
  const formatted = `${animatedValue >= 0 ? "+" : "-"}${Math.abs(animatedValue).toFixed(1)}%`;

  return <span className={`tabular-nums ${className ?? ""}`.trim()}>{formatted}</span>;
}
