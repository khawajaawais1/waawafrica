import { NextResponse } from "next/server";
import { clip, deliver, isEmail } from "@/lib/forms";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (data.company) return NextResponse.json({ message: "Thanks!" }); // honeypot
  const name = clip(data.name, 120);
  const message = clip(data.message, 5000);
  if (!name || !isEmail(data.email) || message.length < 10) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a short message." }, { status: 422 });
  }
  const ok = await deliver("contact", { name, email: data.email, organisation: clip(data.organisation, 160), topic: clip(data.topic, 40), message });
  if (!ok) return NextResponse.json({ error: "We couldn’t send that right now. Please email us directly." }, { status: 502 });
  return NextResponse.json({ message: "Waaw! Message received — we’ll get back to you soon." });
}
