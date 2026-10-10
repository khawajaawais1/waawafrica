/** Locale settings shared by proxy, server and client code (no server-only imports here). */
export const locales = ["en", "fi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "lang";

export const hasLocale = (v: string | undefined | null): v is Locale => !!v && (locales as readonly string[]).includes(v);

/** Path without locale prefix → path for that locale. English has no prefix: /about, Finnish: /fi/about. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href; // external, mailto:, #hash, ?query
  if (/^\/(api|admin|images|video|_next)(\/|$)/.test(href)) return href;
  if (locale === defaultLocale) return href;
  if (href === "/" ) return "/fi";
  if (/^\/[?#]/.test(href)) return `/fi${href.slice(1)}`;
  return `/fi${href}`;
}

/** Browser path (/fi/about or /about) → path without the locale prefix (/about). */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(en|fi)(?=\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest === "" ? "/" : rest;
}

export const htmlLang: Record<Locale, string> = { en: "en", fi: "fi" };
export const intlLocale: Record<Locale, string> = { en: "en-GB", fi: "fi-FI" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", fi: "fi_FI" };
