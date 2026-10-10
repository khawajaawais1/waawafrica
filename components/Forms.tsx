"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

type Status = { state: "idle" | "sending" | "ok" | "error"; msg?: string };

async function submit(url: string, form: HTMLFormElement): Promise<Status> {
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { state: "error", msg: json.error || "Something went wrong. Please try again." };
    return { state: "ok", msg: json.message };
  } catch {
    return { state: "error", msg: "Network error — please check your connection and try again." };
  }
}

const field =
  "peer w-full rounded-2xl border border-ink/15 bg-white/70 px-4 pb-3 pt-6 text-ink placeholder-transparent outline-none transition focus:border-ink focus:bg-white focus-visible:outline-none focus:ring-4 focus:ring-sun/50 aria-[invalid=true]:border-ember";
const label =
  "pointer-events-none absolute left-4 top-2 text-[0.7rem] font-bold uppercase tracking-widest text-ink/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:uppercase peer-focus:tracking-widest";

const topics: Record<string, string> = {
  join: "Join the community",
  partner: "Partnership / sponsorship",
  events: "Events & tickets",
  workshop: "Book a workshop",
  performance: "Book a performance",
  humanity: "Support community work",
  volunteer: "Volunteer",
  bazaar: "Dakar Bazaar / sell with us",
  press: "Press & media",
  other: "Something else",
};

export function ContactForm() {
  const params = useSearchParams();
  const initial = params.get("topic") ?? "join";
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const errs: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(fd.get("email") || ""))) errs.email = "Please enter a valid email.";
    if (String(fd.get("message") || "").trim().length < 10) errs.message = "A few more words, please (10+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      f.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus({ state: "sending" });
    const s = await submit("/api/contact", f);
    setStatus(s);
    if (s.state === "ok") f.reset();
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" aria-describedby="form-status">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="relative">
        <input id="name" name="name" placeholder="Your name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        <label htmlFor="name" className={label}>Your name</label>
        {errors.name && <p id="name-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.name}</p>}
      </div>
      <div className="relative">
        <input id="email" name="email" type="email" placeholder="Email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        <label htmlFor="email" className={label}>Email</label>
        {errors.email && <p id="email-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.email}</p>}
      </div>
      <div className="relative">
        <input id="org" name="organisation" placeholder="Organisation" autoComplete="organization" className={field} />
        <label htmlFor="org" className={label}>Organisation (optional)</label>
      </div>
      <div className="relative">
        <select id="topic" name="topic" defaultValue={topics[initial] ? initial : "join"} className={`${field} appearance-none pr-10`}>
          {Object.entries(topics).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label htmlFor="topic" className="pointer-events-none absolute left-4 top-2 text-[0.7rem] font-bold uppercase tracking-widest text-ink/70">I’m reaching out about</label>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50">▾</span>
      </div>
      <div className="relative sm:col-span-2">
        <textarea id="message" name="message" rows={5} placeholder="Message" className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        <label htmlFor="message" className={label}>Tell us what you have in mind</label>
        {errors.message && <p id="message-err" className="mt-1.5 text-sm font-semibold text-ember">{errors.message}</p>}
      </div>
      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-status" role="status" aria-live="polite" className={`text-sm font-semibold ${status.state === "error" ? "text-ember" : "text-leaf"}`}>
          {status.state === "ok" && (status.msg || "Waaw! Message received — we’ll get back to you soon.")}
          {status.state === "error" && status.msg}
        </p>
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="btn-sweep inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-cream [--sweep:var(--color-ember)] disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true" className="arrow">→</span>
        </button>
      </div>
    </form>
  );
}

export function WaitlistForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [err, setErr] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = String(new FormData(f).get("email") || "");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("Please enter a valid email address.");
      f.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }
    setErr("");
    setStatus({ state: "sending" });
    const s = await submit("/api/waitlist", f);
    setStatus(s);
    if (s.state === "ok") f.reset();
  };
  const dark = tone === "dark";
  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-xl">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor="wl-email" className="sr-only">Email address</label>
      <div className={`flex flex-col gap-2 rounded-[1.75rem] p-2 ring-1 sm:flex-row sm:rounded-full ${dark ? "bg-cream/5 ring-cream/20" : "bg-white/70 ring-ink/15"}`}>
        <input
          id="wl-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          aria-invalid={!!err}
          aria-describedby="wl-status"
          className={`min-w-0 flex-1 rounded-full bg-transparent px-5 py-3.5 outline-none ${dark ? "text-cream placeholder:text-cream/40" : "text-ink placeholder:text-ink/40"}`}
        />
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="btn-sweep rounded-full bg-sun px-7 py-3.5 font-bold text-ink [--sweep:var(--color-cream)] disabled:opacity-60"
        >
          {status.state === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <p id="wl-status" role="status" aria-live="polite" className={`mt-3 min-h-6 px-4 text-sm font-semibold ${err || status.state === "error" ? (dark ? "text-cream" : "text-ember") : dark ? "text-sun" : "text-leaf"}`}>
        {(err || status.state === "error") && <span aria-hidden="true">⚠ </span>}
        {err || (status.state === "ok" ? status.msg || "Waaw! You’re on the list — we’ll notify you at launch." : status.state === "error" ? status.msg : "")}
      </p>
    </form>
  );
}
