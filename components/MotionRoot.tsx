"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One lightweight observer for the whole site:
 * - reveals [data-reveal] / [data-curtain] elements as they enter the viewport
 * - drives subtle [data-parallax] translate effects (desktop + motion allowed only)
 * Work is deferred until the browser is idle so it never competes with first paint.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = "true";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), [data-curtain]:not([data-in])")
        .forEach((el) => io.observe(el));

    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 400 }) : setTimeout(cb, 120);
    idle(scan);

    // Parallax — cached element list, rAF-throttled, transform only
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    let raf = 0;
    let els: HTMLElement[] = [];
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;
        for (const el of els) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const speed = parseFloat(el.dataset.parallax || "0.1");
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1)}px, 0)`;
        }
      });
    };
    if (!reduce && desktop) {
      idle(() => {
        els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
        if (els.length) {
          onScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
        }
      });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
