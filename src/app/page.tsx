import Link from "next/link";
import Image from "next/image";
import { ConsultationForm } from "@/components/consultation-form";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { BrandMotionBackdrop } from "@/components/brand-motion-backdrop";
import { MotionCascade } from "@/components/motion-cascade";
import { site } from "@/lib/site";
import {
  getCatchments,
  getDirections,
  getHomeTestimonials,
  getMetrics,
  getPillars,
  getTracks,
} from "@/lib/content";

/* ADJ homepage — round-and-bold modern pass.
   One serif voice, navy/emerald moments alternating by fold, every card a
   held, soft-shadowed surface, no hairline separators. Stitch copy intact. */

const badgeTones: Record<string, string> = {
  emerald: "bg-[#ECFDF5] border-[#006c48] text-[#006c48]",
  navy: "bg-[#EFF6FF] border-[#1a365d] text-[#1a365d]",
  indigo: "bg-[#EEF2FF] border-[#3730A3] text-[#3730A3]",
  amber: "bg-[#FEF3C7] border-[#B45309] text-[#B45309]",
  neutral: "bg-[#eaedff] border-[#c4c6cf] text-[#1a365d]",
};

export const revalidate = 300;

export default async function Home() {
  const [tracks, pillars, metrics, catchments, directions, results] = await Promise.all([
    getTracks(),
    getPillars(),
    getMetrics(),
    getCatchments(),
    getDirections(),
    getHomeTestimonials(),
  ]);
  return (
    <>
      {/* 1 — Hero: full navy fold */}
      <section className="relative overflow-hidden bg-[#0B237F]">
        <BrandMotionBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <MotionCascade className="space-y-7 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5A11E]/35 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-[#D5A11E] shadow-[0_0_14px_rgba(213,161,30,.75)]" />
                <span className="text-[11px] font-bold tracking-[0.14em] text-[#F5E5B5] uppercase">
                  Igbe-Laara, Ikorodu Hub
                </span>
              </div>
              <h1 className="text-[40px] leading-[1.05] font-bold tracking-tight text-white md:text-[64px]">
                Ikorodu&rsquo;s Home for Exam Success &amp; Admission Certainty
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/75">
                Rigorous, distraction-free physical classrooms in Laara and live group tutorials for
                students across Lagos. We don&rsquo;t abandon you after scores drop—we mentor
                candidates until full university matriculation.
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D5A11E] px-7 py-4 text-base font-bold text-[#101A3D] shadow-[0_18px_40px_-12px_rgba(213,161,30,.62)] transition-all hover:-translate-y-0.5 hover:bg-[#e5b532] active:scale-95"
                >
                  <span>Book Free Diagnostic Assessment</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </Link>
                <Link
                  href="#programmes"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Explore Our 6 Academic Tracks
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-7">
                {metrics.map((m) => (
                  <div key={m.label} className="border-l-4 border-[#D5A11E] pl-3">
                    <span className="block text-3xl font-bold text-white tabular-nums lg:text-4xl">
                      {m.value}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.12em] text-white/65 uppercase">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionCascade>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] bg-white p-3 shadow-[0_32px_80px_-20px_rgba(0,32,69,0.55)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/hero-classroom.jpg"
                    alt="Students in a tutorial classroom in Ikorodu, Lagos"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-xl bg-[#1a365d]/90 p-3 backdrop-blur">
                    <div>
                      <div className="text-[11px] font-bold tracking-wider text-[#98f6c5] uppercase">
                        2025/2026 Cohort Underway
                      </div>
                      <div className="text-sm font-bold text-white">Igbe-Laara Main Facility</div>
                    </div>
                    <span className="rounded-full bg-[#006c48] px-2.5 py-1 text-[10px] font-bold text-white">
                      ADMISSIONS OPEN
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#f2f3ff] p-3">
                    <span className="block text-[11px] text-[#43474e]">Class Structure</span>
                    <span className="text-sm font-bold text-[#002045]">Strict Small Groups</span>
                  </div>
                  <div className="rounded-xl bg-[#f2f3ff] p-3">
                    <span className="block text-[11px] text-[#43474e]">CBT Drill Lab</span>
                    <span className="text-sm font-bold text-[#006c48]">Realistic Simulated UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Score ticker */}
      <div className="overflow-hidden border-y border-[#c4c6cf]/40 bg-white py-3.5">
        <div className="flex w-max animate-[marquee-x_22s_linear_infinite] gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-10">
              {[
                "UTME: 326 · Medicine, UNILAG",
                "WAEC: 8 Distinctions · FUTA",
                "JUPEB: 15 Points · LASU Law",
                "UTME: 342 · Mechanical Eng, UNILAG",
                "100% CAPS Clearance Record",
                "Direct 200L Entry · OAU Pharmacy",
              ].map((t) => (
                <span key={t} className="text-sm font-bold tracking-wide text-[#1a365d]">
                  {t} <span className="mx-4 text-[#006c48]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2 — Partnership */}
      <section className="bg-[#f7f8fd] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex items-center gap-2">
            <Icon name="verified" className="text-xl text-[#006c48]" />
            <span className="text-sm font-bold tracking-wider text-[#002045] uppercase">
              Institutional Synergy
            </span>
          </div>
          <p className="max-w-2xl text-sm text-[#43474e]">
            In official academic delivery partnership with{" "}
            <span className="font-bold text-[#002045]">{site.partner.name}</span> ({site.partner.area}).
          </p>
        </div>
      </section>

      {/* 3 — Why ADJ */}
      <section className="py-20" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#006c48] uppercase">
                Our Pedagogical Code
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[#002045] md:text-5xl">
                Why Ikorodu Families Trust ADJ Over Casual Tutorial Centers
              </h2>
              <p className="text-lg text-[#43474e]">
                Old-school academic discipline, modern admissions counseling. Zero shortcuts. 100%
                accountability.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_14px_34px_-14px_rgba(26,54,93,0.16)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(26,54,93,0.2)]">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
                      p.tone === "secondary" ? "bg-[#006c48]/10 text-[#006c48]" : "bg-[#e2e7ff] text-[#1a365d]"
                    }`}
                  >
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="text-lg font-bold text-[#002045]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#43474e]">{p.copy}</p>
                  <p className="mt-auto text-[11px] font-bold tracking-wider text-[#006c48] uppercase">
                    {p.tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Tracks: varied card sizes */}
      <section className="bg-[#f7f8fd] py-20" id="programmes">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#006c48] uppercase">
                  Academic Syllabus Tracks
                </span>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-[#002045] md:text-5xl">
                  Proven Preparatory Frameworks
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#006c48] hover:underline"
              >
                Download Detailed Syllabus Outline
                <Icon name="download" className="text-lg" />
              </Link>
            </div>
          </Reveal>

          {/* Featured wide card: first track */}
          {tracks[0] && (
            <Reveal>
              <article className="group relative mb-5 grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-[#dce2f2] bg-white p-7 shadow-[0_14px_34px_-14px_rgba(11,35,127,.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D5A11E]/55 hover:shadow-[0_26px_60px_-22px_rgba(11,35,127,.28)] md:grid-cols-2">
                <span className="pointer-events-none absolute -right-24 -top-28 h-56 w-56 rounded-full bg-[#D5A11E]/10 transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
                <div className="space-y-4">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${badgeTones[tracks[0].tone]}`}>
                    {tracks[0].badge}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#002045]">{tracks[0].title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#43474e]">{tracks[0].desc}</p>
                  <p className="text-xs font-bold tracking-wider text-[#1a365d] uppercase">
                    {tracks[0].foot}
                  </p>
                </div>
                <ul className="space-y-3 self-center">
                  {tracks[0].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[#131b2e]">
                      <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-[#006c48]" />
                      {b}
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      href={`/programs/${tracks[0].slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#006c48] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#005236] active:scale-95"
                    >
                      {tracks[0].cta}
                      <Icon name="arrow_forward" className="text-base" />
                    </Link>
                  </li>
                </ul>
              </article>
            </Reveal>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tracks.slice(1).map((t, i) => (
              <Reveal key={t.slug} delay={i * 60}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce2f2] bg-white p-6 shadow-[0_14px_34px_-14px_rgba(11,35,127,.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D5A11E]/55 hover:shadow-[0_24px_48px_-16px_rgba(11,35,127,.24)]">
                  <span className="pointer-events-none absolute -right-12 -top-14 h-28 w-28 rounded-full bg-[#D5A11E]/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#D5A11E]/10" aria-hidden="true" />
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${badgeTones[t.tone]}`}>
                      {t.badge}
                    </span>
                    <span className="text-[11px] text-[#43474e]">{t.side}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-[#002045]">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#43474e]">{t.desc}</p>
                  <ul className="mt-4 space-y-2 border-t border-[#e2e7ff]/60 pt-4">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-[#131b2e]">
                        <Icon name="check" className="mt-0.5 shrink-0 text-sm text-[#006c48]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="text-[11px] font-bold text-[#1a365d] uppercase">{t.foot}</span>
                    <Link
                      href={`/programs/${t.slug}`}
                      className="rounded-full bg-[#002045] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#1a365d] active:scale-95"
                    >
                      {t.cta}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Catchment: dark fold */}
      <section className="bg-[#002045] py-20" id="catchment">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#98f6c5] uppercase">
                Community Roots &amp; Accessibility
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Easily Accessible Across Ikorodu Division
              </h2>
              <p className="mt-4 max-w-lg text-base text-[#adc7f7]">
                Our campus in Banana Estate / Laara sits at the nexus of major transport arteries. We
                welcome daily commuting students and provide synchronous virtual streaming for
                learners across greater Lagos.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {catchments.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Icon name="pin_drop" className="text-sm text-[#98f6c5]" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                <Icon name="directions_bus" className="text-[#98f6c5]" />
                Directions &amp; Landmarks
              </h3>
              <ul className="mt-5 space-y-4">
                {directions.map((d) => (
                  <li key={d.from} className="flex items-start gap-3">
                    <Icon name="check_circle" className="mt-0.5 shrink-0 text-base text-[#98f6c5]" />
                    <span className="text-sm leading-relaxed text-[#adc7f7]">
                      <strong className="text-white">{d.from}</strong> {d.copy}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Results */}
      <section className="py-20" id="results">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#006c48] uppercase">
                Documented Verifiable Scores
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[#002045] md:text-5xl">
                From Laara to Nigeria&rsquo;s Premier Universities
              </h2>
              <p className="text-lg text-[#43474e]">
                Our candidates do not just score high; their admission letters are officially
                uploaded and verified on JAMB CAPS.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {results.map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <figure className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_14px_34px_-14px_rgba(26,54,93,0.16)]">
                  <div>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${badgeTones[r.tone] ?? badgeTones.emerald}`}>
                      {r.badge}
                    </span>
                    <blockquote className="mt-4 text-[15px] leading-relaxed text-[#43474e] italic">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-[#e2e7ff]/60 pt-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a365d] text-xs font-bold text-white">
                      {r.initials}
                    </span>
                    <span>
                      <span className="block font-bold text-[#002045]">{r.name}</span>
                      <span className="block text-xs text-[#43474e]">{r.detail}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Booking */}
      <ConsultationForm />
    </>
  );
}
