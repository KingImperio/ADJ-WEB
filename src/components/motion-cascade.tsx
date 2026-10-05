"use client";

import { Children } from "react";
import { motion, useReducedMotion } from "motion/react";

export function MotionCascade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.105, delayChildren: 0.08 } } }}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
