"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { LOCALE_COOKIE, localizeHref, stripLocale, type Locale } from "@/lib/i18n/config";
import { nav, socialLinks, type NavKey } from "@/lib/site";
import { SocialIcon } from "./SocialIcons";
import Logo from "./Logo";

type HeaderT = {
  nav: Record<NavKey, string>;
  joinUs: string;
  homeAria: string;
  openMenu: string;
  closeMenu: string;
  mainNav: string;
  mobileNav: string;
  language: string;
  langNames: Record<Locale, string>;
  newTab: string;
};

/** Where the language switch should go: same page in the other language (keeps ?query and #hash). */
function switchHref(base: string, to: Locale) {
  // English goes via /en/... so the proxy saves the choice and redirects to the clean URL
  return to === "en" ? (base === "/" ? "/en" : `/en${base}`) : localizeHref(base, "fi");
}

function LangSwitch({ locale, base, t, className = "" }: { locale: Locale; base: string; t: HeaderT; className?: string }) {
  const go = (to: Locale) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (to === locale) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
    const target = to === "en" ? base : localizeHref(base, "fi");
    window.location.assign(target + window.location.search + window.location.hash);
  };
  return (
    <div role="group" aria-label={t.language} className={`flex items-center rounded-full bg-cream/10 p-1 text-xs font-extrabold ring-1 ring-cream/15 ${className}`}>
      {(["en", "fi"] as const).map((l) => (
        <a
          key={l}
          href={switchHref(base, l)}
          hrefLang={l}
          lang={l}
          onClick={go(l)}
          aria-current={l === locale ? "true" : undefined}
          title={t.langNames[l]}
          className={`grid h-8 min-w-9 place-items-center rounded-full px-2.5 uppercase transition-colors ${
            l === locale ? "bg-sun text-ink" : "text-cream/80 hover:text-cream"
          }`}
        >
          <span aria-hidden="true">{l}</span>
          <span className="sr-only">{t.langNames[l]}</span>
        </a>
      ))}
    </div>
  );
}

export default function Header({ locale, t }: { locale: Locale; t: HeaderT }) {
  const pathname = usePathname();
  const base = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const L = (href: string) => localizeHref(href, locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? base === "/" : base.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled || open ? "bg-ink/90 shadow-[0_1px_0_rgb(246_237_220/0.08)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href={L("/")} className="relative z-10 shrink-0" aria-label={t.homeAria}>
            <Logo priority className="h-12 w-auto md:h-14" />
          </Link>

          <nav aria-label={t.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={L(n.href)}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive(n.href) ? "bg-cream/10 text-sun" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {t.nav[n.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch locale={locale} base={base} t={t} />
            <Link
              href={L("/contact?topic=join")}
              className="btn-sweep hidden whitespace-nowrap rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-ink [--sweep:var(--color-cream)] sm:inline-flex"
            >
              {t.joinUs}
            </Link>
            <button
              ref={btnRef}
              type="button"
              className="relative z-10 grid size-11 place-items-center rounded-full ring-1 ring-cream/20 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.closeMenu : t.openMenu}
              onClick={() => setOpen((o) => !o)}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet panel */}
      <div id="mobile-menu" ref={panelRef} hidden={!open} className="fixed inset-0 top-[var(--header-h)] overflow-y-auto bg-ink xl:hidden">
        <div aria-hidden="true" className="kente h-1.5 w-full" />
        <nav aria-label={t.mobileNav} className="container-x py-8">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.href} className="fade-up" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <Link
                  href={L(n.href)}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-center justify-between gap-4 border-b border-cream/10 py-4 font-display text-[clamp(1.9rem,8vw,2.5rem)] font-extrabold tracking-tight ${
                    isActive(n.href) ? "text-sun" : "text-cream"
                  }`}
                >
                  {t.nav[n.key]}
                  <span aria-hidden="true" className="text-xl opacity-40">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={L("/contact?topic=join")} className="rounded-full bg-sun px-6 py-3.5 font-bold text-ink">{t.joinUs}</Link>
            <ul className="flex gap-2">
              {socialLinks.map((sl) => (
                <li key={sl.key}>
                  <a
                    href={sl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sl.label} ${t.newTab}`}
                    className="grid size-12 place-items-center rounded-full ring-1 ring-cream/30 transition-colors hover:bg-sun hover:text-ink"
                  >
                    <SocialIcon name={sl.key} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
