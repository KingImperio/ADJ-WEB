"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

/* Consultation booking form. No backend — submit opens WhatsApp with a
   pre-structured booking message addressed to the ADJ line. */
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
  "w-full rounded border border-outline-variant bg-surface px-3.5 py-2.5 text-body-md text-on-surface focus:border-primary focus:bg-surface-container-lowest focus:outline-none";

export function ConsultationForm({ id = "consultation" }: { id?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [exam, setExam] = useState(exams[0]);
  const [level, setLevel] = useState(levels[0]);
  const [mode, setMode] = useState(modes[0]);
  const [notes, setNotes] = useState("");
  const [warn, setWarn] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setWarn(true);
      return;
    }
    setWarn(false);
    const msg = [
      "*New Diagnostic Booking — ADJ Website*",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Target exam: ${exam}`,
      `Current level: ${level}`,
      `Attendance: ${mode}`,
      `Course / school: ${notes.trim() || "-"}`,
      "",
      "Please confirm my free diagnostic slot. Thank you!",
    ].join("\n");
    window.open(`${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <section className="border-t border-outline-variant bg-surface py-16 lg:py-24" id={id}>
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
          <form className="space-y-6" onSubmit={send}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor={`${id}-name`} className="block text-label-md text-primary">
                  Full Name of Student / Parent *
                </label>
                <input
                  id={`${id}-name`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adebayo Ibrahim"
                  className={input}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${id}-phone`} className="block text-label-md text-primary">
                  WhatsApp / Phone Number *
                </label>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0801 234 5678"
                  className={input}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label htmlFor={`${id}-exam`} className="block text-label-md text-primary">
                  Target Examination *
                </label>
                <select id={`${id}-exam`} value={exam} onChange={(e) => setExam(e.target.value)} className={input}>
                  {exams.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${id}-level`} className="block text-label-md text-primary">
                  Current Level *
                </label>
                <select id={`${id}-level`} value={level} onChange={(e) => setLevel(e.target.value)} className={input}>
                  {levels.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor={`${id}-mode`} className="block text-label-md text-primary">
                  Preferred Attendance *
                </label>
                <select id={`${id}-mode`} value={mode} onChange={(e) => setMode(e.target.value)} className={input}>
                  {modes.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${id}-notes`} className="block text-label-md text-primary">
                Intended Course &amp; First-Choice University (Optional)
              </label>
              <textarea
                id={`${id}-notes`}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={input}
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
              {warn && (
                <p className="mt-2 text-body-sm font-semibold text-error">
                  Please add your name and phone number so the counsellor can reach you.
                </p>
              )}
              <p className="mt-2 text-center text-[12px] text-on-surface-variant sm:text-left">
                * Submitting opens WhatsApp with your booking ready to send to {site.phoneDisplay}.
                We do not share student contact details.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
