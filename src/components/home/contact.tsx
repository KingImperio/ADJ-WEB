"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { site } from "@/lib/site";

const interests = ["JAMB / UTME", "WAEC", "NECO / GCE", "JUPEB / Direct Entry", "IELTS / TOEFL / SAT / GRE", "Admission processing", "Not sure yet"];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [mode, setMode] = useState("Physical class");
  const [note, setNote] = useState("");

  const href = `${site.whatsapp}?text=${encodeURIComponent(
    `Hello ADJ Educational Consultants! My name is ${name || "..."}. My number is ${phone || "..."}. I'm interested in: ${interest || "..."} (${mode}). ${note}`.trim(),
  )}`;

  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">Free consultation</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
          Tell us where you are. We&apos;ll map the way forward.
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Fill this in and it opens WhatsApp with your message ready to send — or just walk into the office. First
          consultation is free.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-5">
          <Card className="border-white/10 bg-panel lg:col-span-3">
            <CardHeader>
              <h3 className="font-display text-lg font-bold text-white">Book your free consultation</h3>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="bk-name">Your name</Label>
                <Input id="bk-name" placeholder="e.g. Adaeze Okafor" value={name} onChange={(e) => setName(e.target.value)} className="border-white/15 bg-ink" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="bk-phone">Phone / WhatsApp number</Label>
                <Input id="bk-phone" placeholder="e.g. 0803 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="border-white/15 bg-ink" />
              </div>
              <div className="grid gap-1.5">
                <Label>What do you need help with?</Label>
                <Select value={interest} onValueChange={(v) => setInterest(v ?? "")}>
                  <SelectTrigger className="border-white/15 bg-ink">
                    <SelectValue placeholder="Choose a programme" />
                  </SelectTrigger>
                  <SelectContent className="border-white/15 bg-panel">
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
                  <SelectTrigger className="border-white/15 bg-ink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/15 bg-panel">
                    <SelectItem value="Physical class">Physical class (Laara)</SelectItem>
                    <SelectItem value="Online class">Live online group</SelectItem>
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="bk-note">Anything we should know? (optional)</Label>
                <Textarea id="bk-note" rows={3} placeholder="e.g. Writing JAMB next year, weak in Physics…" value={note} onChange={(e) => setNote(e.target.value)} className="border-white/15 bg-ink" />
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
                <p className="mt-3 text-xs text-slate-500">
                  Online booking with automatic follow-up is coming soon — for now your message lands directly with our
                  counsellors on WhatsApp.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Card className="border-white/10 bg-panel">
              <CardContent className="flex flex-col gap-3 pt-6 text-sm text-slate-300">
                <span className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    {site.address.line1}, {site.address.line2}
                    <span className="mt-1 block text-xs text-slate-500">{site.address.landmark}</span>
                  </span>
                </span>
                <a href={site.phoneHref} className="flex gap-2.5 hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="flex gap-2.5 hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.email}
                </a>
                <span className="flex gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.hours}
                </span>
              </CardContent>
            </Card>
            <div className="min-h-56 flex-1 overflow-hidden rounded-xl border border-white/10">
              <iframe
                title="Map — ADJ Educational Consultants, Igbe-Laara, Ikorodu"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.5000%2C6.5700%2C3.6000%2C6.6600&layer=mapnik&marker=6.6150%2C3.5500"
                className="h-full min-h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
