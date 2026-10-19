"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMountedReducedMotion } from "@/lib/use-mounted-motion";

type Story = { name: string; badge: string; quote: string; detail: string; initials: string };
export function StoryCarousel({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState(0);
  const reduced = useMountedReducedMotion();
  if (!stories.length) return null;
  const story = stories[active];
  const next = (direction: number) => setActive(index => (index + direction + stories.length) % stories.length);
  return (
    <div className="story-carousel" aria-roledescription="carousel" aria-label="Student and parent stories">
      <Quote className="story-quote-icon" size={44} aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure key={story.name} initial={reduced ? false : { y: 16 }} animate={{ y: 0 }} exit={reduced ? undefined : { y: -16 }} transition={{ duration: reduced ? 0 : 0.2 }}>
          <span className="weave-eyebrow">{story.badge}</span>
          <blockquote>{story.quote}</blockquote>
          <figcaption><span className="story-initials">{story.initials}</span><span><strong>{story.name}</strong><small>{story.detail}</small></span></figcaption>
        </motion.figure>
      </AnimatePresence>
      <div className="story-controls"><span aria-live="polite">{active + 1} / {stories.length}</span><Button variant="outline" size="icon-lg" title="Previous story" aria-label="Previous story" onClick={() => next(-1)}><ArrowLeft /></Button><Button variant="outline" size="icon-lg" title="Next story" aria-label="Next story" onClick={() => next(1)}><ArrowRight /></Button></div>
    </div>
  );
}
