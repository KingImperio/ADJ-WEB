/* AkmanOS navbar data file — wired to ADJ programmes (ids double as route keys
   for the header's onNavSelect lookup). Structure is verbatim AkmanOS. */
import type { NavItem } from "./types";

export const NAVBAR_BRAND_TITLE = "ADJ Educational Consultants";
export const NAVBAR_LOGO_SRC = "/adj-logo.png";
export const NAVBAR_SIGN_IN_LABEL = "Sign in";
export const NAVBAR_CTA_LABEL = "Book free consultation";

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: "programmes",
    label: "Programmes",
    type: "mega",
    featured: {
      title: "Free consultation",
      description: "Assessment, programme recommendation and fee confirmation before any commitment.",
      ctaLabel: "Book now",
    },
    columns: [
      {
        id: "ssce",
        title: "SS1–SS3 exams",
        links: [
          { id: "jamb", label: "JAMB / UTME Mastery", description: "CBT drills & mock exams" },
          { id: "waec", label: "WAEC Success Classes", description: "Core + electives, marathons" },
          { id: "neco", label: "NECO Coaching", description: "Internal + external tracks" },
          { id: "gce", label: "GCE O-Level", description: "The second route to results" },
        ],
      },
      {
        id: "post-secondary",
        title: "Post-secondary",
        links: [
          { id: "jupeb", label: "JUPEB & Direct Entry", description: "Skip 100 level, deliberately" },
          { id: "international", label: "International Exams", description: "IELTS · TOEFL · SAT · GRE", badge: "Partner" },
        ],
      },
      {
        id: "services",
        title: "Services",
        links: [
          { id: "admissions", label: "Admission Processing", description: "Scores to matriculation" },
          { id: "tutorials", label: "Group Tutorials", description: "Physical + live online" },
        ],
      },
    ],
  },
  { id: "results", label: "Results", type: "link" },
  { id: "about", label: "About", type: "link" },
  { id: "faq", label: "FAQ", type: "link" },
  { id: "contact", label: "Contact", type: "link" },
];
