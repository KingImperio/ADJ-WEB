"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";

const interests = ["JAMB / UTME", "WAEC", "NECO / GCE", "JUPEB / Direct Entry", "IELTS / TOEFL / SAT / GRE", "Admission processing", "Not sure yet"];

export function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [mode, setMode] = useState("Physical class");
  const [note, setNote] = useState("");

  const href = `${site.whatsapp}?text=${encodeURIComponent(
    `Hello ADJ Educational Consultants! My name is ${name || "..."}. My number is ${phone || "..."}. I'm interested in: ${interest || "..."} (${mode}). ${note}`.trim(),
  )}`;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-1.5">
        <Label htmlFor="bk-name">Your name</Label>
        <Input id="bk-name" placeholder="e.g. Adaeze Okafor" value={name} onChange={(e) => setName(e.target.value)} className="border-zinc-200 bg-white" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bk-phone">Phone / WhatsApp number</Label>
        <Input id="bk-phone" placeholder="e.g. 0803 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="border-zinc-200 bg-white" />
      </div>
      <div className="grid gap-1.5">
        <Label>What do you need help with?</Label>
        <Select value={interest} onValueChange={(v) => setInterest(v ?? "")}>
          <SelectTrigger className="border-zinc-200 bg-white">
            <SelectValue placeholder="Choose a programme" />
          </SelectTrigger>
          <SelectContent className="border-zinc-200 bg-white">
            {interests.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label>Preferred mode</Label>
        <Select value={mode} onValueChange={(v) => setMode(v ?? "Physical class")}>
          <SelectTrigger className="border-zinc-200 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-zinc-200 bg-white">
            <SelectItem value="Physical class">Physical class (Laara)</SelectItem>
            <SelectItem value="Online class">Live online group</SelectItem>
            <SelectItem value="Not sure yet">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5 sm:col-span-2">
        <Label htmlFor="bk-note">Anything we should know? (optional)</Label>
        <Textarea id="bk-note" rows={3} placeholder="e.g. Writing JAMB next year, weak in Physics…" value={note} onChange={(e) => setNote(e.target.value)} className="border-zinc-200 bg-white" />
      </div>
      <div className="sm:col-span-2">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg", className: "w-full bg-gold font-semibold text-ink hover:bg-gold-soft sm:w-auto" })}
        >
          <Send className="mr-2 h-4 w-4" /> Send via WhatsApp
        </a>
        <p className="mt-3 text-xs text-zinc-500" role="status">
          Online booking with automatic follow-up is coming soon — for now your message lands directly with our
          counsellors on WhatsApp.
        </p>
      </div>
    </div>
  );
}
