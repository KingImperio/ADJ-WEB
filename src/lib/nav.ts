/* Route lookup for the AkmanOS navbar callbacks (data, not a component). */
export const NAV_ROUTES: Record<string, string> = {
  brand: "/",
  programmes: "/programs",
  jamb: "/programs/jamb",
  waec: "/programs/waec",
  neco: "/programs/neco",
  gce: "/programs/gce",
  jupeb: "/programs/jupeb",
  international: "/programs/international",
  admissions: "/programs/admissions",
  tutorials: "/programs/tutorials",
  results: "/results",
  about: "/about",
  faq: "/#faq",
  contact: "/contact",
};

export function resolveNavHref(itemId: string, linkId?: string): string | null {
  if (itemId === "programmes" && linkId === "featured") return "/contact";
  return NAV_ROUTES[linkId ?? itemId] ?? NAV_ROUTES[itemId] ?? null;
}
