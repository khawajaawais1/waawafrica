import { lang } from "next/root-params";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { defaultLocale, hasLocale, localizeHref, ogLocale, type Locale } from "./config";
import { en } from "./en";
import { fi } from "./fi";
import type { Dict } from "./types";

const dictionaries: Record<Locale, Dict> = { en, fi };

/** Current locale from the [lang] root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const l = await lang();
  return hasLocale(l) ? l : defaultLocale;
}

export const dictFor = (l: Locale): Dict => dictionaries[l];

export async function getT() {
  const l = await getLocale();
  return { t: dictionaries[l], locale: l, href: (p: string) => localizeHref(p, l) };
}

/** Page metadata with canonical + hreflang alternates for both languages. */
export function pageMeta(locale: Locale, path: string, title: string | undefined, description: string): Metadata {
  const url = (l: Locale) => localizeHref(path, l);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url(locale),
      languages: { en: url("en"), fi: url("fi"), "x-default": url("en") },
    },
    openGraph: {
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "en" ? "fi" : "en"]],
      url: url(locale),
      ...(title ? { title } : {}),
      description,
      type: "website",
      images: [{ url: "/images/og-logo.png", width: 512, height: 512, alt: "WaawAfrica Events" }],
    },
  };
}
