/* Central ADJ site config. Anything marked TODO still needs the real value. */

export const site = {
  name: "ADJ Educational Consultants",
  short: "ADJ",
  tagline: "Ikorodu's home for exam success",
  description:
    "JAMB, WAEC, NECO & international exam prep, group tutorials (physical + online), and admission processing in Igbe-Laara, Ikorodu — in partnership with Greater Heights Tutorial Center.",
  url: "https://adjeduconsult.com.ng", // TODO: confirm domain once purchased
  // TODO: replace with real lines
  phoneDisplay: "+234 800 000 0000",
  phoneHref: "tel:+2348000000000",
  whatsapp: "https://wa.me/2348000000000",
  email: "hello@adjeduconsult.com.ng",
  address: {
    line1: "Off Igbe Road, Banana Estate / Laara",
    line2: "Igbe-Laara, Ikorodu, Lagos State, Nigeria",
    landmark: "Walking distance from Laara Bus Stop & Igbe Laara Community Central Mosque",
    lga: "Igbogbo-Bayeku LCDA",
  },
  // TODO: confirm opening hours
  hours: "Mon – Sat · 8:00am – 6:00pm",
  partner: {
    name: "Greater Heights Tutorial Center",
    area: "Satellite Phase, Igbe-Laara, Ikorodu",
    serves: ["Igbe Lara", "Agunfoye", "Oreta", "Igbogbo", "Elepe"],
  },
  // TODO: replace with the live EduQuest CBT URL
  cbtUrl: "#",
};

export const navAnchors = [
  { label: "Exams Prep", href: "#services" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const navRoutes = [
  { label: "Programmes", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* Standing policies — stated verbatim across programme pages. */
export const policies = [
  "Group sessions only — every class learns together at the same pace.",
  "No study-abroad placement or visas — exam scores only, with referrals onward.",
  "Online means live group tutorials — never one-on-one.",
  "Fees confirmed during consultation — nothing published, no pre-commitment.",
];

export const exams = ["JAMB / UTME", "WAEC", "NECO", "GCE", "JUPEB", "IELTS", "TOEFL", "SAT", "GRE"];

/* `services` removed — superseded by src/lib/programs.ts (single source of
   truth for programme copy). Old copy preserved in git history. */

/* Stats band is rendered by the AkmanOS statistic-cards block —
   figures live in src/components/statistic-cards/constants.ts.
   TODO: confirm every number with ADJ before launch. */

/* DEMO — replace with real student stories (and real portraits in
   public/testimonials/) once gathered. */
export const testimonials = [
  {
    quote:
      "The CBT drills changed everything. By my third mock I was finishing with time to spare — JAMB felt like just another practice session.",
    name: "Demo Student",
    detail: "JAMB candidate, Igbe-Laara",
    exam: "JAMB",
    imageSrc: "/testimonials/demo-1.svg",
    demo: true,
  },
  {
    quote:
      "I joined the weekend group class for WAEC and the past-question marathons made the real papers look familiar. My sciences came out strong.",
    name: "Demo Student",
    detail: "WAEC candidate, Igbogbo",
    exam: "WAEC",
    imageSrc: "/testimonials/demo-2.svg",
    demo: true,
  },
  {
    quote:
      "They walked me from UTME through post-UTME screening to admission. My parents always knew exactly what the next step was.",
    name: "Demo Parent",
    detail: "Parent, Elepe",
    exam: "Admissions",
    imageSrc: "/testimonials/demo-3.svg",
    demo: true,
  },
];

export const faqs = [
  {
    q: "Where exactly are you located?",
    a: "Our office sits just off Igbe Road in the Banana Estate / Laara zone of Igbe-Laara, Ikorodu — within walking distance of Laara Bus Stop and the Igbe Laara Community Central Mosque. Our tutorial partner, Greater Heights Tutorial Center, is at Satellite Phase, Igbe-Laara.",
  },
  {
    q: "Do you offer physical classes, online classes, or both?",
    a: "Both. We run physical group classes at our Laara centre and live online group tutorials for students who can't attend in person. Note: we don't offer private one-on-one coaching — every class is a focused group session.",
  },
  {
    q: "Which exams do you prepare candidates for?",
    a: "JAMB/UTME, WAEC, NECO, GCE and JUPEB directly, plus IELTS, TOEFL, SAT and GRE in partnership with Greater Heights Tutorial Center. We also support exam registration and admission processing.",
  },
  {
    q: "Do you help with admission after the exams?",
    a: "Yes — admission processing is a core service. Post-UTME screening preparation, course and school selection, O-level blending advice, and follow-through until admission is secured.",
  },
  {
    q: "How do I start?",
    a: "Book a free consultation using the form below or chat with us on WhatsApp. We'll assess where you are, recommend a programme (physical or online), and get you into the next available cohort.",
  },
  {
    q: "Do you offer study abroad placement?",
    a: "No — we currently don't handle study abroad admissions or visas. Our international-exam prep (IELTS, TOEFL, SAT, GRE) gives you the scores you'll need, and we'll point you to trusted partners for the placement step.",
  },
];

export const programsIndexFaqs = [
  {
    q: "Which exam should my child prepare for first?",
    a: "It depends on their class. SS3 students typically face WAEC and NECO first, then JAMB/UTME. School leavers may add GCE or JUPEB. Book a free consultation and we'll map the exact sequence for your child's situation.",
  },
  {
    q: "Can my child switch programmes mid-term?",
    a: "Yes. If assessment shows a different exam needs priority — say JAMB over WAEC — we move the student into the right cohort. You never pay twice for the switch; fees follow the student, confirmed during consultation.",
  },
  {
    q: "Do you take complete beginners?",
    a: "Yes. Every programme starts with an assessment so the tutors know exactly where the student stands, and group placement matches their level. Beginners get foundation weeks before joining the main pace.",
  },
  {
    q: "My child lives outside Ikorodu. Can they still join?",
    a: "Yes — through the live online group tutorials, which follow the same syllabus, drills and mocks as the physical classes in Laara.",
  },
  {
    q: "Why don't you publish your fees?",
    a: "Because the right programme — and therefore the fee — depends on the student's exams, level and format. Fees are confirmed during the free consultation, before any commitment. No surprises, no pressure.",
  },
];

export const resultsFaqs = [
  {
    q: "Are these real results?",
    a: "The stories on this page are currently samples illustrating the outcomes our programmes target. Real, consented results with names, exams and scores replace them as each admission season concludes.",
  },
  {
    q: "Do you guarantee admission?",
    a: "No — and you should distrust any centre that does. What we guarantee is the preparation: syllabus coverage, timed drills, mocks, and follow-through on every admission step within our control.",
  },
  {
    q: "Can I see full score breakdowns?",
    a: "Yes. During your consultation we walk through detailed, consented result records from past candidates — every score shown is published with the candidate's (or parent's) written permission.",
  },
];

export const contactFaqs = [
  {
    q: "Can we just walk into the office?",
    a: "Yes. Walk-ins are welcome during opening hours — off Igbe Road, a short walk from Laara Bus Stop. Booking ahead on WhatsApp means a counsellor is ready for you when you arrive.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. Assessment, programme recommendation and fee confirmation all happen in the free consultation. You commit to nothing until you've seen the plan.",
  },
  {
    q: "Can we visit before committing?",
    a: "Absolutely — we encourage it. Come and see a live group class, meet the tutors, and ask past candidates' parents anything before you decide.",
  },
  {
    q: "How fast do you reply on WhatsApp?",
    a: "Within the same working day, usually much faster during opening hours. [OWNER: confirm reply-time promise]",
  },
];

/* About page — all OWNER facts. Never invent bios. */
export const story = {
  // TODO: founding year, founders, why Igbe-Laara
  paragraphs: [] as string[],
};
export const values = [
  {
    title: "Group-only by design",
    copy: "Every class learns together at the same pace, with the same teacher. No one is left behind in a corner and no one races ahead alone.",
  },
  {
    title: "Follow-through past results day",
    copy: "Coaching ends at the exam; our job doesn't. Admission processing carries every candidate from scores to matriculation.",
  },
  {
    title: "Honest about scope",
    copy: "No study-abroad placement, no one-on-one, no published fees we can't stand behind. What we don't do is stated as plainly as what we do.",
  },
  {
    title: "Local roots",
    copy: "Built for Igbe-Laara, Igbogbo and environs — the same quality of preparation available anywhere in Lagos, without leaving the community.",
  },
];
export const team: { name: string; role: string; subjects: string; photo: string }[] = [];
export const timeline: { year: string; event: string }[] = [];

export interface ResultRow {
  name: string;
  exam: string;
  year: string;
  score: string;
  area: string;
  programme: string;
}
/* TODO: real, consented result rows from the owner. */
export const results: ResultRow[] = [];

export const bookingExpectations = [
  "You message, call, or fill the form — whichever is easiest.",
  "We assess where the student stands: current class, target exams, weak subjects.",
  "We recommend a programme and cohort — physical or online — with fees confirmed upfront.",
];
