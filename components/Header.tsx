"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled || open ? "bg-ink/90 shadow-[0_1px_0_rgb(246_237_220/0.08)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 shrink-0" aria-label="WaawAfrica — home">
            <Logo priority className="h-12 w-auto md:h-14" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive(n.href) ? "bg-cream/10 text-sun" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact?topic=join"
              className="btn-sweep hidden rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-ink [--sweep:var(--color-cream)] sm:inline-flex"
            >
              Join Us
            </Link>
            <button
              ref={btnRef}
              type="button"
              className="relative z-10 grid size-11 place-items-center rounded-full ring-1 ring-cream/20 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-[var(--header-h)] overflow-y-auto bg-ink lg:hidden"
      >
        <div aria-hidden="true" className="kente h-1.5 w-full" />
        <nav aria-label="Mobile" className="container-x py-8">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.href} className="fade-up" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-cream/10 py-4 font-display text-4xl font-extrabold tracking-tight ${
                    isActive(n.href) ? "text-sun" : "text-cream"
                  }`}
                >
                  {n.label}
                  <span aria-hidden="true" className="text-xl opacity-40">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact?topic=join" className="rounded-full bg-sun px-6 py-3.5 font-bold text-ink">Join Us</Link>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full px-6 py-3.5 font-bold ring-1 ring-cream/30">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
