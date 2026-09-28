"use client";

import { useState } from "react";
import { TestimonialCard } from "@/components/testimonial-card";
import { StoriesFilter } from "@/components/sections/stories-filter";
import { testimonials } from "@/lib/site";

const options = ["All", ...Array.from(new Set(testimonials.map((t) => t.exam)))];

export function StoriesExplorer() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? testimonials : testimonials.filter((t) => t.exam === filter);
  return (
    <div>
      <StoriesFilter options={options} value={filter} onChange={setFilter} />
      <div className="mt-6 flex flex-col gap-4">
        {visible.map((t) => (
          <TestimonialCard
            key={t.imageSrc}
            quote={t.quote}
            name={t.name}
            role={t.detail}
            imageSrc={t.imageSrc}
            imageAlt={`Portrait placeholder for ${t.name}`}
          />
        ))}
      </div>
    </div>
  );
}
