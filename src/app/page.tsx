import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";
import data from "@/lib/stitch-data.json";

/* Homepage per the Stitch system (project 4716569519546531997, screen
   "Homepage"). Section order and copy are taken from the generated reference
   HTML in docs/stitch-reference/homepage.html. */

/* Exam-badge tones are hardcoded in the Stitch source rather than derived from
   the theme, so they are mapped here. */
const tones: Record<string, string> = {
  emerald: "bg-[#ECFDF5] border-secondary text-secondary",
  navy: "bg-[#EFF6FF] border-primary text-primary",
  indigo: "bg-[#EEF2FF] border-[#3730A3] text-[#3730A3]",
  amber: "bg-[#FEF3C7] border-[#B45309] text-[#B45309]",
  neutral: "bg-surface-container border-outline-variant text-primary",
};
const accent: Record<string, string> = {
  secondary: "border-l-4 border-secondary",
  primary: "border-l-4 border-primary",
  tertiary: "border-l-4 border-secondary-container",
};

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden border-b border-outline-variant bg-surface pt-8 pb-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-surface-container px-3 py-1">
                <span className="size-2 rounded-full bg-secondary" />
                <span className="text-label-sm tracking-wider text-secondary uppercase">
                  Igbe-Laara, Ikorodu Hub &amp; Interactive Digital Campus
                </span>
              </div>
              <h1 className="text-headline-lg-mobile font-display text-primary tracking-tight md:text-display-lg">
                Ikorodu&rsquo;s Home for Exam Success &amp; Admission Certainty
              </h1>
              <p className="max-w-2xl leading-relaxed text-body-md text-on-surface-variant md:text-body-lg">
                Rigorous, distraction-free physical classrooms in Laara and live group tutorials for
                students across Lagos. We don&rsquo;t abandon you after scores drop—we mentor
                candidates until full university matriculation.
              </p>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded bg-secondary px-6 py-3.5 text-label-lg font-bold text-on-secondary shadow-sm transition-all hover:bg-on-secondary-container active:scale-95"
                >
                  <span>Book Free Diagnostic Assessment</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </Link>
                <Link
                  href="#programmes"
                  className="inline-flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface-container-lowest px-6 py-3.5 text-label-lg font-bold text-primary transition-all hover:bg-surface-container"
                >
                  <span>Explore Our 6 Academic Tracks</span>
                  <Icon name="menu_book" className="text-lg" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/60 pt-6">
                {data.metrics.map((m) => (
                  <div key={m.label} className={`pl-3 ${accent[m.accent]}`}>
                    <span className="block text-2xl font-bold text-primary lg:text-3xl">{m.value}</span>
                    <span className="text-label-sm tracking-wider text-outline uppercase">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-primary-container">
                  <Image
                    src="/hero-classroom.jpg"
                    alt="Secondary and post-secondary students studying together in a well-lit tutorial classroom in Ikorodu, Lagos"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover opacity-90 mix-blend-luminosity"
                  />
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between rounded border border-outline/30 bg-primary/95 p-3 backdrop-blur">
                    <div>
                      <div className="text-label-sm text-secondary-fixed">2025/2026 Cohort Underway</div>
                      <div className="text-body-sm font-bold text-surface">Igbe-Laara Main Facility</div>
                    </div>
                    <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-on-secondary">
                      ADMISSIONS OPEN
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                  <div className="rounded border border-outline-variant/50 bg-surface-container p-3">
                    <span className="block text-label-sm text-on-surface-variant">Class Structure</span>
                    <span className="text-body-sm font-bold text-primary">Strict Small Groups</span>
                  </div>
                  <div className="rounded border border-outline-variant/50 bg-surface-container p-3">
                    <span className="block text-label-sm text-on-surface-variant">CBT Drill Lab</span>
                    <span className="text-body-sm font-bold text-secondary">Realistic Simulated UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Partnership banner */}
      <aside className="border-y border-outline-variant bg-surface-container-high py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex items-center gap-2">
            <Icon name="verified" className="text-xl text-secondary" />
            <span className="text-label-md font-bold tracking-wider text-primary uppercase">
              Institutional Synergy:
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            In official academic delivery partnership with{" "}
            <span className="font-bold text-primary">{site.partner.name}</span> ({site.partner.area}).
          </p>
        </div>
      </aside>

      {/* 3 — Core pillars */}
      <section className="bg-surface-container-lowest py-16 lg:py-24" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
            <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
              Our Pedagogical Code
            </span>
            <h2 className="font-display text-headline-md text-primary md:text-headline-lg">
              Why Ikorodu Families Trust ADJ Over Casual Tutorial Centers
            </h2>
            <p className="text-body-md text-on-surface-variant">
              We combine old-school academic discipline with strategic modern admissions counseling.
              Zero shortcuts. 100% academic accountability.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.pillars.map((p) => (
              <div
                key={p.title}
                className="space-y-4 rounded-xl border border-outline-variant bg-surface p-6 transition-all hover:border-outline"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded ${
                    p.tone === "secondary" ? "bg-secondary/10 text-secondary" : "bg-surface-container-highest text-primary"
                  }`}
                >
                  <Icon name={p.icon} className="text-2xl" />
                </div>
                <h3 className="font-display text-headline-sm text-primary">{p.title}</h3>
                <p className="leading-relaxed text-body-sm text-on-surface-variant">{p.copy}</p>
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center gap-1 text-label-sm font-bold ${
                      p.tag === "Ethical Integrity" ? "text-outline" : "text-secondary"
                    }`}
                  >
                    <span>{p.tag}</span>
                    <Icon name={p.tagIcon} className="text-sm" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Six programme tracks */}
      <section className="border-t border-outline-variant bg-surface py-16 lg:py-24" id="programmes">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
                Academic Syllabus Tracks
              </span>
              <h2 className="mt-1 font-display text-headline-md text-primary md:text-headline-lg">
                Proven Preparatory Frameworks
              </h2>
              <p className="mt-2 max-w-xl text-body-md text-on-surface-variant">
                From secondary school completion to international graduate admissions, select your
                target examination track.
              </p>
            </div>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-label-lg font-bold text-secondary hover:text-on-secondary-container"
              >
                <span>Download Detailed Syllabus Outline</span>
                <Icon name="download" className="text-lg" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.tracks.map((t) => (
              <article
                key={t.slug}
                className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all hover:border-outline hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase ${tones[t.tone]}`}
                    >
                      {t.badge}
                    </span>
                    <span className="text-label-sm text-on-surface-variant">{t.side}</span>
                  </div>
                  <h3 className="font-display text-headline-sm text-primary">{t.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{t.desc}</p>
                  <ul className="space-y-2 border-t border-outline-variant/40 pt-3 text-body-sm text-on-surface">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <Icon name="check" className="text-sm text-secondary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-outline-variant/60 pt-6">
                  <span className="text-label-sm font-bold text-primary">{t.foot}</span>
                  <Link
                    href={`/programs/${t.slug}`}
                    className={`rounded px-3 py-1.5 text-label-sm font-bold transition-colors ${
                      t.cta === "Enroll"
                        ? "bg-secondary text-on-secondary hover:bg-on-secondary-container"
                        : "bg-primary text-on-primary hover:bg-primary-container"
                    }`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Catchment accessibility */}
      <section className="border-t border-outline-variant bg-surface-container-low py-16" id="catchment">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm lg:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-6">
                <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
                  Community Roots &amp; Accessibility
                </span>
                <h2 className="font-display text-headline-md text-primary">
                  Easily Accessible Across Ikorodu Division
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Our campus in Banana Estate / Laara sits at the nexus of major transport arteries.
                  We welcome daily commuting students and provide synchronous virtual streaming for
                  learners across greater Lagos.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {data.catchments.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/60 bg-surface-container px-3 py-1.5 text-label-sm text-primary"
                    >
                      <Icon name="pin_drop" className="text-base text-secondary" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-outline-variant bg-surface-container p-6 lg:col-span-6">
                <h3 className="flex items-center gap-2 font-display text-headline-sm text-primary">
                  <Icon name="directions_bus" className="text-secondary" />
                  <span>Directions &amp; Landmarks</span>
                </h3>
                <ul className="space-y-3 text-body-sm text-on-surface-variant">
                  {data.directions.map((d) => (
                    <li key={d.from} className="flex items-start gap-2">
                      <Icon name="check_circle" className="mt-0.5 text-base text-secondary" />
                      <span>
                        <strong>{d.from}</strong> {d.copy}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Results */}
      <section className="border-t border-outline-variant bg-surface-container-lowest py-16 lg:py-24" id="results">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
            <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
              Documented Verifiable Scores
            </span>
            <h2 className="font-display text-headline-md text-primary md:text-headline-lg">
              From Laara to Nigeria&rsquo;s Premier Universities
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Our candidates do not just score high; their admission letters are officially uploaded
              and verified on JAMB CAPS.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.results.map((r) => (
              <div
                key={r.name}
                className="flex flex-col justify-between space-y-4 rounded-xl border border-outline-variant bg-surface p-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase ${tones[r.tone]}`}
                    >
                      {r.badge}
                    </span>
                    <span className="text-label-sm text-outline">{r.tag}</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant italic">&ldquo;{r.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-surface ${
                      r.tone === "emerald" ? "bg-secondary" : r.tone === "indigo" ? "bg-primary-container" : "bg-primary"
                    }`}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="text-label-lg font-bold text-primary">{r.name}</div>
                    <div className="text-label-sm text-on-surface-variant">{r.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Consultation booking */}
      <section className="border-t border-outline-variant bg-surface py-16 lg:py-24" id="consultation">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-outline bg-surface-container-lowest p-8 shadow-md sm:p-12">
            <div className="mb-8 space-y-2 text-center">
              <span className="text-label-sm font-bold tracking-widest text-secondary uppercase">
                Start Your Preparation Today
              </span>
              <h2 className="font-display text-headline-md text-primary md:text-headline-lg">
                Book Your Free Diagnostic Assessment
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Meet our academic directors in Laara or schedule an online video consultation. Zero
                fees, zero obligation.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field id="fullName" label="Full Name of Student / Parent *" placeholder="e.g. Adebayo Ibrahim" type="text" />
                <Field id="phone" label="WhatsApp / Phone Number *" placeholder="e.g. 0801 234 5678" type="tel" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Choice
                  id="targetExam"
                  label="Target Examination *"
                  items={["JAMB / UTME Clinic", "WAEC / NECO Intensive", "JUPEB Direct Entry", "IELTS / SAT Prep", "CAPS Admissions Advisory", "CBT Simulator Lab Only"]}
                />
                <Choice
                  id="studentLevel"
                  label="Current Level *"
                  items={["Current SS3 Student", "Secondary School Graduate", "Rewriting Exam", "University Aspirant", "Inquiring Parent"]}
                />
                <Choice
                  id="studyMode"
                  label="Preferred Attendance *"
                  items={["Physical Center (Laara, Ikorodu)", "Live Interactive Online (Zoom)", "Hybrid (Weekdays + Online)"]}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="notes" className="block text-label-md text-primary">
                  Intended Course &amp; First-Choice University (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full rounded border border-outline-variant bg-surface px-3.5 py-2.5 text-body-md text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
                  placeholder="e.g. Target: Accounting at University of Lagos. Previous UTME: 218. Need help with Economics and Accounts."
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-secondary px-8 py-4 text-label-lg font-bold text-on-secondary shadow-md transition-all hover:bg-on-secondary-container active:scale-95 sm:w-auto"
                >
                  <span>Confirm Diagnostic Booking</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </button>
                <p className="mt-2 text-center text-[12px] text-on-surface-variant sm:text-left">
                  * Privacy Guarantee: We do not share student contact details. A consultant will
                  reach out via WhatsApp within 4 working hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-label-md text-primary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded border border-outline-variant bg-surface px-3.5 py-2.5 text-body-md text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
      />
    </div>
  );
}

function Choice({ id, label, items }: { id: string; label: string; items: string[] }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-label-md text-primary">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded border border-outline-variant bg-surface px-3.5 py-2.5 text-body-md text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
      >
        {items.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}
