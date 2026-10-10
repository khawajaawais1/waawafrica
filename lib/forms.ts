/**
 * Form delivery. Set FORM_WEBHOOK_URL (e.g. a Formspree, Make, Zapier, Slack or
 * Resend-backed endpoint) in your environment and submissions are forwarded as JSON.
 * Without it, submissions are logged on the server so you can test locally.
 */
export async function deliver(kind: "contact" | "waitlist", payload: Record<string, unknown>) {
  const url = process.env.FORM_WEBHOOK_URL;
  const body = { kind, receivedAt: new Date().toISOString(), ...payload };
  if (!url) {
    console.info(`[${kind}]`, body);
    return true;
  }
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.ok;
}

export const isEmail = (v: unknown) => typeof v === "string" && /^\S+@\S+\.\S+$/.test(v) && v.length < 200;
export const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
