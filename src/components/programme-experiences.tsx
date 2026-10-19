"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, ExternalLink, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const focusAreas = [
  { id: "science", label: "Sciences", topics: ["Explain a principle before applying a formula.", "Keep units and working visible in calculations.", "Review the reasoning behind each incorrect answer."], note: "Build understanding, then practise accurate problem-solving." },
  { id: "arts", label: "Arts & humanities", topics: ["Read questions for context and the exact command word.", "Connect ideas, events and themes rather than isolated facts.", "Support each answer with a reason you can explain."], note: "Build connections, not just a collection of facts." },
  { id: "commerce", label: "Commerce & social sciences", topics: ["Distinguish similar terms with your own examples.", "Read tables and graphs before calculating.", "Practise interpreting a scenario as well as recalling a definition."], note: "Turn concepts into clear, practical explanations." },
];

const questions = [
  { subject: "Mathematics", question: "A notebook costs N600 after a 25% discount. What was its original price?", options: ["N750", "N800", "N825", "N900"], answer: 1, explanation: "After a 25% discount, N600 is 75% of the original price. Divide 600 by 0.75 to get N800." },
  { subject: "Use of English", question: "Choose the sentence with correct subject-verb agreement.", options: ["The list of topics are on the desk.", "The list of topics is on the desk.", "The list of topics were on the desk.", "The list of topics have been on the desk."], answer: 1, explanation: "The subject is the singular noun 'list', not the plural noun 'topics'. It takes the singular verb 'is'." },
  { subject: "Mathematics", question: "The mean of 4, 6, 8 and x is 7. What is x?", options: ["7", "8", "9", "10"], answer: 3, explanation: "Four values with a mean of 7 have a total of 28. The known values total 18, so x is 10." },
];

function ResourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="weave-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={16} /></a>;
}

function FocusExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const focus = focusAreas[active];
  return <div className="prep-focus">
    <div className="prep-focus-tabs" role="tablist" aria-label="Preparation focus">
      {focusAreas.map((area, index) => <button type="button" key={area.id} ref={element => { tabs.current[index] = element; }} role="tab" id={`${id}-${area.id}`} aria-selected={index === active} aria-controls={`${id}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        const next = event.key === "ArrowRight" ? (active + 1) % focusAreas.length : event.key === "ArrowLeft" ? (active + focusAreas.length - 1) % focusAreas.length : event.key === "Home" ? 0 : event.key === "End" ? focusAreas.length - 1 : null;
        if (next !== null) { event.preventDefault(); setActive(next); tabs.current[next]?.focus(); }
      }}>{area.label}</button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${focus.id}`} tabIndex={0} className="prep-focus-content"><h3>{focus.note}</h3><ul>{focus.topics.map(topic => <li key={topic}><Check size={18} /><span>{topic}</span></li>)}</ul></div>
    <p className="prep-note">Study focus, not a subject-combination recommendation. Confirm course requirements through JAMB IBASS and your institution.</p>
    <ResourceLink href="https://ibass.jamb.gov.ng/">Check official subject requirements</ResourceLink>
  </div>;
}

function PracticePreview() {
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [complete, setComplete] = useState(false);
  const id = useId();
  const question = questions[index];
  const reset = () => { setIndex(0); setSelection(null); setRevealed(false); setCorrect(0); setComplete(false); };
  return <div className="practice-preview" aria-label="Practice preview">
    <div className="practice-topline"><span>ADJ practice desk</span><span>{complete ? "Review complete" : `${index + 1} / ${questions.length}`}</span></div>
    {complete ? <div className="practice-summary" role="status"><BookOpen size={32} /><h3>A starting point,<br />not a prediction.</h3><p>You answered {correct} of {questions.length} correctly. This small practice set does not estimate your UTME score.</p><Button onClick={reset} size="lg"><RotateCcw size={16} /> Try again</Button></div> : <>
      <fieldset disabled={revealed}><legend><span>{question.subject}</span>{question.question}</legend><div className="practice-options">{question.options.map((option, optionIndex) => <label key={option} data-correct={revealed && optionIndex === question.answer} data-selected={selection === optionIndex}><input type="radio" name={`${id}-answer`} value={optionIndex} checked={selection === optionIndex} onChange={() => setSelection(optionIndex)} /><span className="practice-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{revealed && optionIndex === question.answer && <Check size={18} />}</label>)}</div></fieldset>
      <div className="practice-feedback" aria-live="polite">{revealed && <><strong>{selection === question.answer ? "Correct." : `The correct answer is ${String.fromCharCode(65 + question.answer)}.`}</strong><p>{question.explanation}</p></>}</div>
      <div className="practice-actions">{!revealed ? <Button size="lg" disabled={selection === null} onClick={() => { setRevealed(true); if (selection === question.answer) setCorrect(value => value + 1); }}>Check answer <Check size={16} /></Button> : <Button size="lg" onClick={() => { if (index === questions.length - 1) setComplete(true); else { setIndex(value => value + 1); setSelection(null); setRevealed(false); } }}>{index === questions.length - 1 ? "See review" : "Next question"}<ArrowRight size={16} /></Button>}</div>
    </>}
    <p className="prep-note">Original ADJ website practice. Not official JAMB questions or a full CBT simulation.</p>
  </div>;
}

export function JambExperience() {
  return <div className="prep-page">
    <section className="prep-jamb-hero"><div className="weave-container"><Link href="/programs" className="prep-back"><ArrowLeft size={16} /> Programmes</Link><span className="weave-eyebrow">JAMB / UTME preparation</span><h1>Understand it.<br /><em>Practise it. Own it.</em></h1><p>Give your preparation a rhythm: learn the topic, work through questions, review mistakes and return with a clearer plan.</p><a href="#practice" className="weave-action">Try the practice desk <ArrowRight size={18} /></a><div className="prep-hero-foot"><span>Subject understanding</span><span>Question practice</span><span>Thoughtful review</span></div></div></section>
    <section className="prep-section textile-body-section"><div className="weave-container prep-focus-layout"><div><span className="weave-eyebrow">01 / Build the foundation</span><h2>Different subjects.<br />Different ways to think.</h2><p>Preparation should address how you approach a question, not only how much you remember.</p></div><FocusExplorer /></div></section>
    <section id="practice" className="prep-section prep-practice-section"><div className="weave-container prep-practice-layout"><div><span className="weave-eyebrow">02 / Put understanding to work</span><h2>One question.<br />Then the reason why.</h2><p>Three short questions in English and Mathematics. Take your time and review the explanation after each answer.</p><Link className="weave-link" href="/programs/cbt">Explore CBT practice at ADJ <ArrowUpRight size={18} /></Link></div><PracticePreview /></div></section>
    <section className="prep-section textile-body-section"><div className="weave-container"><span className="weave-eyebrow">03 / A repeatable study rhythm</span><h2>Learn. Apply. Review. Return.</h2><ol className="prep-study-rhythm">{[{title:"Learn",copy:"Choose a topic and explain its main ideas in your own words."},{title:"Apply",copy:"Attempt a short set of questions before checking the answers."},{title:"Review",copy:"Record what went wrong: knowledge, interpretation or working."},{title:"Return",copy:"Revisit the weak point and test your understanding again."}].map((step,index)=><li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol><p className="prep-note">Class availability, fees and schedules are confirmed directly by ADJ. No score or admission outcome is guaranteed.</p></div></section>
  </div>;
}

const subjectExamples = [
  { id:"science",label:"Sciences",subjects:["Biology","Chemistry","Physics"],question:"What does the intended course require, and how confident are you with practical and calculation-based work?" },
  { id:"arts",label:"Arts & humanities",subjects:["Christian Religious Studies","Government","Literature-in-English"],question:"Which texts and concepts need sustained reading, and what does the intended institution accept?" },
  { id:"commerce",label:"Management & social sciences",subjects:["Accounting","Business Studies","Economics"],question:"How will you balance quantitative work, concepts and longer written explanations?" },
];

export function JupebExperience() {
  const [example, setExample] = useState(0);
  const selected = subjectExamples[example];
  return <div className="prep-page foundation-page">
    <section className="foundation-hero"><div className="weave-container"><Link href="/programs" className="prep-back"><ArrowLeft size={16} /> Programmes</Link><span className="weave-eyebrow">JUPEB / Academic support & planning</span><h1>A different route.<br /><em>The same ambition.</em></h1><p>Explore the academic commitment behind JUPEB, prepare questions about your subjects and plan your next conversation with an approved university centre.</p><a href="#subject-planning" className="weave-action">Explore subject planning <ArrowRight size={18} /></a></div></section>
    <div className="foundation-official"><div className="weave-container"><ShieldCheck size={22} /><p>JUPEB registration is handled by approved university centres. This page provides academic planning guidance; it does not establish ADJ as an approved JUPEB centre.</p><ResourceLink href="https://jupeb.edu.ng/">Official JUPEB information</ResourceLink></div></div>
    <section className="prep-section textile-body-section"><div className="weave-container foundation-route"><div><span className="weave-eyebrow">01 / Understand the commitment</span><h2>A route to explore.<br />Not a shortcut to assume.</h2><p>Before deciding, discuss the course you want, the university you are considering and the study commitment involved. Confirm eligibility and registration arrangements with official sources.</p><Link href="/programs/admissions" className="weave-link">Explore admissions guidance <ArrowUpRight size={18} /></Link></div><ol>{[{title:"Confirm the route",copy:"Check the intended institution's current Direct Entry requirements and its approved JUPEB arrangements."},{title:"Plan the academic work",copy:"Discuss subject choices, syllabus coverage, assessment preparation and a realistic study routine."},{title:"Follow the official next steps",copy:"Use the university centre's registration instructions and published guidance. Keep your documents and confirmations together."}].map((step,index)=><li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></div></section>
    <section id="subject-planning" className="prep-section foundation-subject-section"><div className="weave-container"><span className="weave-eyebrow">02 / Start with the subjects</span><div className="foundation-subject-heading"><h2>Three subjects.<br />One considered plan.</h2><p>Examples from the published JUPEB combination list. A listed combination is not confirmation of eligibility for your chosen course or institution.</p></div><label className="foundation-field-label" htmlFor="jupeb-area">Explore a subject area</label><select id="jupeb-area" value={example} onChange={event=>setExample(Number(event.target.value))}>{subjectExamples.map((area,index)=><option key={area.id} value={index}>{area.label}</option>)}</select><div className="foundation-subjects" aria-live="polite">{selected.subjects.map((subject,index)=><div key={subject}><span>Subject 0{index + 1}</span><h3>{subject}</h3><BookOpen size={22} /></div>)}</div><div className="foundation-question"><span>Bring this question to your adviser</span><p>{selected.question}</p></div><ResourceLink href="https://jupeb.edu.ng/about/examination_subjects">Verify subjects and combinations</ResourceLink></div></section>
    <section className="prep-section textile-body-section"><div className="weave-container foundation-questions"><div><span className="weave-eyebrow">03 / Before you commit</span><h2>Good questions<br />come first.</h2></div><div>{[{q:"What should I confirm with the university centre?",a:"Its approval status, the subjects accepted for your intended course, current entry requirements, fees, dates and registration arrangements. Ask for published official information."},{q:"Does a subject combination guarantee admission?",a:"No. Confirm the intended institution's current requirements and selection process. Neither these examples nor academic support guarantee an offer."},{q:"What can I discuss with ADJ?",a:"Your study goals, subject confidence, preparation routine and questions about the admissions route. Ask ADJ to confirm the exact academic support, availability and fees before making a commitment."}].map(item=><details key={item.q}><summary>{item.q}<ChevronDown size={20} /></summary><p>{item.a}</p></details>)}</div></div></section>
  </div>;
}
