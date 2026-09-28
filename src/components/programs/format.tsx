import { Building2, Wifi } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Program } from "@/lib/programs";

export function Format({ program }: { program: Program }) {
  void program;
  return (
    <div>
      <SectionHeading eyebrow="Format" title="Physical in Laara, live online — your call." lede="Same tutors, same rigour, same drills. Every session is a group session." />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-panel p-6">
          <Building2 className="h-6 w-6 text-gold" />
          <h3 className="pt-2 font-display text-lg font-bold text-white">Physical group classes</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Evening and weekend cohorts at our Laara centre, just off Igbe Road — small enough that tutors know every
            student&apos;s weak topics by name.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-panel p-6">
          <Wifi className="h-6 w-6 text-gold" />
          <h3 className="pt-2 font-display text-lg font-bold text-white">Live online groups</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Scheduled live sessions with notes after every lesson and the same timed drills as the physical cohorts.
          </p>
        </div>
      </div>
    </div>
  );
}
