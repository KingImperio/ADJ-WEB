"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BouncyAccordionList } from "@/components/bouncy-accordion";
import { useMountedReducedMotion } from "@/lib/use-mounted-motion";

type Track = { slug: string; badge: string; title: string; desc: string; bullets: string[]; foot: string; cta: string; side: string };

export function ProgrammeExplorer({ tracks, catalogue = false }: { tracks: Track[]; catalogue?: boolean }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reduced = useMountedReducedMotion();
  if (!tracks.length) return null;
  const track = tracks[active];
  const select = (index: number, focus = false) => {
    const next = (index + tracks.length) % tracks.length;
    setActive(next);
    tabs.current[next]?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "nearest", inline: "nearest" });
    if (focus) tabs.current[next]?.focus();
  };

  if (catalogue) return (
    <BouncyAccordionList
      className="programme-catalogue"
      defaultValue={tracks[0].slug}
      classNames={{ item: "!rounded-none !border-0 !shadow-none !bg-transparent", trigger: "!px-0 !py-7", title: "!text-inherit !whitespace-normal !overflow-visible", description: "!text-inherit", content: "!px-0" }}
      items={tracks.map((item, i) => ({
        id: item.slug,
        title: <span className="catalogue-title"><span className="catalogue-index">{String(i + 1).padStart(2, "0")}</span><span>{item.title}</span></span>,
        description: <div className="catalogue-detail"><p>{item.desc}</p><div><ul>{item.bullets.map(b => <li key={b}><Check size={17} />{b}</li>)}</ul><Link className="weave-link" href={`/programs/${item.slug}`}>View programme <ArrowUpRight size={19} /></Link></div></div>,
      }))}
    />
  );

  return (
    <div className="programme-browser" aria-roledescription="carousel" aria-label="Academic programmes">
      <div className="programme-tabs" role="tablist" aria-label="Choose a programme">
        {tracks.map((item, index) => <button
          key={item.slug} ref={element => { tabs.current[index] = element; }}
          id={`${id}-tab-${index}`} role="tab" aria-selected={index === active} aria-controls={`${id}-panel`} tabIndex={index === active ? 0 : -1}
          onClick={() => select(index)}
          onKeyDown={event => {
            const next = event.key === "ArrowRight" ? active + 1 : event.key === "ArrowLeft" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? tracks.length - 1 : null;
            if (next !== null) { event.preventDefault(); select(next, true); }
          }}>
          <span>{String(index + 1).padStart(2, "0")}</span>{item.badge}
        </button>)}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="programme-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={track.slug} className="programme-slide" initial={reduced ? false : { x: 22 }} animate={{ x: 0 }} exit={reduced ? undefined : { x: -22 }} transition={{ duration: reduced ? 0 : 0.25 }}>
            <div className="programme-copy">
              <span className="weave-eyebrow">{track.side || track.badge}</span>
              <h3>{track.title}</h3><p>{track.desc}</p>
              <Link href={`/programs/${track.slug}`} className="weave-action">{track.cta} <ArrowUpRight size={20} /></Link>
            </div>
            <div className="programme-syllabus">
              <span className="programme-number" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
              <ul>{track.bullets.map(bullet => <li key={bullet}><Check size={20} /><span>{bullet}</span></li>)}</ul>
              <p>{track.foot}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="programme-controls">
        <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}</span>
        <div className="programme-progress" aria-hidden="true">{tracks.map((item, i) => <span key={item.slug} data-active={i === active} />)}</div>
        <Button variant="outline" size="icon-lg" title="Previous programme" aria-label="Previous programme" onClick={() => select(active - 1)}><ArrowLeft /></Button>
        <Button variant="outline" size="icon-lg" title="Next programme" aria-label="Next programme" onClick={() => select(active + 1)}><ArrowRight /></Button>
      </div>
    </div>
  );
}
