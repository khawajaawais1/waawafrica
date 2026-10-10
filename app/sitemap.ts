import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/events";
import { localizeHref, locales } from "@/lib/i18n/config";
import { nav, site } from "@/lib/site";

/** Every page in English and Finnish, with hreflang alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [...nav.map((n) => n.href as string), ...(await getPublished()).map((e) => `/events/${e.slug}`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}${localizeHref(p, l)}`,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : p.startsWith("/events/") ? 0.7 : 0.8,
      alternates: { languages: { en: `${site.url}${localizeHref(p, "en")}`, fi: `${site.url}${localizeHref(p, "fi")}` } },
    }))
  );
}
