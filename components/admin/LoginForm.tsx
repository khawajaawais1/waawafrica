"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { login, type FormState } from "@/app/admin/actions";

export default function LoginForm({ askEmail }: { askEmail: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(login, {});
  // Submit manually so the fields aren't cleared when the password is wrong
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {askEmail && (
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold">Email</label>
          <input id="email" name="email" type="email" autoComplete="username" required className="adm-input" />
        </div>
      )}
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-bold">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="adm-input" />
      </div>
      <p role="alert" aria-live="polite" className="min-h-5 text-sm font-semibold text-ember">{state.error}</p>
      <button type="submit" disabled={pending} className="w-full rounded-full bg-ink px-6 py-4 font-bold text-cream transition hover:bg-ember disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
