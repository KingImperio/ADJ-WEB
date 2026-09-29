"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ScrollAnimateProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  from?: "left" | "right" | "top" | "bottom";
  duration?: number;
  once?: boolean;
}

export function ScrollAnimate({
  children,
  delay = 0,
  from = "bottom",
  duration = 0.6,
  once = true,
  className,
  ...props
}: ScrollAnimateProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  const getInitial = () => {
    switch (from) {
      case "left":
        return { opacity: 0, x: -30, filter: "blur(4px)" };
      case "right":
        return { opacity: 0, x: 30, filter: "blur(4px)" };
      case "top":
        return { opacity: 0, y: -30, filter: "blur(4px)" };
      case "bottom":
      default:
        return { opacity: 0, y: 30, filter: "blur(4px)" };
    }
  };

  const getAnimate = () => ({
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  });

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={inView ? getAnimate() : getInitial()}
      transition={{ duration, delay: inView ? delay : 0 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
