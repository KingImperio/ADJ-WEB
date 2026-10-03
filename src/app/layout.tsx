import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BottomBar } from "@/components/bottom-bar";
import { site } from "@/lib/site";

/* Fonts per the Stitch design system: Source Serif 4 for every heading,
   Plus Jakarta Sans for body/UI, Material Symbols Outlined for icons.
   Self-hosted latin subsets — see docs/STITCH-DESIGN-SYSTEM.md. */
const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-sans",
  weight: "400 800",
  display: "swap",
});
const serif = localFont({
  src: "../../public/fonts/source-serif-4-latin.woff2",
  variable: "--font-display",
  weight: "400 700",
  display: "swap",
});
const symbols = localFont({
  src: "../../public/fonts/material-symbols-outlined.woff2",
  variable: "--font-symbols",
  display: "block",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.short} Educational Consultants`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  icons: { icon: "/adj-icon.png", apple: "/adj-icon.png" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Ikorodu",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  areaServed: ["Igbe-Laara", "Agunfoye", "Oreta", "Igbogbo", "Elepe", "Ikorodu"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${serif.variable} ${symbols.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader />
        <main className="pb-24 md:pb-0">{children}</main>
        <SiteFooter />
        <BottomBar />
      </body>
    </html>
  );
}
