"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { site } from "@/lib/site";

/* Header shell: sticky chrome stays ours; the nav itself is the AkmanOS
   navbar block (mega menu + mobile drawer built in). */
const ROUTES: Record<string, string> = {
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

export function SiteHeader() {
  const router = useRouter();

  const go = (itemId: string, linkId?: string) => {
    if (itemId === "programmes" && linkId === "featured") {
      router.push("/contact");
      return;
    }
    const href = ROUTES[linkId ?? itemId] ?? ROUTES[itemId];
    if (href) router.push(href);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <Navbar
          showSignIn={false}
          onNavSelect={go}
          onCta={() => router.push("/contact")}
          logoAlt={`${site.name} logo`}
        />
      </div>
    </div>
  );
}
