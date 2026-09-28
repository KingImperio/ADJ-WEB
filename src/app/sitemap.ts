import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { programSlugs } from "@/lib/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/programs", "/results", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/programs" ? 0.9 : 0.8,
  }));
  for (const slug of programSlugs) {
    entries.push({
      url: `${base}/programs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }
  return entries;
}
