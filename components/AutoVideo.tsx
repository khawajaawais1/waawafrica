"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; className?: string; eager?: boolean };

/**
 * Muted looping video.
 * - Never downloads before the page has finished loading (keeps first paint fast).
 * - Plays only while visible; pauses off-screen.
 * - No autoplay for reduced-motion users or Data Saver connections (poster only).
 */
export default function AutoVideo({ src, poster, label, className = "", eager }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Lazy poster: only fetch the still frame when the video approaches the viewport
    const posterIO = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.poster = poster; posterIO.disconnect(); }
    }, { rootMargin: "600px 0px" });
    if (!eager) posterIO.observe(v);
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return () => posterIO.disconnect();

    let io: IntersectionObserver | undefined;
    const start = () => {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            if (!v.src) v.src = src;
            v.play().catch(() => {});
          } else v.pause();
        },
        { threshold: 0.2, rootMargin: eager ? "0px" : "200px 0px" }
      );
      io.observe(v);
    };
    const kick = () => ("requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300));
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => {
      window.removeEventListener("load", kick);
      posterIO.disconnect();
      io?.disconnect();
    };
  }, [src, eager, poster]);

  return (
    <video
      ref={ref}
      className={`h-full w-full bg-ink-3 object-cover ${className}`}
      poster={eager ? poster : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
