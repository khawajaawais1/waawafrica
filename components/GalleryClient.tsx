"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Photo } from "@/lib/images";

export type GalleryItem = Omit<Photo, "src"> & { src: Photo["src"]; cat?: string };
export type GalleryT = { filter: string; all: string; cats: Record<string, string>; open: string; viewer: string; close: string; prev: string; next: string; more: string };

const ALL = "__all";
const fill = (s: string, k: string, v: string | number) => s.replace(`{${k}}`, String(v));

export default function GalleryClient({ items, filters = true, tone = "dark", t }: { items: GalleryItem[]; filters?: boolean; tone?: "dark" | "light"; t: GalleryT }) {
  const cats = useMemo(() => [ALL, ...Array.from(new Set(items.map((i) => i.cat).filter(Boolean) as string[]))], [items]);
  const [cat, setCat] = useState(ALL);
  const [limit, setLimit] = useState(12);
  const filtered = cat === ALL ? items : items.filter((i) => i.cat === cat);
  const shown = filtered.slice(0, limit);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => { setIndex(null); lastTrigger.current?.focus(); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => { dlg.removeEventListener("close", onClose); dlg.removeEventListener("keydown", onKey); };
  }, [step]);

  const current = index !== null ? shown[index] : null;
  const chip = tone === "dark" ? "ring-cream/20 text-cream/80 hover:text-cream" : "ring-ink/20 text-ink/70 hover:text-ink";

  return (
    <div>
      {filters && cats.length > 2 && (
        <div role="group" aria-label={t.filter} className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => { setCat(c); setLimit(12); }}
              className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-300 ${
                cat === c ? "bg-sun text-ink ring-sun" : chip
              }`}
            >
              {c === ALL ? t.all : t.cats[c] ?? c}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {shown.map((p, i) => (
          <li key={p.alt + cat} className="mb-3 break-inside-avoid sm:mb-4 fade-up" style={{ ["--d" as string]: `${Math.min(i, 12) * 40}ms` }}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-ink-3"
              aria-label={fill(t.open, "alt", p.alt)}
            >
              <Image
                src={p.src}
                alt=""
                quality={60}
                sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {p.cat && (
                <span className="eyebrow pointer-events-none absolute bottom-3 left-3 translate-y-2 text-[0.6rem] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {t.cats[p.cat] ?? p.cat}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {filtered.length > shown.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + 12)}
            className="btn-sweep rounded-full bg-sun px-7 py-3.5 font-bold text-ink [--sweep:var(--color-cream)]"
          >
            {fill(t.more, "n", filtered.length - shown.length)}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={t.viewer}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-cream backdrop:bg-ink/90"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        {current && (
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-12" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            <figure className="relative flex max-h-full flex-col items-center">
              <Image
                key={current.alt}
                src={current.src}
                alt={current.alt}
                sizes="90vw"
                loading="eager"
                className="fade-up h-auto max-h-[78dvh] w-auto max-w-full rounded-xl object-contain"
              />
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-cream/70">
                {current.alt} <span className="opacity-50">· {index! + 1}/{shown.length}</span>
              </figcaption>
            </figure>
            <button type="button" onClick={close} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-cream/10 text-2xl hover:bg-cream hover:text-ink" aria-label={t.close}>×</button>
            <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-xl hover:bg-sun hover:text-ink sm:left-6" aria-label={t.prev}>←</button>
            <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-xl hover:bg-sun hover:text-ink sm:right-6" aria-label={t.next}>→</button>
          </div>
        )}
      </dialog>
    </div>
  );
}
