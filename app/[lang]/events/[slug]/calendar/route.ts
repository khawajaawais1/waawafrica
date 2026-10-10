import { getBySlug } from "@/lib/events";
import { fullTitle, localizeEvent } from "@/lib/event-types";

const ics = (d: string) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

export async function GET(_: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const raw = await getBySlug(slug);
  if (!raw) return new Response("Not found", { status: 404 });
  const fi = lang === "fi";
  const e = localizeEvent(raw, fi ? "fi" : "en");
  const end = e.endISO || new Date(new Date(e.startISO).getTime() + 3 * 3600_000).toISOString();
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WaawAfrica//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@waawafrica`,
    `DTSTAMP:${ics(e.updatedAt)}`,
    `DTSTART:${ics(e.startISO)}`,
    `DTEND:${ics(end)}`,
    `SUMMARY:${esc(fullTitle(e))}`,
    `LOCATION:${esc([e.venue, e.address].filter(Boolean).join(", "))}`,
    `DESCRIPTION:${esc([e.lineup.map((l) => l.name).join(" · "), e.ticketUrl ? `${fi ? "Liput" : "Tickets"}: ${e.ticketUrl}` : ""].filter(Boolean).join("\n"))}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="${e.slug}.ics"` },
  });
}
