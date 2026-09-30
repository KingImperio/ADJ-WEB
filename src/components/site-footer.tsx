import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { site } from "@/lib/site";

/* Live programme links only — every href below resolves to a built route.
   (Legacy slugs gce/tutorials redirect; see next.config.ts.) */
const programmeLinks = [
  { label: "JAMB UTME Clinic", href: "/programs/jamb" },
  { label: "WAEC & NECO Intensive", href: "/programs/waec" },
  { label: "JUPEB Direct Entry", href: "/programs/jupeb" },
  { label: "International Examinations", href: "/programs/international" },
  { label: "Admissions Processing", href: "/programs/admissions" },
  { label: "Timed CBT Practice Lab", href: "/programs/cbt" },
];

/* Navy footer per the Stitch system: 5-col grid (brand spans 2) then a legal
   bar. `text-on-primary-container` is Stitch's muted-on-navy text. */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-outline-variant bg-primary text-on-primary">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/adj-logo.png"
                alt={`${site.name} logo`}
                width={676}
                height={369}
                className="h-10 w-10 rounded-lg border border-white/20 object-cover"
              />
              <span className="font-display text-headline-md font-bold tracking-tight text-on-primary">
                {site.name}
              </span>
            </div>
            <p className="max-w-sm text-body-sm text-on-primary-container">
              Ikorodu&rsquo;s premier preparatory academy for high-stakes examinations. Academic rigor,
              ethical clarity, and steadfast admissions mentorship until matriculation.
            </p>
            <div className="space-y-1 pt-2 text-body-sm text-surface-container-high">
              <div className="flex items-center gap-2">
                <Icon name="location_on" className="text-base text-secondary-fixed" />
                <span>Off Igbe Road, Banana Estate / Laara, Ikorodu, Lagos</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="call" className="text-base text-secondary-fixed" />
                <span>{site.phoneDisplay} | WhatsApp Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-label-md tracking-wider text-secondary-fixed uppercase">Programs</h4>
            <ul className="space-y-2 text-body-sm">
              {programmeLinks.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-on-primary-container transition-colors hover:text-on-primary hover:underline"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-label-md tracking-wider text-secondary-fixed uppercase">Local Coverage</h4>
            <ul className="space-y-2 text-body-sm">
              <li>
                <Link href="/contact" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Catchment: Igbe-Laara
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Catchment: Igbogbo &amp; Elepe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Catchment: Agunfoye &amp; Oreta
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Partner: {site.partner.name}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-label-md tracking-wider text-secondary-fixed uppercase">Admissions Code</h4>
            <ul className="space-y-2 text-body-sm">
              <li>
                <Link href="/contact" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Admissions Processing Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Terms &amp; Group-Only Scope Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-primary-container transition-colors hover:text-on-primary hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-primary-container pt-8 text-center text-body-sm text-on-primary-container md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. Off Igbe Road, Banana Estate / Laara, Ikorodu,
            Lagos. Coaching Until Matriculation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-label-sm">
            <span className="inline-flex items-center gap-1 text-secondary-fixed">
              <Icon name="gavel" className="text-[14px]" />
              <span>Registered Academic Consultancy</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
