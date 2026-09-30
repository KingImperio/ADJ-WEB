import { redirect } from "next/navigation";

/* The Stitch screens use "Programmes" as a homepage anchor rather than its own
   route. Keep /programmes working as a permanent redirect so the footer and
   any shared links still land on the index. */
export default function ProgrammesAlias() {
  redirect("/programs");
}
