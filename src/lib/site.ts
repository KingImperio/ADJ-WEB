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

export const nav = [
  { label: "Exams Prep", href: "#services" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const exams = ["JAMB / UTME", "WAEC", "NECO", "GCE", "JUPEB", "IELTS", "TOEFL", "SAT", "GRE"];

export const services = [
  {
    exam: "JAMB / UTME",
    title: "JAMB Mastery Programme",
    copy: "Syllabus-paced lessons, timed CBT drills on our own practice platform, and full mock exams until your speed and accuracy hold under pressure.",
    points: ["CBT practice & timed drills", "Full-length mock exams", "Admission cutoff guidance"],
  },
  {
    exam: "WAEC · NECO · GCE",
    title: "SSCE Success Classes",
    copy: "Small-group coaching across core and elective subjects, past-question marathons, and practical preparation for science candidates.",
    points: ["Past-question marathons", "Practical & theory balance", "Registration support"],
  },
  {
    exam: "JUPEB · Direct Entry",
    title: "A-Level & Direct Entry Path",
    copy: "Guided preparation for JUPEB and direct-entry routes into 200 level — subject combos, reading plans, and application timing.",
    points: ["Subject-combo advice", "Structured reading plans", "Application timing"],
  },
  {
    exam: "IELTS · TOEFL · SAT · GRE",
    title: "International Exams",
    copy: "Delivered in partnership with Greater Heights Tutorial Center — test strategy, band-score targeting, and speaking/writing feedback.",
    points: ["Band-score targeting", "Speaking & writing feedback", "Test-day strategy"],
  },
  {
    exam: "Admissions",
    title: "Admission Processing",
    copy: "Post-UTME screening prep, O-level result blending, course and school selection, and follow-through until your name is on the list.",
    points: ["Post-UTME screening prep", "Course & school selection", "Follow-through to admission"],
  },
  {
    exam: "Physical + Online",
    title: "Group Tutorials",
    copy: "Evening and weekend group classes at our Laara centre, plus live online group tutorials for students who can't be there in person.",
    points: ["Physical classes in Laara", "Live online group sessions", "Weekend intensive cohorts"],
  },
];

/* TODO: confirm real figures with ADJ before launch */
export const stats = [
  { value: "500+", label: "Candidates coached" },
  { value: "9", label: "Exams we prepare you for" },
  { value: "2", label: "Ways to learn — physical & online" },
  { value: "100%", label: "Focus on exams & admissions" },
];

/* DEMO — replace with real student stories once gathered. */
export const testimonials = [
  {
    quote:
      "The CBT drills changed everything. By my third mock I was finishing with time to spare — JAMB felt like just another practice session.",
    name: "Demo Student",
    detail: "JAMB candidate, Igbe-Laara",
    demo: true,
  },
  {
    quote:
      "I joined the weekend group class for WAEC and the past-question marathons made the real papers look familiar. My sciences came out strong.",
    name: "Demo Student",
    detail: "WAEC candidate, Igbogbo",
    demo: true,
  },
  {
    quote:
      "They walked me from UTME through post-UTME screening to admission. My parents always knew exactly what the next step was.",
    name: "Demo Parent",
    detail: "Parent, Elepe",
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
