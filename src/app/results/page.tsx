import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { StitchCta, StitchHero, StitchSections } from "@/components/stitch-page";
import { getParentTestimonials, getWall } from "@/lib/content";

/* Results — rebuilt from the Stitch screen "results-matriculation-wall".
   The Wall of Fame is 7 profile cards (portrait, exam badge, score breakdown,
   placement, reg number) and the parent section is 2 testimonial cards; both
   live in stitch-pages.json because the generic extractor kept only names. */

export const metadata: Metadata = {
  title: "Results",
  description:
    "Documented, verifiable admissions outcomes from Igbe-Laara candidates — admission letters uploaded and confirmed on JAMB CAPS.",
};

const tones: Record<string, string> = {
  emerald: "bg-[#ECFDF5] border-secondary text-secondary",
  navy: "bg-[#EFF6FF] border-primary text-primary",
  indigo: "bg-[#EEF2FF] border-[#3730A3] text-[#3730A3]",
  amber: "bg-[#FEF3C7] border-[#B45309] text-[#B45309]",
  neutral: "bg-surface-container border-outline-variant text-primary",
};

type Entry = {
  name: string;
  badge: string;
  tone: string;
  area: string;
  perf: string;
  place: string;
  reg: string;
};
type Testi = { quote: string; initials: string; name: string; detail: string; area: string };

export const revalidate = 300;

export default async function ResultsPage() {
  const [wall, testis] = await Promise.all([getWall(), getParentTestimonials()]);
  return (
    <>
      <StitchHero
        slug="results"
        eyebrow="Documented Verifiable Scores"
        primary={{ label: "Join the Next Cohort", href: "/contact" }}
        secondary={{ label: "Read Parent Feedback", href: "#parents" }}
      />

      {/* Wall of Fame — profile cards, not bare names */}
      {wall.length > 0 && (
        <section className="bg-[#f7f8fd] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <span className="text-label-md font-bold tracking-wider text-secondary uppercase">
                  Class of 2023 / 2024 Honor Roll
                </span>
                <h2 className="mt-1 font-display text-headline-md text-primary md:text-headline-lg">
                  Matriculation Wall of Fame
                </h2>
              </div>
              <p className="max-w-sm text-right text-body-sm text-on-surface-variant max-sm:text-left">
                Students mentored directly at our Banana Estate / Laara study halls in Ikorodu.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wall.map((w, i) => (
                <article
                  key={w.name}
                  className="flex flex-col gap-4 rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_14px_34px_-14px_rgba(26,54,93,0.16)]"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={w.photo_url || `/results/candidate-${i + 1}.jpg`}
                      alt={`${w.name}, ADJ candidate`}
                      width={112}
                      height={112}
                      className="h-14 w-14 rounded-full border border-outline-variant object-cover"
                    />
                    <div>
                      <span
                        className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase ${tones[w.tone]}`}
                      >
                        {w.badge}
                      </span>
                      <div className="mt-1 flex items-center gap-1 text-label-sm text-secondary">
                        <Icon name="verified" className="text-sm" />
                        <span>CAPS Approved</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-headline-sm text-primary">{w.name}</h3>
                    <div className="mt-0.5 flex items-center gap-1 text-body-sm text-on-surface-variant">
                      <Icon name="location_on" className="text-sm text-secondary" />
                      <span>{w.area}</span>
                    </div>
                  </div>
                  <div className="space-y-1 border-t border-outline-variant/40 pt-3 text-body-sm">
                    <p className="font-semibold text-primary">{w.perf}</p>
                    <p className="text-on-surface-variant">{w.place}</p>
                    <p className="text-label-sm tracking-wide text-outline uppercase">{w.reg}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Parent testimonials */}
      {testis.length > 0 && (
        <section className="bg-white py-20" id="parents">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-headline-md text-primary md:text-headline-lg">
              What Ikorodu Parents and Candidates Say
            </h2>
            <p className="mt-3 max-w-2xl text-body-md text-on-surface-variant">
              Real feedback from families in Banana Estate, Igbe-Laara, and Agunfoye regarding our
              coaching rigor and transparent admissions follow-through.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {testis.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e2e7ff] bg-white p-6 shadow-[0_14px_34px_-14px_rgba(26,54,93,0.16)]"
                >
                  <div>
                    <div className="flex gap-0.5 text-secondary" aria-label="5 out of 5 stars">
                      {["star", "star", "star", "star", "star"].map((s, si) => (
                        <Icon key={si} name={s} className="text-base" />
                      ))}
                    </div>
                    <blockquote className="mt-3 text-body-sm text-on-surface-variant italic">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3 border-t border-outline-variant pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-surface">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-label-lg font-bold text-primary">{t.name}</span>
                      <span className="block text-label-sm text-on-surface-variant">{t.detail}</span>
                      <span className="block text-label-sm text-on-surface-variant">{t.area}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <StitchSections slug="results" />
      <StitchCta
        title="Ready to Write Your Matriculation Success Story?"
        copy="Schedule a free diagnostic assessment and admission strategy session at our Igbe-Laara center."
        label="Book Free Diagnostic Assessment"
      />
    </>
  );
}
