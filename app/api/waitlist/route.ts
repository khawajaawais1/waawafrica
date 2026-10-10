import { NextResponse } from "next/server";
import { deliver, isEmail } from "@/lib/forms";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (data.company) return NextResponse.json({ message: "Thanks!" });
  if (!isEmail(data.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  const ok = await deliver("waitlist", { email: data.email, list: "dakar-bazaar", lang: data.lang === "fi" ? "fi" : "en" });
  if (!ok) return NextResponse.json({ error: "Couldn’t join right now — please try again." }, { status: 502 });
  return NextResponse.json({ message: "Waaw! You’re on the Dakar Bazaar list — we’ll notify you at launch." });
}
