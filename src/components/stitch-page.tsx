import { Icon } from "@/components/icon";
import { getPageSections } from "@/lib/content";
import { BrandMotionBackdrop } from "@/components/brand-motion-backdrop";
import { MotionCascade } from "@/components/motion-cascade";

type Table = { head: string[]; rows: string[][] };
type Block = { t: "p" | "h3" | "h4" | "list" | "table"; v: string | string[] | Table };


/* A run of heading+paragraph pairs is a card grid in the reference screens
   (FAQ tiles, pillar cards, wall-of-fame entries). Collapse each run into one
   block so it renders as cards instead of loose prose. */
type Grouped = { t: "cards"; v: { h: string; p: string }[] };

function group(blocks: Block[]): (Block | Grouped)[] {
  const out: (Block | Grouped)[] = [];
  let run: { h: string; p: string }[] = [];
  const flush = () => {
    // Only promote a run to cards when the entries read as real cards (long
    // body copy). Otherwise emit the pairs flat so nothing renders an object.
    const real = run.filter((c) => c.p.length > 60);
    if (real.length > 1) {
      out.push({ t: "cards", v: real });
    } else {
      for (const c of run) {
        out.push({ t: "h3", v: c.h });
        out.push({ t: "p", v: c.p });
      }
    }
    run = [];
  };
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const nxt = blocks[i + 1];
    if (b.t === "h3" && nxt?.t === "p") {
      run.push({ h: b.v as string, p: nxt.v as string });
      i++;
      continue;
    }
    flush();
    out.push(b);
  }
  flush();
  return out;
}

/* Shared renderer for the Stitch index/utility pages (programmes, about,
   results, contact). Those four screens differ in hero furniture and closing
   CTA but share the same body rhythm, so the sections are rendered here and
   each page only supplies its own hero. */
export async function StitchSections({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  const page = await getPageSections(slug);
  if (!page) return null;
  const sectionStyles: Record<string, string[]> = {
    programmes: ["bg-white", "bg-[#f4f6fc]"],
    about: ["bg-[#f7f9ff]", "bg-white"],
    results: ["bg-[#0B237F] text-white", "bg-[#fbfcff]"],
    contact: ["bg-[#fffaf0]", "bg-white"],
  };
  const cardStyles: Record<string, string> = {
    programmes: "border-[#dce2f2] bg-white shadow-[0_18px_45px_-26px_rgba(11,35,127,.35)]",
    about: "border-[#e7e1d0] bg-[#fffdf7] shadow-[0_18px_45px_-28px_rgba(120,88,10,.25)]",
    results: "border-white/15 bg-white/10 backdrop-blur-sm",
    contact: "border-[#eadfbf] bg-white shadow-[0_18px_45px_-28px_rgba(120,88,10,.22)]",
  };
  const palette = sectionStyles[slug] ?? sectionStyles.programmes;
  return (
    <>
      {children}
      {page.sections.map((s, si) => (
        <section
          key={s.title}
          className={`py-16 lg:py-24 ${
            `${palette[si % palette.length]} ${si > 0 ? "border-t border-[#dce2f2]" : ""}`
          }`}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-6">
              <h2 className={`font-display text-headline-md md:text-headline-lg ${slug === "results" && si % 2 === 0 ? "text-white" : "text-[#0B237F]"}`}>{s.title}</h2>
              <span className="hidden h-px flex-1 bg-[#D5A11E]/40 sm:block" aria-hidden="true" />
            </div>
            <div className="mt-8 space-y-8">
              {group(s.blocks).map((b, bi) => {
                if (b.t === "cards") {
                  const cards = b.v as { h: string; p: string }[];
                  return (
                    <div key={bi} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {cards.map((c) => (
                        <div
                          key={c.h}
                          className={`rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 ${cardStyles[slug] ?? cardStyles.programmes}`}
                        >
                          <h3 className="font-display text-headline-sm text-primary">{c.h}</h3>
                          <p className={`mt-3 leading-relaxed text-body-sm ${slug === "results" && si % 2 === 0 ? "text-white/75" : "text-[#48516c]"}`}>{c.p}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (b.t === "h3")
                  return (
                    <h3 key={bi} className="font-display text-headline-sm text-primary">
                      {b.v as string}
                    </h3>
                  );
                if (b.t === "h4")
                  return (
                    <h4
                      key={bi}
                      className="border-l-4 border-secondary pl-3 font-display text-headline-sm text-primary"
                    >
                      {b.v as string}
                    </h4>
                  );
                if (b.t === "table") {
                  const t = b.v as Table;
                  return (
                    <div key={bi} className="overflow-x-auto rounded-3xl border border-[#e2e7ff] shadow-[0_14px_34px_-14px_rgba(26,54,93,0.16)]">
                      <table className="w-full min-w-[720px] border-collapse text-left">
                        <thead>
                          <tr className="bg-surface-container-high">
                            {t.head.map((cell, ci) => (
                              <th
                                key={ci}
                                className="border-b border-outline-variant px-4 py-3 text-label-md text-primary"
                              >
                                {cell}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {t.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-outline-variant/40 last:border-0">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`px-4 py-3 text-body-sm ${
                                    ci === 0
                                      ? "font-semibold text-primary"
                                      : "text-on-surface-variant"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (b.t === "list")
                  return (
                    <ul key={bi} className="space-y-3">
                      {(b.v as string[]).map((li, li2) => (
                        <li key={li2} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                          <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-secondary" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  );
                return (
                    <p key={bi} className={`leading-relaxed text-body-md ${slug === "results" && si % 2 === 0 ? "text-white/80" : "text-[#48516c]"}`}>
                    {b.v as string}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

/* Closing CTA shared by the four index pages. */
export function StitchCta({
  eyebrow = "Start Your Preparation Today",
  title,
  copy,
  label,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  label: string;
}) {
  return (
    <section className="border-t border-white/10 bg-[#002045] py-20" id="consultation">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-outline bg-surface-container-lowest p-8 text-center shadow-md sm:p-12">
          <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">{eyebrow}</span>
          <h2 className="mt-2 font-display text-headline-md text-primary md:text-headline-lg">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-on-surface-variant">{copy}</p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded bg-secondary px-8 py-4 text-label-lg font-bold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container active:scale-95"
          >
            <span>{label}</span>
            <Icon name="arrow_forward" className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* Hero used by the four index pages: eyebrow, serif h1, lead, two CTAs. */
export async function StitchHero({
  slug,
  eyebrow,
  primary,
  secondary,
}: {
  slug: string;
  eyebrow: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const page = await getPageSections(slug);
  if (!page) return null;
  return (
    <section className={`relative overflow-hidden py-20 ${slug === "results" ? "bg-[#071858]" : slug === "contact" ? "bg-[#0B237F]" : "bg-[#0B237F]"}`}>
      <BrandMotionBackdrop compact />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionCascade className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#98f6c5]/30 bg-white/10 px-3.5 py-1.5">
            <span className="size-2 rounded-full bg-[#D5A11E]" />
            <span className="text-[11px] font-bold tracking-[0.14em] text-[#F5E5B5] uppercase">{eyebrow}</span>
          </div>
          <h1 className="text-[40px] leading-[1.05] font-bold tracking-tight text-white md:text-6xl">
            {page.h1}
          </h1>
          {page.lead && (
            <p className="text-lg leading-relaxed text-white/75">{page.lead}</p>
          )}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <a
              href={primary.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D5A11E] px-6 py-3.5 text-label-lg font-bold text-[#101A3D] shadow-[0_10px_30px_-12px_rgba(213,161,30,.9)] transition-all hover:bg-[#e5b532] active:scale-95"
            >
              <span>{primary.label}</span>
              <Icon name="arrow_forward" className="text-lg" />
            </a>
            <a
              href={secondary.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </a>
          </div>
        </MotionCascade>
      </div>
    </section>
  );
}
