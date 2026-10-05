"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";
import { insertSubmission } from "@/lib/content";

/* Consultation booking form — polished two-pane card: benefit panel in deep
   navy on the left, form on white on the right. Submit opens WhatsApp with a
   pre-structured booking message. */
const exams = [
  "JAMB / UTME Clinic",
  "WAEC / NECO Intensive",
  "JUPEB Direct Entry",
  "IELTS / SAT Prep",
  "CAPS Admissions Advisory",
  "CBT Simulator Lab Only",
];
const levels = [
  "Current SS3 Student",
  "Secondary School Graduate",
  "Rewriting Exam",
  "University Aspirant",
  "Inquiring Parent",
];
const modes = [
  "Physical Center (Laara, Ikorodu)",
  "Live Interactive Online (Zoom)",
  "Hybrid (Weekdays + Online)",
];

const input =
  "w-full rounded-xl border border-[#e2e7ff] bg-[#faf8ff] px-4 py-3 text-sm text-[#131b2e] placeholder:text-[#74777f]/70 transition-all focus:border-[#1a365d] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1a365d]/10";

export function ConsultationForm({ id = "consultation" }: { id?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [exam, setExam] = useState(exams[0]);
  const [level, setLevel] = useState(levels[0]);
  const [mode, setMode] = useState(modes[0]);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [warn, setWarn] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setWarn("Please add your name and phone number so the counsellor can reach you.");
      return;
    }
    if (!consent) {
      setWarn("Please agree to secure storage of your details for consultation follow-up.");
      return;
    }
    setWarn("");
    const webMessage = [
      "*New Diagnostic Booking — ADJ Website*",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Target exam: ${exam}`,
      `Current level: ${level}`,
      `Attendance: ${mode}`,
      `Course / school: ${notes.trim() || "–"}`,
      "",
      "Please confirm my free diagnostic slot. Thank you!",
    ].join("\n");

    // Persist to the backend + open WhatsApp handoff in parallel.
    void insertSubmission({
      name: name.trim(),
      phone: phone.trim(),
      exam,
      level,
      mode,
      notes: notes.trim(),
      source: window.location.pathname,
    });
    window.open(`${site.whatsapp}?text=${encodeURIComponent(webMessage)}`, "_blank", "noopener");
  };

  return (
    <section className="bg-[#002045] py-12 sm:py-20" id={id}>
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_32px_80px_-24px_rgba(0,32,69,0.55)] sm:rounded-[2.5rem] lg:grid-cols-5">
          {/* Benefit panel */}
          <div className="bg-[#1a365d] p-6 sm:p-8 lg:col-span-2 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5A11E]/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#F5E5B5] uppercase">
              <Icon name="verified" className="text-[14px]" />
              Free First Session
            </span>
            <h2 className="mt-5 text-[28px] leading-tight font-bold tracking-tight text-white sm:text-3xl">
              Book Your Free Diagnostic Assessment
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#adc7f7]">
              A short, no-pressure profiling session so the right cohort is recommended from
              evidence, not guesswork.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                { icon: "quiz", text: "Quick assessment of your current standing" },
                { icon: "route", text: "A recommended programme + cohort" },
                { icon: "payments", text: "Fees confirmed before any commitment" },
              ].map((b) => (
                <li key={b.text} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#D5A11E] text-[#101A3D]">
                    <Icon name={b.icon} className="text-lg" />
                  </span>
                  <span className="text-sm text-white/90">{b.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-[#adc7f7]">
              Limit: 22 students per physical room. Submitting opens WhatsApp with your booking
              ready to send, and saves your request securely so our counsellor can follow up.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={send} className="space-y-5 p-6 sm:space-y-6 sm:p-8 lg:col-span-3 lg:p-10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#D5A11E]" />
              <span className="text-[11px] font-bold tracking-[0.14em] text-[#8A6400] uppercase">
                Start Your Preparation
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full Name of Student / Parent" id={`${id}-name`}>
                <input
                  id={`${id}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adebayo Ibrahim"
                  className={input}
                />
              </Field>
              <Field label="WhatsApp / Phone Number" id={`${id}-phone`}>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0801 234 5678"
                  className={input}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Field label="Target Exam" id={`${id}-exam`}>
                <Select
                  id={`${id}-exam`}
                  value={exam}
                  onChange={setExam}
                  options={exams}
                />
              </Field>
              <Field label="Current Level" id={`${id}-level`}>
                <Select id={`${id}-level`} value={level} onChange={setLevel} options={levels} />
              </Field>
              <Field label="Attendance" id={`${id}-mode`}>
                <Select id={`${id}-mode`} value={mode} onChange={setMode} options={modes} />
              </Field>
            </div>

            <Field label="Intended Course &amp; First-Choice University (optional)" id={`${id}-notes`}>
              <textarea
                id={`${id}-notes`}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Target: Accounting at UNILAG. Previous UTME: 218."
                className={`${input} resize-none`}
              />
            </Field>

            <div className="pt-1">
              <label className="mb-4 flex items-start gap-2.5 text-xs leading-relaxed text-[#43474e]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#0B237F]"
                />
                <span>
                  I agree that ADJ may securely store these details to follow up about my
                  consultation request.
                </span>
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D5A11E] px-8 py-4 text-base font-bold text-[#101A3D] shadow-[0_16px_36px_-10px_rgba(213,161,30,.65)] transition-all hover:bg-[#e5b532] active:scale-[0.99]"
              >
                <span>Confirm Diagnostic Booking</span>
                <Icon name="arrow_forward" className="text-lg" />
              </button>
              {warn && <p className="mt-3 text-sm font-semibold text-[#ba1a1a]">{warn}</p>}
              <p className="mt-4 text-center text-[11px] text-[#74777f] sm:text-left">
                We only use your details to respond to this request. WhatsApp opens with the
                booking summary when you confirm.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-bold tracking-[0.1em] text-[#002045] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${input} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Icon
        name="expand_more"
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-lg text-[#74777f]"
      />
    </div>
  );
}
