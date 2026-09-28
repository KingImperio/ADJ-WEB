import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";

export function ProgramCta({ headline, detail }: { headline: string; detail: string }) {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="mx-auto max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">{headline}</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-400">{detail}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({ size: "lg", className: "bg-cobalt font-semibold text-white hover:bg-cobalt-deep" })}>
            Book a free consultation <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", variant: "outline", className: "border-white/20 bg-transparent font-semibold text-white hover:bg-white/10" })}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
