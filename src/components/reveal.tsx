"use client";

import { useEffect, useRef, useState } from "react";

/* Scroll-triggered entrance: fades/slides children in once they cross the
   viewport. Keeps the page feeling engineered instead of printed — and
   costs one IO instance per block, no library. */
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    /* Screenshots/crawlers that don't scroll would otherwise leave this
       block invisible forever — reveal on a fallback timer regardless. */
    const t = setTimeout(() => setInView(true), 1600);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
