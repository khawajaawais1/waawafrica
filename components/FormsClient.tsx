"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/i18n/types";

export type FormsT = Dict["forms"];
type Status = "idle" | "sending" | "ok" | "error" | "network";

async function submit(url: string, form: HTMLFormElement, lang: string): Promise<Status> {
  const data = { ...Object.fromEntries(new FormData(form).entries()), lang };
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.ok ? "ok" : "error";
  } catch {
    return "network";
  }
}

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

const field =
  "peer w-full rounded-2xl border border-ink/15 bg-white/70 px-4 pb-3 pt-6 text-base text-ink placeholder-transparent outline-none transition focus:border-ink focus:bg-white focus-visible:outline-none focus:ring-4 focus:ring-sun/50 aria-[invalid=true]:border-ember";
const label =
  "pointer-events-none absolute left-4 right-4 top-2 truncate text-[0.7rem] font-bold uppercase tracking-widest text-ink/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-widest";

export function ContactFormClient({ t, lang }: { t: FormsT; lang: string }) {
  const params = useSearchParams();
  const topicKeys = Object.keys(t.topics) as (keyof FormsT["topics"])[];
  const initial = params.get("topic") ?? "join";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const errs: typeof errors = {};
    if (!String(fd.get("name") || "").trim()) errs.name = t.errName;
    if (!isEmail(String(fd.get("email") || ""))) errs.email = t.errEmail;
    if (String(fd.get("message") || "").trim().length < 10) errs.message = t.errMessage;
    setErrors(errs);
    if (Object.keys(errs).length) {
      f.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const s = await submit("/api/contact", f, lang);
    setStatus(s);
    if (s === "ok") f.reset();
  };

  const statusText = status === "ok" ? t.ok : status === "error" ? t.fail : status === "network" ? t.network : "";

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby="form-status">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="relative">
        <input id="name" name="name" placeholder={t.name} autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        <label htmlFor="name" className={label}>{t.name}</label>
        {errors.name && <p id="name-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.name}</p>}
      </div>
      <div className="relative">
        <input id="email" name="email" type="email" placeholder={t.email} autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        <label htmlFor="email" className={label}>{t.email}</label>
        {errors.email && <p id="email-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.email}</p>}
      </div>
      <div className="relative">
        <input id="org" name="organisation" placeholder={t.org} autoComplete="organization" className={field} />
        <label htmlFor="org" className={label}>{t.org}</label>
      </div>
      <div className="relative">
        <select id="topic" name="topic" defaultValue={(topicKeys as string[]).includes(initial) ? initial : "join"} className={`${field} appearance-none pr-10`}>
          {topicKeys.map((k) => <option key={k} value={k}>{t.topics[k]}</option>)}
        </select>
        <label htmlFor="topic" className="pointer-events-none absolute left-4 right-10 top-2 truncate text-[0.7rem] font-bold uppercase tracking-widest text-ink/70">{t.topic}</label>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50">▾</span>
      </div>
      <div className="relative sm:col-span-2">
        <textarea id="message" name="message" rows={5} placeholder={t.message} className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        <label htmlFor="message" className={label}>{t.message}</label>
        {errors.message && <p id="message-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.message}</p>}
      </div>
      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-status" role="status" aria-live="polite" className={`text-sm font-semibold ${status === "ok" ? "text-leaf" : "text-ember"}`}>
          {statusText}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-sweep inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-cream [--sweep:var(--color-ember)] disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.send} <span aria-hidden="true" className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}

export function WaitlistFormClient({ tone = "dark", t, lang }: { tone?: "dark" | "light"; t: FormsT; lang: string }) {
  const id = useId(); // unique per form — the Bazaar page has two waitlist forms
  const inputId = `wl-email-${id}`;
  const statusId = `wl-status-${id}`;
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!isEmail(String(new FormData(f).get("email") || ""))) {
      setErr(t.wlErr);
      f.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }
    setErr("");
    setStatus("sending");
    const s = await submit("/api/waitlist", f, lang);
    setStatus(s);
    if (s === "ok") f.reset();
  };

  const dark = tone === "dark";
  const isErr = !!err || status === "error" || status === "network";
  const msg = err || (status === "ok" ? t.wlOk : status === "error" ? t.fail : status === "network" ? t.network : "");

  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-xl">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor={inputId} className="sr-only">{t.wlEmail}</label>
      <div className={`flex flex-col gap-2 rounded-[1.75rem] p-2 ring-1 sm:flex-row sm:rounded-full ${dark ? "bg-cream/5 ring-cream/20" : "bg-white/70 ring-ink/15"}`}>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.wlPlaceholder}
          aria-invalid={!!err}
          aria-describedby={statusId}
          className={`min-w-0 flex-1 rounded-full bg-transparent px-5 py-3.5 text-base outline-none ${dark ? "text-cream placeholder:text-cream/40" : "text-ink placeholder:text-ink/40"}`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-sweep whitespace-nowrap rounded-full bg-sun px-7 py-3.5 font-bold text-ink [--sweep:var(--color-cream)] disabled:opacity-60"
        >
          {status === "sending" ? t.wlJoining : t.wlJoin}
        </button>
      </div>
      <p id={statusId} role="status" aria-live="polite" className={`mt-3 min-h-6 px-4 text-sm font-semibold ${isErr ? (dark ? "text-cream" : "text-ember") : dark ? "text-sun" : "text-leaf"}`}>
        {isErr && msg && <span aria-hidden="true">⚠ </span>}
        {msg}
      </p>
    </form>
  );
}
