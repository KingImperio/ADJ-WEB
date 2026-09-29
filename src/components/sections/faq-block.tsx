import { HelpCircle } from "lucide-react";
import { BouncyAccordionList } from "@/components/bouncy-accordion";

/* FAQ glue: AkmanOS bouncy-accordion fed by faqs data. */
export function FaqBlock({ faqs, defaultOpen = 0 }: { faqs: { q: string; a: string }[]; defaultOpen?: number }) {
  return (
    <BouncyAccordionList
      defaultValue={`q-${defaultOpen}`}
      items={faqs.map((f, i) => ({
        id: `q-${i}`,
        title: f.q,
        description: f.a,
        icon: <HelpCircle className="h-4 w-4" />,
      }))}
    />
  );
}
