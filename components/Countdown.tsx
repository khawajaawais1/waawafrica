"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export default function Countdown({ to, endISO, tone = "dark" }: { to: string; endISO?: string; tone?: "dark" | "light" }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(to).getTime();
  const end = endISO ? new Date(endISO).getTime() : target;
  const box = tone === "dark" ? "bg-cream/5 ring-cream/10" : "bg-ink/5 ring-ink/10";

  if (now !== null && now > end) return <p className="font-display text-2xl font-bold">This night has passed — see you at the next one.</p>;
  if (now !== null && now >= target) return <p className="font-display text-2xl font-bold text-sun">Happening right now. Come through!</p>;

  const p = now === null ? null : parts(target - now);
  const units: [keyof NonNullable<typeof p>, string][] = [["d", "Days"], ["h", "Hours"], ["m", "Min"], ["s", "Sec"]];
  return (
    <div role="timer" aria-label="Time until the event starts" className="grid grid-cols-4 gap-2 sm:gap-3">
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
