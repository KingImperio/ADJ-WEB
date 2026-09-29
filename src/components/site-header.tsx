"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { resolveNavHref } from "@/lib/nav";
import { site } from "@/lib/site";

/* Header: AkmanOS navbar block + route lookup. Sticky positioning only. */
export function SiteHeader() {
  const router = useRouter();
  const go = (itemId: string, linkId?: string) => {
    const href = resolveNavHref(itemId, linkId);
    if (href) router.push(href);
  };
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-3 pb-3">
        <Navbar showSignIn={false} onNavSelect={go} onCta={() => router.push("/contact")} logoAlt={`${site.name} logo`} />
      </div>
    </div>
  );
}
