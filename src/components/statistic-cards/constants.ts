/* AkmanOS statistic-cards data file — wired to ADJ figures.
   TODO: confirm every number with ADJ before launch (all demo). */

export const GROWTH_BADGE_POSITIVE = {
  background: "#c0f21e",
  text: "#1f3a08",
} as const;

export const STAT_CARDS = [
  {
    key: "candidates",
    label: "Candidates coached",
    value: 500,
    growth: 18.2,
  },
  {
    key: "cohorts",
    label: "Group cohorts run",
    value: 40,
    growth: 25.0,
  },
  {
    key: "mocks",
    label: "Mock exams conducted",
    value: 320,
    growth: 42.1,
  },
  {
    key: "admissions",
    label: "Admissions secured",
    value: 180,
    growth: 15.4,
  },
] as const;

export type StatCardKey = (typeof STAT_CARDS)[number]["key"];
