"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardList, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMountedReducedMotion } from "@/lib/use-mounted-motion";

const stages = [
  { id: "direction", label: "Course & institution", title: "Begin with a considered shortlist.", copy: "Bring your preferred course, institutions and current results into one conversation. Start with the published requirements, then identify the questions that need an adviser.", tasks: ["Write down your preferred course and institutions.", "Compare subject requirements using JAMB IBASS and each institution's official guidance.", "Note any result, subject-combination or entry-route questions."], outcome: "A shortlist and a clear set of questions.", resource: "JAMB IBASS", href: "https://ibass.jamb.gov.ng/" },
  { id: "records", label: "Results & records", title: "Put the paperwork in order.", copy: "Small inconsistencies deserve attention before the next step. Review your records and ask how any correction should be made through the appropriate official channel.", tasks: ["Gather your available examination results and registration details.", "Compare names and other details across your records.", "Identify missing documents and confirm the institution's current checklist."], outcome: "A record of what is available, missing or needs clarification.", resource: "JAMB official services", href: "https://www.jamb.gov.ng/" },
  { id: "screening", label: "Application & screening", title: "Know the next requirement, not a rumour.", copy: "Screening arrangements and dates differ between institutions. Work from the current official notice and keep a record of each submission.", tasks: ["Read your institution's current application and screening notice.", "Record the published dates and any required actions.", "Keep submission confirmations and payment receipts."], outcome: "An institution-specific action list.", resource: "JAMB official information", href: "https://www.jamb.gov.ng/" },
  { id: "caps", label: "CAPS & offers", title: "Understand the status before you act.", copy: "Review the message shown in your official account. If the next action is unclear, ask for an explanation before accepting, declining or changing anything.", tasks: ["Check the exact status in your official account.", "Read any offer or transfer information carefully.", "Confirm questions with the institution or JAMB support before taking action."], outcome: "A clearer understanding of your official status and next action.", resource: "JAMB E-Facility", href: "https://efacility.jamb.gov.ng/" },
  { id: "clearance", label: "Clearance & arrival", title: "Follow through to the institution.", copy: "An offer is not the end of the paperwork. Use your institution's clearance and registration instructions to prepare for the next chapter.", tasks: ["Read the institution's acceptance and clearance instructions.", "Prepare the documents it specifically requests.", "Keep official receipts and registration confirmations together."], outcome: "A personal clearance and registration checklist.", resource: "JAMB official information", href: "https://www.jamb.gov.ng/" },
];

const documents = [
  { title: "Your academic starting point", items: ["Available O-Level results", "UTME or Direct Entry details, where applicable", "Preferred courses and institutions"] },
  { title: "Your application record", items: ["Institution's current published requirements", "Application or screening confirmations, if available", "A note of any differences in your records"] },
  { title: "After an offer", items: ["Official offer details, if received", "Institution's clearance document list", "Receipts and registration confirmations, if available"] },
];
const totalDocuments = documents.reduce((total, group) => total + group.items.length, 0);

export function AdmissionsJourney() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reduced = useMountedReducedMotion();
  const stage = stages[active];
  const select = (index: number, focus = false) => {
    const next = Math.max(0, Math.min(stages.length - 1, index));
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };

  return <div className="admissions-page">
    <section className="admissions-intro">
      <div className="weave-container">
        <Link href="/programs" className="admissions-back"><ArrowLeft size={16} /> Programmes</Link>
        <span className="weave-eyebrow">Admissions processing / ADJ advisory</span>
        <h1>Your ambition.<br /><em>A clearer way forward.</em></h1>
        <p>From choosing a course to preparing for clearance. Get direction on the decisions, records and next steps that sit between you and university.</p>
        <a href="#admissions-journey" className="weave-action">Find your next step <ArrowRight size={18} /></a>
        <div className="admissions-intro-note"><ShieldCheck size={18} /><span>Guidance, not guaranteed admission. Official decisions remain with JAMB and the institution.</span></div>
      </div>
    </section>

    <section id="admissions-journey" className="admissions-workspace textile-body-section">
      <div className="weave-container">
        <div className="admissions-section-heading"><div><span className="weave-eyebrow">01 / The route ahead</span><h2>Where are you now?</h2></div><span className="admissions-stage-count">Stage {active + 1} of {stages.length}</span></div>
        <div className="admissions-journey-grid">
          <div className="admissions-stage-list" role="tablist" aria-label="Admissions stages" aria-orientation="vertical">
            {stages.map((item, index) => <button key={item.id} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`${id}-${item.id}-tab`} aria-controls={`${id}-panel`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
              const next = event.key === "ArrowDown" ? active + 1 : event.key === "ArrowUp" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 : null;
              if (next !== null) { event.preventDefault(); select(next, true); }
            }}><span className="admissions-step-number">0{index + 1}</span><span>{item.label}</span><ArrowUpRight size={18} /></button>)}
          </div>
          <div className="admissions-stage-panel" id={`${id}-panel`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-${stage.id}-tab`}>
            <AnimatePresence mode="wait" initial={false}><motion.div key={stage.id} initial={reduced ? false : { y: 10 }} animate={{ y: 0 }} exit={reduced ? undefined : { y: -10 }} transition={{ duration: reduced ? 0 : .18 }}>
              <span className="weave-eyebrow">{stage.label}</span><h3>{stage.title}</h3><p>{stage.copy}</p>
              <ul>{stage.tasks.map(task => <li key={task}><Check size={18} /><span>{task}</span></li>)}</ul>
              <div className="admissions-outcome"><span>Your next milestone</span><p>{stage.outcome}</p></div>
              <a className="weave-link" href={stage.href} target="_blank" rel="noopener noreferrer">{stage.resource}<ExternalLink size={16} /></a>
            </motion.div></AnimatePresence>
            <div className="admissions-stage-controls"><Button variant="outline" size="icon-lg" title="Previous stage" aria-label="Previous stage" disabled={active === 0} onClick={() => select(active - 1)}><ArrowLeft /></Button><Button variant="outline" size="icon-lg" title="Next stage" aria-label="Next stage" disabled={active === stages.length - 1} onClick={() => select(active + 1)}><ArrowRight /></Button></div>
          </div>
        </div>
      </div>
    </section>

    <section className="admissions-documents" id="documents"><div className="weave-container admissions-document-grid">
      <div><span className="weave-eyebrow">02 / Get your records together</span><ClipboardList size={36} className="admissions-document-icon" /><h2>A little preparation.<br />A better conversation.</h2><p>A starting point for your discussion, not an official eligibility or clearance checklist. Your institution determines what is required.</p><p className="admissions-privacy">No documents or account credentials are requested here. Checkmarks clear when this page is reloaded.</p></div>
      <div><div className="admissions-checklist-status"><span aria-live="polite">{checked.length} of {totalDocuments} noted</span><Button variant="ghost" disabled={!checked.length} onClick={() => setChecked([])}>Reset</Button></div><div className="admissions-checklist-progress" role="progressbar" aria-label="Preparation checklist" aria-valuenow={checked.length} aria-valuemin={0} aria-valuemax={totalDocuments}><span style={{ width: `${checked.length / totalDocuments * 100}%` }} /></div>
        {documents.map((group, index) => <details key={group.title} className="admissions-document-group" open={index === 0 ? true : undefined}><summary><span>0{index + 1} / {group.title}</span><ChevronDown size={20} /></summary><div>{group.items.map(item => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={event => setChecked(current => event.target.checked ? [...current, item] : current.filter(value => value !== item))} /><span>{item}</span></label>)}</div></details>)}
      </div>
    </div></section>

    <section className="admissions-boundaries textile-body-section"><div className="weave-container"><span className="weave-eyebrow">03 / Clear expectations</span><h2>Support you can understand.<br />Boundaries you can trust.</h2><div className="admissions-boundary-grid"><div><h3>What we help you work through</h3><ul><li>Course and institution questions</li><li>Record and subject-combination reviews</li><li>Understanding official application instructions</li><li>Questions about CAPS and clearance next steps</li></ul></div><div><h3>What stays in official hands</h3><ul><li>Admission decisions and available places</li><li>Published entry requirements and deadlines</li><li>Official account actions and payments</li><li>Institutional verification and clearance approval</li></ul></div></div><p className="admissions-source-note">Always confirm current requirements through <a href="https://www.jamb.gov.ng/" target="_blank" rel="noopener noreferrer">JAMB <ExternalLink size={13} /></a> and your institution. ADJ does not issue admission offers or guarantee placement.</p></div></section>
  </div>;
}
