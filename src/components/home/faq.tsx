import { MapPin, MonitorSmartphone, GraduationCap, BadgeCheck, MessageCircle, Globe } from "lucide-react";
import { BouncyAccordionList } from "@/components/bouncy-accordion";
import { faqs } from "@/lib/site";

const icons = [MapPin, MonitorSmartphone, GraduationCap, BadgeCheck, MessageCircle, Globe];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/10 bg-[#0a0e1c]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Questions parents ask us
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Everything you need to know before you visit.
        </h2>
        <div className="mt-8" data-faq>
          <BouncyAccordionList
            defaultValue="q-0"
            items={faqs.map((f, i) => {
              const LucideIcon = icons[i % icons.length];
              return {
                id: `q-${i}`,
                title: f.q,
                description: f.a,
                icon: <LucideIcon className="h-4 w-4" />,
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}
