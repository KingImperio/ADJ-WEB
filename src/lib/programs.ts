/* Programme catalogue — single source of truth for /programs and /programs/[slug].
   Copy rules: no invented fees, dates, names, or pass rates. [OWNER] marks facts to confirm. */

export type ProgramSlug =
  | "jamb" | "waec" | "neco" | "gce" | "jupeb"
  | "international" | "admissions" | "tutorials";

export type DisclaimerKind = "no-study-abroad" | "no-one-on-one" | "partner-delivered" | "no-fees-published";

export interface ProgramModule { title: string; detail: string }
export interface ProgramFaq { q: string; a: string }
export interface StatCard { value: number; label: string; growth: number }

export interface Program {
  slug: ProgramSlug;
  name: string;
  navLabel: string;
  exam: string;
  seoTitle: string;
  seoDescription: string;
  intent: "informational" | "commercial" | "transactional";
  keywords: string[];
  hero: { headline: string; sub: string; highlights: string[] };
  whoFor: string[];
  modules: ProgramModule[];
  outcomes: string[];
  process: { step: string; detail: string }[];
  faqs: ProgramFaq[];
  format: { mode: "physical" | "online" | "both"; groupOnly: true; capacityNote: string; scheduleNote: string };
  related: ProgramSlug[];
  disclaimer?: DisclaimerKind;
  cta: { headline: string; detail: string };
  demoStats?: StatCard[];
}

const jambFaqs: ProgramFaq[] = [
  { q: "How is JAMB different from WAEC preparation?", a: "JAMB is a timed computer-based test that rewards speed and accuracy under pressure; WAEC rewards depth of written answers. Our JAMB programme drills the CBT interface itself — navigation, timing per question, and full mock exams — on top of syllabus mastery." },
  { q: "Do you help with JAMB registration?", a: "Yes. We support accurate registration — subject combinations, centre selection guidance, and deadline tracking — so a paperwork error never costs you an admission year." },
  { q: "What score should my child target?", a: "It depends on the course and school: competitive courses like Medicine and Law need 280+, while many courses admit from 180–200. During consultation we set a personal target from your child's course list and work backwards from it." },
  { q: "What happens after JAMB?", a: "Post-UTME screening preparation and admission processing take over — see our Admissions programme. The same team follows the candidate from UTME scores to the admission list." },
];

const ssceFaqs = (exam: string): ProgramFaq[] => [
  { q: `When should my child start ${exam} preparation?`, a: "Ideally from SS2, intensively in SS3. Starting early means past-question marathons and revision timetables replace last-minute panic. Late joiners are assessed and placed on an accelerated track." },
  { q: "Do you cover practical papers?", a: "Yes — science practicals get dedicated preparation balancing theory knowledge with the practical skills examiners actually score." },
  { q: "Can external candidates join?", a: "Yes. School leavers and external candidates join mid-cohort after assessment, with a personal catch-up plan for any missed ground." },
  { q: "Do you help with registration?", a: "Yes — we support accurate registration so subject entries, passport details and deadlines are handled correctly." },
];

export const programs: Program[] = [
  {
    slug: "jamb",
    name: "JAMB / UTME Mastery",
    navLabel: "JAMB / UTME",
    exam: "JAMB / UTME",
    seoTitle: "JAMB coaching Ikorodu — CBT drills & mock exams | ADJ",
    seoDescription: "JAMB/UTME preparation in Igbe-Laara, Ikorodu: timed CBT drills, full mock exams and cutoff guidance. Physical + live online group classes.",
    intent: "commercial",
    keywords: ["JAMB coaching Ikorodu", "UTME preparation Igbe-Laara", "JAMB CBT practice Lagos", "best JAMB tutorial Ikorodu"],
    hero: {
      headline: "Walk into CBT already knowing the room.",
      sub: "Syllabus-paced lessons, timed drills on real CBT interfaces, and full mock exams until speed and accuracy hold under pressure.",
      highlights: ["Timed CBT drills", "Full-length mocks", "Cutoff guidance"],
    },
    whoFor: ["SS3 students sitting UTME for the first time", "School leavers retaking for a higher score", "Candidates targeting competitive cutoffs (Medicine, Law, Engineering)"],
    modules: [
      { title: "Use of English mastery", detail: "Comprehension, lexis, oral forms and the novel — the one paper every candidate must pass." },
      { title: "Subject clusters", detail: "Sciences, commercials and arts tracks taught in syllabus order with weekly objectives." },
      { title: "CBT interface familiarisation", detail: "Navigation, question flagging, calculator use and time management inside the real exam interface." },
      { title: "Timed drills", detail: "Per-topic speed sets that build the 40-seconds-per-question reflex JAMB demands." },
      { title: "Full mock exams", detail: "Complete 4-paper simulations under exam conditions, with score analysis and weak-topic repair lists." },
      { title: "Cutoff and O-level blending", detail: "Matching UTME targets to course cutoffs and ensuring O-level results qualify for the same courses." },
    ],
    outcomes: [
      "Finish a full CBT mock inside the time limit",
      "Know exactly which courses your scores qualify for",
      "Navigate the JAMB interface without losing minutes",
      "Walk into post-UTME screening already prepared",
    ],
    process: [
      { step: "Free assessment", detail: "We test current level across chosen subjects and set a personal score target." },
      { step: "Cohort placement", detail: "Placed in a physical or online group matched to level and exam date." },
      { step: "Weekly classes + drills", detail: "Syllabus lessons plus timed CBT sets every week." },
      { step: "Mock exams", detail: "Full simulations with analysis and targeted repair." },
      { step: "Exam + admission follow-through", detail: "Registration support, then post-UTME prep and admission processing." },
    ],
    faqs: jambFaqs,
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["admissions", "waec", "tutorials"],
    disclaimer: "no-one-on-one",
    cta: { headline: "Start with a free assessment.", detail: "We set the target score first — then build the plan to reach it." },
  },
  {
    slug: "waec",
    name: "WAEC Success Classes",
    navLabel: "WAEC",
    exam: "WAEC",
    seoTitle: "WAEC coaching Ikorodu — group classes for SS3 | ADJ",
    seoDescription: "WAEC preparation in Igbe-Laara, Ikorodu: core and elective coaching, past-question marathons and practical prep. Physical + online groups.",
    intent: "commercial",
    keywords: ["WAEC class Ikorodu", "WAEC tutorial Igbe-Laara", "SS3 coaching Lagos", "WAEC registration help"],
    hero: {
      headline: "Make the real paper feel like revision.",
      sub: "Small-group coaching across core and elective subjects, past-question marathons, and practical preparation for science candidates.",
      highlights: ["Past-question marathons", "Practical prep", "Registration support"],
    },
    whoFor: ["SS3 students preparing for the May/June WAEC", "SS2 students starting early", "School leavers covering failed or missing papers"],
    modules: [
      { title: "Core subjects", detail: "English, Mathematics and Civic Education — the compulsory foundation, taught to distinction standard." },
      { title: "Electives by track", detail: "Sciences, commercials and arts electives matched to each student's registered subjects." },
      { title: "Past-question marathons", detail: "Ten-year question banks worked topic by topic until patterns become reflexes." },
      { title: "Practical papers", detail: "Physics, Chemistry, Biology, Agric and Technical Drawing practicals with hands-on preparation." },
      { title: "Theory and essay technique", detail: "How examiners award marks — structure, keywords and presentation that convert knowledge into grades." },
      { title: "Registration support", detail: "Subject entries and deadlines handled accurately alongside the coaching." },
    ],
    outcomes: [
      "Answer any past question in registered subjects with confidence",
      "Handle practical papers without panic",
      "Write theory answers the way examiners score them",
      "Enter the exam hall with every syllabus topic covered",
    ],
    process: [
      { step: "Free assessment", detail: "Subject-by-subject level check and registration review." },
      { step: "Cohort placement", detail: "Grouped by class and track, physical or online." },
      { step: "Weekly classes", detail: "Syllabus lessons plus past-question sets every week." },
      { step: "Marathon season", detail: "Intensive revision and timed practice as exams approach." },
      { step: "Exam-day readiness", detail: "Timetable strategy, materials checklist and calm-hall routines." },
    ],
    faqs: ssceFaqs("WAEC"),
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["neco", "jamb", "tutorials"],
    cta: { headline: "Start with a free assessment.", detail: "We map every registered subject, then build the revision plan." },
  },
  {
    slug: "neco",
    name: "NECO Coaching",
    navLabel: "NECO",
    exam: "NECO",
    seoTitle: "NECO coaching Ikorodu — internal & external candidates | ADJ",
    seoDescription: "NECO preparation in Igbe-Laara, Ikorodu for internal and external candidates: subject coverage, practicals and revision timetables.",
    intent: "commercial",
    keywords: ["NECO coaching Ikorodu", "NECO tutorial Lagos", "NECO external candidates", "NECO revision classes"],
    hero: {
      headline: "NECO, internal or external — covered.",
      sub: "Structured coaching for both NECO tracks, with practical emphasis and revision timetables that respect how NECO differs from WAEC.",
      highlights: ["Internal + external tracks", "Practical emphasis", "Revision timetables"],
    },
    whoFor: ["SS3 students sitting NECO alongside or after WAEC", "External candidates returning to clear papers", "Candidates who need NECO specifically for their admission path"],
    modules: [
      { title: "Internal vs external structure", detail: "How the two NECO routes differ in timetable, centres and paper structure — and which one fits you." },
      { title: "Core and elective coverage", detail: "Full subject coaching aligned to the NECO syllabus, not a WAEC copy-paste." },
      { title: "Practical papers", detail: "Home Economics, Civic Education, ICT and science practicals with targeted preparation." },
      { title: "Past-question practice", detail: "NECO-specific question banks — the phrasing differs from WAEC and we train for it." },
      { title: "Revision timetable", detail: "A personal countdown plan balancing NECO with any concurrent exams." },
    ],
    outcomes: [
      "Know exactly how your NECO route differs from WAEC",
      "Handle NECO practical papers confidently",
      "Follow a revision timetable built for your exam dates",
      "Join mid-cohort as an external candidate without falling behind",
    ],
    process: [
      { step: "Free assessment", detail: "Route check (internal vs external) plus subject level test." },
      { step: "Cohort placement", detail: "Physical or online group; external candidates get a catch-up plan." },
      { step: "Weekly classes", detail: "Syllabus lessons with NECO-specific practice sets." },
      { step: "Revision season", detail: "Timetabled marathons as papers approach." },
      { step: "Exam-day readiness", detail: "Centre logistics, materials and timing strategy." },
    ],
    faqs: ssceFaqs("NECO"),
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["waec", "gce", "tutorials"],
    cta: { headline: "Start with a free assessment.", detail: "Internal or external — we place you on the right track first." },
  },
  {
    slug: "gce",
    name: "GCE O-Level Coaching",
    navLabel: "GCE",
    exam: "GCE",
    seoTitle: "GCE O-Level coaching Ikorodu | ADJ",
    seoDescription: "GCE O-Level preparation in Igbe-Laara, Ikorodu for school leavers: core/elective structure, practicals and a factual GCE-vs-WAEC guide.",
    intent: "informational",
    keywords: ["GCE coaching Ikorodu", "GCE O-Level tutorial Lagos", "GCE vs WAEC", "GCE registration help"],
    hero: {
      headline: "A second route to the same results.",
      sub: "Focused GCE O-Level coaching for school leavers — with a straight, factual guide to whether GCE or WAEC serves you better.",
      highlights: ["School-leaver friendly", "Practical papers", "GCE-vs-WAEC guidance"],
    },
    whoFor: ["School leavers clearing or upgrading O-level results", "Candidates whose WAEC sitting didn't cover their needs", "Parents comparing GCE vs WAEC for their child"],
    modules: [
      { title: "Core and elective structure", detail: "How GCE O-Level papers are organised and which combinations serve which admission goals." },
      { title: "GCE vs WAEC, factually", detail: "A neutral comparison of recognition, timing, difficulty and cost — so the family chooses with eyes open." },
      { title: "Practical papers", detail: "Science and technical practicals prepared hands-on." },
      { title: "Past-question practice", detail: "GCE banks worked systematically, with examiner-style marking." },
      { title: "Combination rules", detail: "Which subject sets keep which courses and institutions open." },
    ],
    outcomes: [
      "Know whether GCE or WAEC is the right route — with reasons",
      "Cover every registered paper systematically",
      "Handle practicals with practiced confidence",
      "Register correctly, first time",
    ],
    process: [
      { step: "Free assessment", detail: "Route comparison (GCE vs WAEC) plus subject level test." },
      { step: "Cohort placement", detail: "Physical or online group matched to papers and timeline." },
      { step: "Weekly classes", detail: "Syllabus lessons with GCE-specific practice." },
      { step: "Revision season", detail: "Marathons and timed practice before papers." },
      { step: "Exam-day readiness", detail: "Logistics, materials and timing." },
    ],
    faqs: [
      { q: "Should my child write GCE or WAEC?", a: "Both are recognised for admission. GCE suits school leavers and those retaking specific papers; WAEC suits in-school candidates. During consultation we compare recognition, timing and cost for your exact situation — neutrally, not as a sales pitch." },
      { q: "Is GCE easier than WAEC?", a: "No — the syllabi overlap heavily and both demand real preparation. GCE's advantage is flexibility of timing and paper selection, not easiness." },
      { q: "Can a school leaver join mid-cohort?", a: "Yes. Assessment first, then a catch-up plan for any ground the cohort has covered." },
      { q: "Do you help with GCE registration?", a: "Yes — entries, centres and deadlines handled alongside coaching." },
    ],
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["waec", "neco", "admissions"],
    cta: { headline: "Start with a free assessment.", detail: "GCE or WAEC — we'll help you choose correctly, then prepare properly." },
  },
  {
    slug: "jupeb",
    name: "JUPEB & Direct Entry",
    navLabel: "JUPEB",
    exam: "JUPEB",
    seoTitle: "JUPEB coaching Ikorodu — direct entry into 200 level | ADJ",
    seoDescription: "JUPEB and direct-entry preparation in Igbe-Laara, Ikorodu: subject-combo selection, reading plans and application timing.",
    intent: "commercial",
    keywords: ["JUPEB preparation Lagos", "direct entry Ikorodu", "A-level coaching Nigeria", "JUPEB subject combination"],
    hero: {
      headline: "Skip 100 level — deliberately.",
      sub: "Guided JUPEB preparation and direct-entry planning: the right subject combos, a reading plan that holds, and application timing that doesn't slip.",
      highlights: ["Subject-combo advice", "Reading plans", "Application timing"],
    },
    whoFor: ["SS3 graduates avoiding another UTME cycle", "Candidates targeting 200-level entry", "Parents comparing JUPEB with other A-level routes"],
    modules: [
      { title: "Subject-combo selection", detail: "Matching JUPEB subjects against 200-level requirements of target courses — the single highest-leverage decision." },
      { title: "University requirement mapping", detail: "Which universities accept which JUPEB grades for which courses." },
      { title: "Reading and practice plan", detail: "A week-by-week plan balancing depth (A-level standard) with exam technique." },
      { title: "Application timing", detail: "The annual application window and screening steps, tracked so nothing is missed. [OWNER: exact dates]" },
      { title: "Alternative routes", detail: "When JUPEB isn't the best fit — Common Entrance and other direct-entry paths compared honestly." },
    ],
    outcomes: [
      "Choose a subject combo that keeps target courses open",
      "Follow a reading plan built for A-level depth",
      "Hit every application and screening deadline",
      "Know your fallback routes before you need them",
    ],
    process: [
      { step: "Free assessment", detail: "Current level plus target-course mapping." },
      { step: "Combo lock-in", detail: "Subject selection signed off against university requirements." },
      { step: "Weekly classes", detail: "A-level depth lessons with continuous practice." },
      { step: "Exam season", detail: "Timed practice and technique refinement." },
      { step: "Direct-entry follow-through", detail: "Screening and admission steps tracked to completion." },
    ],
    faqs: [
      { q: "Is JUPEB better than writing JAMB again?", a: "It depends on the candidate. JUPEB suits strong students targeting 200 level directly; JAMB suits those who want the widest choice of schools. We compare both routes against your child's strengths in consultation." },
      { q: "Which subject combination should my child take?", a: "The one that keeps their target 200-level courses open — never a generic set. Combination selection is the first thing we lock in, against published university requirements." },
      { q: "When do JUPEB applications open?", a: "There is a fixed annual window plus screening steps. [OWNER: exact dates] We track every deadline for enrolled candidates." },
      { q: "Is this placement into a university?", a: "No — this is exam preparation and application guidance, not placement. We prepare you to earn the grades; admission decisions belong to the universities." },
    ],
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["jamb", "admissions", "tutorials"],
    cta: { headline: "Start with a free assessment.", detail: "Combo first, then the plan — in that order." },
  },
  {
    slug: "international",
    name: "International Exams",
    navLabel: "IELTS · TOEFL · SAT · GRE",
    exam: "IELTS · TOEFL · SAT · GRE",
    seoTitle: "IELTS & TOEFL coaching Ikorodu — with Greater Heights | ADJ",
    seoDescription: "IELTS, TOEFL, SAT and GRE preparation in Igbe-Laara, Ikorodu with Greater Heights Tutorial Center. Test prep only — no placement or visas.",
    intent: "commercial",
    keywords: ["IELTS preparation Lagos", "SAT coaching Nigeria", "TOEFL class Ikorodu", "GRE prep Nigeria"],
    hero: {
      headline: "The scores first. Everything else after.",
      sub: "Test preparation for IELTS, TOEFL, SAT and GRE, delivered with Greater Heights Tutorial Center — strategy, band-score targeting and real feedback.",
      highlights: ["Band-score targeting", "Speaking + writing feedback", "Test-day strategy"],
    },
    whoFor: ["Candidates planning applications that require English-proficiency scores", "Students targeting SAT/GRE-based admissions", "Professionals needing IELTS/TOEFL for relocation routes"],
    modules: [
      { title: "Test formats decoded", detail: "IELTS, TOEFL, SAT and GRE structures, scoring scales and what each section actually rewards." },
      { title: "Band-score targeting", detail: "Working backwards from the score your route requires — every drill tied to a band descriptor." },
      { title: "Speaking and writing feedback", detail: "Human-marked practice with corrections on exactly what costs marks." },
      { title: "Reading speed and listening", detail: "Timed comprehension training for the sections where most candidates bleed points." },
      { title: "Test-day strategy", detail: "Centre logistics, timing plans per section, and nerves management that actually works." },
    ],
    outcomes: [
      "Know the exact score your route requires — and your gap to it",
      "Write and speak to band descriptors, not vibes",
      "Finish every section inside its time limit",
      "Walk into the test centre with a section-by-section plan",
    ],
    process: [
      { step: "Free assessment", detail: "Diagnostic test mapped to band scores or scaled scores." },
      { step: "Target lock-in", detail: "Required score confirmed against your route." },
      { step: "Weekly classes", detail: "Skills training plus marked writing and speaking practice." },
      { step: "Mock tests", detail: "Full simulations under timed conditions." },
      { step: "Booking + test day", detail: "Test-date planning and day-before readiness." },
    ],
    faqs: [
      { q: "Which test do I need — IELTS, TOEFL, SAT or GRE?", a: "It depends entirely on your route: schools and immigration programmes specify the test and the minimum score. Tell us the route in consultation and we'll confirm the exact requirement before you spend a naira on prep." },
      { q: "Do you handle study-abroad admissions or visas?", a: "No — plainly stated. We prepare you for the test and hand you the scores; for placement and visas we refer you to trusted partners. Anyone promising both in one package deserves hard questions." },
      { q: "Who delivers this programme?", a: "International exam prep is delivered with Greater Heights Tutorial Center. [OWNER: written permission to name the partner here]" },
      { q: "How long does preparation take?", a: "It depends on your starting band and target band — the diagnostic in your free assessment gives an honest timeline, typically measured in weeks of focused work, not days." },
    ],
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["jamb", "tutorials", "admissions"],
    disclaimer: "partner-delivered",
    cta: { headline: "Start with a free diagnostic.", detail: "Know your band first — then train to the target." },
  },
  {
    slug: "admissions",
    name: "Admission Processing",
    navLabel: "Admissions",
    exam: "Admissions",
    seoTitle: "Post-UTME and admission processing Ikorodu | ADJ",
    seoDescription: "Admission processing in Igbe-Laara, Ikorodu: post-UTME screening prep, course selection, O-level blending and follow-through to the list.",
    intent: "transactional",
    keywords: ["post-UTME screening prep Lagos", "admission processing Ikorodu", "O-level blending", "course and school selection Nigeria"],
    hero: {
      headline: "Scores open the door. We walk you through it.",
      sub: "Post-UTME screening preparation, course and school selection, O-level blending — and follow-through until your name is on the admission list.",
      highlights: ["Post-UTME screening prep", "Course selection", "Follow-through to admission"],
    },
    whoFor: ["Post-UTME candidates navigating screening season", "Parents confused by course/cutoff combinations", "Candidates with O-level gaps blocking admission"],
    modules: [
      { title: "Post-UTME screening prep", detail: "Screening formats by institution, likely question areas, and scoring logic — prepared, not guessed." },
      { title: "Course and school selection", detail: "Matching UTME scores + O-levels to realistic course lists, balancing ambition with safety options." },
      { title: "O-level result blending", detail: "Combining WAEC, NECO and GCE sittings legally and strategically to meet requirements." },
      { title: "List monitoring", detail: "Tracking merit, supplementary and catchment lists through the season so no offer is missed." },
      { title: "Parent updates", detail: "You always know the current step, the next step, and what could still go wrong." },
    ],
    outcomes: [
      "A course list your scores can actually carry",
      "O-level results that meet every requirement",
      "Screening preparation matched to each institution",
      "No missed list, no missed deadline, no silence",
    ],
    process: [
      { step: "Free assessment", detail: "Scores, O-levels and ambitions reviewed together." },
      { step: "Course list lock-in", detail: "Realistic options agreed with the family." },
      { step: "Screening prep", detail: "Institution-specific preparation." },
      { step: "Monitoring season", detail: "Lists tracked, responses filed on time." },
      { step: "Matriculation", detail: "Handover complete when admission is secured." },
    ],
    faqs: [
      { q: "Exactly which steps do you handle?", a: "Screening preparation, course/school selection, O-level blending advice, list monitoring and parent updates. [OWNER: confirm exact scope] Anything outside that — including anything abroad — we say so upfront." },
      { q: "Do you guarantee admission?", a: "No. Decisions belong to the institutions. What we guarantee is that no step within our control is missed, and you always know where things stand." },
      { q: "Do you process admissions outside Nigeria?", a: "No — Nigerian tertiary admissions only. For international routes we prepare your test scores and refer you onward." },
      { q: "My child missed the merit list. Is it over?", a: "Often not — supplementary lists, catchment considerations and change-of-course windows follow. This is exactly what the monitoring season covers." },
    ],
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["jamb", "jupeb", "tutorials"],
    disclaimer: "no-study-abroad",
    cta: { headline: "Start with a free review.", detail: "Bring the scores — we'll map the honest path from here." },
  },
  {
    slug: "tutorials",
    name: "Group Tutorials",
    navLabel: "Tutorials",
    exam: "Physical + Online",
    seoTitle: "Group tutorial classes in Laara, Ikorodu — physical & online | ADJ",
    seoDescription: "Evening and weekend group tutorials in Igbe-Laara, Ikorodu plus live online groups. Group-only by design — no one-on-one.",
    intent: "commercial",
    keywords: ["evening tutorial classes Ikorodu", "weekend tutorial Igbe-Laara", "online group tutorial Lagos", "Saturday classes Ikorodu"],
    hero: {
      headline: "In Laara — or live from anywhere.",
      sub: "Evening and weekend group classes at our centre, plus live online group tutorials. Same tutors, same rigour, same drills.",
      highlights: ["Physical classes in Laara", "Live online groups", "Weekend cohorts"],
    },
    whoFor: ["Students who learn best with peers pushing them", "Working candidates needing evening classes", "Students outside Ikorodu joining online", "Parents wanting structured weekends, not idle ones"],
    modules: [
      { title: "Physical centre classes", detail: "Evening and weekend cohorts at Laara — a short walk from Laara Bus Stop. Small enough that tutors know every student's weak topics." },
      { title: "Live online groups", detail: "Scheduled live sessions with class notes after every lesson and the same timed drills as physical cohorts." },
      { title: "Weekend intensive cohorts", detail: "Saturday blocks for students who can only commit weekends." },
      { title: "Class rhythm", detail: "[OWNER: timetable] Fixed weekly slots so families can plan around school and work." },
      { title: "Group-only, on purpose", detail: "No private coaching: shared pace, shared energy, shared accountability — and one fee structure for everyone." },
    ],
    outcomes: [
      "A fixed weekly learning rhythm that survives school terms",
      "The same drills and mocks whether physical or online",
      "Tutors who know your weak topics by name",
      "Notes and catch-up support for any missed session",
    ],
    process: [
      { step: "Free assessment", detail: "Level check plus format choice: physical, online, or weekend." },
      { step: "Cohort placement", detail: "Matched group with a fixed weekly slot." },
      { step: "Weekly rhythm", detail: "Classes, drills, notes — every week." },
      { step: "Progress reviews", detail: "Regular check-ins with parents on trajectory." },
      { step: "Exam season", detail: "Cohorts shift into marathon and mock mode together." },
    ],
    faqs: [
      { q: "Where exactly are physical classes held?", a: "At our Laara centre, just off Igbe Road — walking distance from Laara Bus Stop and the Igbe Laara Community Central Mosque, serving Igbe Lara, Agunfoye, Oreta, Igbogbo, Elepe and environs." },
      { q: "How do online group classes work?", a: "Live scheduled sessions — not recordings. Same tutors, same syllabus, class notes after every lesson, and the same timed drills as physical cohorts." },
      { q: "Do you offer private one-on-one lessons?", a: "No — deliberately. Every ADJ class is a group session: shared pace, shared energy, one fee structure. If your child needs 1-on-1, we'll tell you honestly rather than sell you a group seat." },
      { q: "What are the class times?", a: "Evenings and weekends, physical and online on separate timetables. [OWNER: exact timetable]" },
    ],
    format: { mode: "both", groupOnly: true, capacityNote: "[OWNER: cohort capacity]", scheduleNote: "[OWNER: class timetable]" },
    related: ["jamb", "waec", "international"],
    disclaimer: "no-one-on-one",
    cta: { headline: "Start with a free assessment.", detail: "Physical or online — we'll place you where you'll thrive." },
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export const programSlugs = programs.map((p) => p.slug);
