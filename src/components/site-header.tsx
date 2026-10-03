import { getContact } from "@/lib/content";
import { ScrollNav } from "@/components/scroll-nav";

export async function SiteHeader() {
  const site = await getContact();
  return (
    <ScrollNav whatsapp={site.whatsapp} name={site.name} />
  );
}
