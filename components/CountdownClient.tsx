"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export type CountdownT = { label: string; days: string; hours: string; min: string; sec: string; passed: string; live: string };

export default function CountdownClient({ to, endISO, tone = "dark", t }: { to: string; endISO?: string; tone?: "dark" | "light"; t: CountdownT }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(to).getTime();
  const end = endISO ? new Date(endISO).getTime() : target;
  const box = tone === "dark" ? "bg-cream/5 ring-cream/10" : "bg-ink/5 ring-ink/10";

  if (now !== null && now > end) return <p className="font-display text-2xl font-bold">{t.passed}</p>;
  if (now !== null && now >= target) return <p className="font-display text-2xl font-bold text-sun">{t.live}</p>;

  const p = now === null ? null : parts(target - now);
  const units: [keyof NonNullable<typeof p>, string][] = [["d", t.days], ["h", t.hours], ["m", t.min], ["s", t.sec]];
  return (
    <div role="timer" aria-label={t.label} className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map(([k, label]) => (
        <div key={k} className={`rounded-2xl px-2 py-3 text-center ring-1 ${box}`}>
          <span className="block font-display text-3xl font-extrabold tabular-nums sm:text-4xl" aria-hidden={k === "s" || undefined}>
            {p ? String(p[k]).padStart(2, "0") : "--"}
          </span>
          <span className="eyebrow text-[0.62rem] opacity-60">{label}</span>
        </div>
      ))}
    </div>
  );
}
