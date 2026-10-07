import { createClient } from "@supabase/supabase-js";
import base from "@/lib/stitch-data.json";
import programBase from "@/lib/stitch-programs.json";
import pageBase from "@/lib/stitch-pages.json";
import { site } from "@/lib/site";

/* Live content layer. Every getter reads its Supabase table and falls back
   to the bundled JSON (or site.ts) when the database is unreachable or the
   env is absent — the site never breaks when the DB is down. Tables are
   edited in the ADJ-ADMIN dashboard; rows land here within ~5 minutes
   (revalidate) or on the next deploy. */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const live = url && key ? createClient(url, key) : null;

async function rows<T>(t: string, order: string): Promise<T[] | null> {
  if (!live) return null;
  try {
    const { data, error } = await live.from(t).select("*").order(order).limit(200);
    if (error || !data || data.length === 0) return null;
    return data as T[];
  } catch {
    return null;
  }
}

async function one<T>(t: string, col: string, val: string): Promise<T | null> {
  if (!live) return null;
  try {
    const { data, error } = await live.from(t).select("*").eq(col, val).single();
    if (error || !data) return null;
    return data as T;
  } catch {
    return null;
  }
}

/* Revalidate window for content reads (seconds). */
/* Store a new booking request. Fire-and-forget from the client; never rejects
   the WhatsApp handoff. Public insert-only RLS on the table. */
export async function insertSubmission(row: {
  name: string;
  phone: string;
  exam: string;
  level: string;
  mode: string;
  notes: string;
  source: string;
}) {
  if (!live) return;
  try {
    await live.from("consultation_submissions").insert(row);
  } catch {
    /* swallow — booking must always continue to WhatsApp */
  }
}

export const CONTENT_REVALIDATE = 300;

interface Track {
  slug: string;
  badge: string;
  tone: string;
  side: string;
  title: string;
  desc: string;
  bullets: string[];
  foot: string;
  cta: string;
}
export async function getTracks(): Promise<Track[]> {
  const r = await rows<Record<string, string | string[]>>("tracks", "sort");
  if (!r) return base.tracks as unknown as Track[];
  return r.map((t) => ({
    slug: String(t.slug),
    badge: String(t.badge),
    tone: String(t.tone),
    side: String(t.side ?? ""),
    title: String(t.title),
    desc: String(t.description ?? ""),
    bullets: (t.bullets ?? []) as string[],
    foot: String(t.foot_label ?? ""),
    cta: String(t.cta_label ?? "Enroll"),
  }));
}

interface Pillar {
  icon: string;
  title: string;
  copy: string;
  tag: string;
  tagIcon: string;
  tone: string;
}
export async function getPillars(): Promise<Pillar[]> {
  const r = await rows<Record<string, string>>("pillars", "sort");
  if (!r) return base.pillars as unknown as Pillar[];
  return r.map((p) => ({
    icon: p.icon,
    title: p.title,
    copy: p.copy,
    tag: p.tag,
    tagIcon: p.tag_icon,
    tone: p.tone,
  }));
}

export async function getMetrics() {
  const r = await rows<{ value: string; label: string; accent: string }>("metrics", "sort");
  return r ?? (base.metrics as { value: string; label: string; accent: string }[]);
}

export async function getCatchments(): Promise<string[]> {
  const r = await rows<{ name: string }>("catchments", "sort");
  const names = r ? r.map((c) => c.name) : (base.catchments as string[]);
  return names.map((name) =>
    /^Igbe[- ]Laara Main Hub$/i.test(name) ? "Lagos, Nigeria" : name,
  );
}

export async function getDirections() {
  const r = await rows<{ heading: string; copy: string }>("directions", "sort");
  if (!r) return base.directions as { from: string; copy: string }[];
  return r.map((d) => ({ from: d.heading, copy: d.copy }));
}

interface HomeTesti {
  badge: string;
  tag: string;
  quote: string;
  initials: string;
  name: string;
  detail: string;
  tone: string;
}
export async function getHomeTestimonials(): Promise<HomeTesti[]> {
  const fallback = base.results as unknown as HomeTesti[];
  const r = await rows<Record<string, string>>("testimonials", "sort");
  if (!r) return fallback;
  const home = r.filter((t) => t.scope === "home");
  if (!home.length) return fallback;
  const extra = new Map(fallback.map((f) => [f.name, f]));
  return home.map((t) => ({
    badge: extra.get(t.name)?.badge ?? "",
    tag: extra.get(t.name)?.tag ?? "",
    quote: t.quote.replace(/^“|”$/g, ""),
    initials: t.initials,
    name: t.name,
    detail: t.detail,
    tone: extra.get(t.name)?.tone ?? "emerald",
  }));
}

interface WallEntry {
  name: string;
  badge: string;
  tone: string;
  area: string;
  perf: string;
  place: string;
  reg: string;
  photo_url: string;
}
export async function getWall(): Promise<WallEntry[]> {
  const r = await rows<WallEntry>("wall_entries", "sort");
  return r ?? ((pageBase as unknown as Record<string, { wall: WallEntry[] }>).results.wall as WallEntry[]);
}

interface ParentTesti {
  quote: string;
  initials: string;
  name: string;
  detail: string;
  area: string;
}
export async function getParentTestimonials(): Promise<ParentTesti[]> {
  const r = await rows<Record<string, string>>("testimonials", "sort");
  if (!r) return (pageBase as unknown as Record<string, { testis: ParentTesti[] }>).results.testis;
  const parents = r.filter((t) => t.scope === "parents");
  if (!parents.length)
    return (pageBase as unknown as Record<string, { testis: ParentTesti[] }>).results.testis;
  return parents.map((t) => ({
    quote: t.quote,
    initials: t.initials,
    name: t.name,
    detail: t.detail,
    area: t.area,
  }));
}

interface Blocks {
  title: string;
  blocks: {
    t: "p" | "h3" | "h4" | "list" | "table";
    v: string | string[] | { head: string[]; rows: string[][] };
  }[];
}
interface ProgramPage {
  h1: string;
  lead: string;
  sections: Blocks[];
  stats: { numbers: string[]; labels: string[] };
}

function broadenLocationCopy<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(/Igbe[- ]Laara(?:,\s*Ikorodu)?/gi, "Lagos, Nigeria")
      .replace(/Ikorodu\s+Division/gi, "Lagos") as T;
  }
  if (Array.isArray(value)) return value.map(broadenLocationCopy) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, broadenLocationCopy(entry)]),
    ) as T;
  }
  return value;
}

export async function getProgramPage(slug: string): Promise<ProgramPage | null> {
  const key_ = slug === "neco" ? "waec" : slug;
  const r = await one<ProgramPage>("program_pages", "slug", key_);
  const all = programBase as unknown as Record<string, ProgramPage>;
  const page = r ? (r as unknown as ProgramPage) : (all[key_] ?? null);
  return page
    ? { ...page, h1: broadenLocationCopy(page.h1), lead: broadenLocationCopy(page.lead) }
    : null;
}

export async function getPageSections(page: string) {
  const r = await one<{ h1: string; lead: string; sections: Blocks[] }>(
    "page_sections",
    "page",
    page,
  );
  const all = pageBase as unknown as Record<string, { h1: string; lead: string; sections: Blocks[] }>;
  const content = r
    ? (r as unknown as { h1: string; lead: string; sections: Blocks[] })
    : (all[page] ?? null);
  if (!content) return null;

  return {
    ...content,
    h1: broadenLocationCopy(content.h1),
    lead: broadenLocationCopy(content.lead),
    sections: page === "contact" ? content.sections : broadenLocationCopy(content.sections),
  };
}

/* Contact lines. The admin edits values; the site keeps working if the DB
   is unreachable by falling back to site.ts. */
export async function getContact() {
  const r = await rows<{ key: string; value: string }>("site_settings", "key");
  if (!r) return site;
  const get = (k: string, fb: string) => r.find((s) => s.key === k)?.value ?? fb;
  return {
    ...site,
    phoneDisplay: get("phone_display", site.phoneDisplay),
    phoneHref: get("phone_href", site.phoneHref),
    whatsapp: get("whatsapp", site.whatsapp),
    email: get("email", site.email),
    hours: get("hours", site.hours),
  };
}
