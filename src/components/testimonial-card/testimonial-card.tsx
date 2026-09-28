"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";
import {
  DEFAULT_TESTIMONIAL_IMAGE_ALT,
  DEFAULT_TESTIMONIAL_IMAGE_SRC,
  DEFAULT_TESTIMONIAL_NAME,
  DEFAULT_TESTIMONIAL_QUOTE,
  DEFAULT_TESTIMONIAL_ROLE,
  TESTIMONIAL_EASE_OUT,
  TESTIMONIAL_ENTER_SPRING,
  TESTIMONIAL_PANEL_SPRING,
  TESTIMONIAL_STAGGER_DELAY,
} from "./constants";

export type TestimonialCardProps = {
  quote?: string;
  name?: string;
  role?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function TestimonialCard({
  quote = DEFAULT_TESTIMONIAL_QUOTE,
  name = DEFAULT_TESTIMONIAL_NAME,
  role = DEFAULT_TESTIMONIAL_ROLE,
  imageSrc = DEFAULT_TESTIMONIAL_IMAGE_SRC,
  imageAlt = DEFAULT_TESTIMONIAL_IMAGE_ALT,
  className,
}: TestimonialCardProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: TESTIMONIAL_STAGGER_DELAY,
        delayChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            y: TESTIMONIAL_ENTER_SPRING,
            opacity: { duration: 0.45, ease: TESTIMONIAL_EASE_OUT },
            filter: { duration: 0.5, ease: TESTIMONIAL_EASE_OUT },
          },
        },
      };

  const imageVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, scale: 1 },
        visible: { opacity: 1, scale: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 1.04, x: -12 },
        visible: {
          opacity: 1,
          scale: 1,
          x: 0,
          transition: TESTIMONIAL_ENTER_SPRING,
        },
      };

  return (
    <motion.article
      data-component="testimonial-card"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : TESTIMONIAL_PANEL_SPRING}
      className={cn("w-full rounded-3xl bg-[var(--testimonial-bg)] p-5 sm:p-6 md:p-8", className)}
    >
      <motion.div
        className="flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={imageVariants}
          className="relative w-full shrink-0 overflow-hidden rounded-2xl sm:w-[42%] sm:max-w-[17.5rem]"
        >
          {/* portrait asset (local SVG placeholder until real photos arrive) */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:h-full sm:min-h-[12.5rem] md:min-h-[14rem]"
            draggable={false}
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { ...TESTIMONIAL_ENTER_SPRING, delay: 0.08 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex min-w-0 flex-1 flex-col justify-center gap-5 py-0.5">
          <div className="flex gap-2 sm:gap-3">
            <motion.span
              variants={itemVariants}
              className="shrink-0 text-[1.75rem] font-semibold leading-none text-[var(--testimonial-fg)]"
              aria-hidden
            >
              “
            </motion.span>
            <motion.p
              variants={itemVariants}
              className="text-base leading-[1.55] text-[var(--testimonial-fg)] sm:text-[17px] md:text-lg md:leading-[1.6]"
            >
              {quote}
            </motion.p>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-sm leading-relaxed text-[var(--testimonial-muted)] sm:text-[15px]"
          >
            — {name}, {role}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
