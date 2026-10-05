import { getContact } from "@/lib/content";
import { BottomBarClient } from "@/components/bottom-bar-client";

/* Sticky mobile bottom action bar: one tap to WhatsApp or book. */
export async function BottomBar() {
  const contact = await getContact();
  return <BottomBarClient whatsapp={contact.whatsapp} />;
}
