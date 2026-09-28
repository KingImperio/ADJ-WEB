import { FaqBlock } from "@/components/sections/faq-block";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Questions parents ask us
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-zinc-900 sm:text-4xl">
          Everything you need to know before you visit.
        </h2>
        <div className="mt-8">
          <FaqBlock faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
