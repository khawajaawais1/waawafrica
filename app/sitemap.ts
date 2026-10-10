import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/events";
import { nav, site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = nav.map((n) => ({ url: `${site.url}${n.href}`, changeFrequency: "weekly" as const, priority: n.href === "/" ? 1 : 0.8 }));
  const events = (await getPublished()).map((e) => ({ url: `${site.url}/events/${e.slug}`, lastModified: e.updatedAt, priority: 0.7 }));
  return [...pages, ...events];
}
