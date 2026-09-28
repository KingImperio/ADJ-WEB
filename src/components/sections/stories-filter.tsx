"use client";

import { cn } from "@/lib/utils";

export function StoriesFilter({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by exam">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wide transition-colors",
            value === option
              ? "border-gold/60 bg-gold/15 text-gold"
              : "border-white/15 bg-white/5 text-slate-300 hover:border-white/30",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
