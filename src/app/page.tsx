"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { resolveNavHref } from "@/lib/nav";
import { site } from "@/lib/site";

/* Temporary stub while the site is rebuilt exclusively from AkmanOS + shadcn
   blocks. Pages compose blocks and pass data — no hand-written components. */
export default function Home() {
  const router = useRouter();
  const go = (itemId: string, linkId?: string) => {
    const href = resolveNavHref(itemId, linkId);
    if (href) router.push(href);
  };
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <div className="pt-3">
        <Navbar showSignIn={false} onNavSelect={go} onCta={() => router.push("/contact")} logoAlt={`${site.name} logo`} />
      </div>
      <p className="py-24 text-center font-mono text-sm tracking-wide text-zinc-500">
        ADJ Educational Consultants — rebuilding from AkmanOS + shadcn blocks.
      </p>
    </div>
  );
}
