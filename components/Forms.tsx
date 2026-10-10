import { Suspense } from "react";
import { getT } from "@/lib/i18n/server";
import { ContactFormClient, WaitlistFormClient } from "./FormsClient";

export async function ContactForm() {
  const { t, locale } = await getT();
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-ink/5" />}>
      <ContactFormClient t={t.forms} lang={locale} />
    </Suspense>
  );
}

export async function WaitlistForm({ tone }: { tone?: "dark" | "light" }) {
  const { t, locale } = await getT();
  return <WaitlistFormClient t={t.forms} lang={locale} tone={tone} />;
}
