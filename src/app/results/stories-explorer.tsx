"use client";

import { useState } from "react";
import { TestimonialCard } from "@/components/testimonial-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/site";

const options = ["All", ...Array.from(new Set(testimonials.map((t) => t.exam)))];

export function StoriesExplorer() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? testimonials : testimonials.filter((t) => t.exam === filter);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by exam">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wide transition-colors",
              filter === option
                ? "border-gold/60 bg-gold/15 text-gold"
                : "border-zinc-200 bg-zinc-100 text-zinc-600 hover:border-zinc-400",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline" className="border-zinc-300 text-zinc-500">
          Sample stories — real results coming soon
        </Badge>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {visible.map((t) => (
          <TestimonialCard key={t.imageSrc} quote={t.quote} name={t.name} role={t.detail} imageSrc={t.imageSrc} imageAlt={`Portrait placeholder for ${t.name}`} />
        ))}
      </div>
    </div>
  );
}
