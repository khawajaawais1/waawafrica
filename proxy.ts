import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing
 *  /about        → English (served from /en/about, URL stays clean)
 *  /fi/about     → Finnish
 *  /en/about     → redirected to /about (and remembers English)
 * First visit without a saved choice: Finnish browsers are sent to /fi.
 * The choice is remembered in the `lang` cookie (set by the language switcher too).
 */
const COOKIE = "lang";
const YEAR = 60 * 60 * 24 * 365;

function prefersFinnish(header: string | null) {
  if (!header) return false;
  const langs = header
    .split(",")
    .map((p) => {
      const [tag, q] = p.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const top = langs.find((l) => l.tag.startsWith("fi") || l.tag.startsWith("en") || l.tag === "*");
  return !!top && top.tag.startsWith("fi");
}

const isPageNavigation = (req: NextRequest) =>
  req.headers.get("sec-fetch-dest") === "document" || (!req.headers.get("rsc") && !req.headers.get("next-router-prefetch") && req.method === "GET");

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // /fi/... → Finnish, remember the choice on real page loads
  if (pathname === "/fi" || pathname.startsWith("/fi/")) {
    const res = NextResponse.next();
    if (req.cookies.get(COOKIE)?.value !== "fi" && isPageNavigation(req)) res.cookies.set(COOKIE, "fi", { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  // /en/... → canonical unprefixed URL, remember English
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(COOKIE, "en", { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  // Unprefixed → English, unless this visitor prefers Finnish
  const saved = req.cookies.get(COOKIE)?.value;
  const wantsFi = saved === "fi" || (!saved && isPageNavigation(req) && prefersFinnish(req.headers.get("accept-language")));
  if (wantsFi && req.headers.get("sec-fetch-dest") === "document") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/fi" : `/fi${pathname}`;
    url.search = search;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(COOKIE, "fi", { path: "/", maxAge: YEAR, sameSite: "lax" });
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API, admin, Next internals and any file with an extension (images, video, icons, sitemap.xml, robots.txt…)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\.[\\w]+$).*)"],
};
