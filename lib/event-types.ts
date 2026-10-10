export type LineupItem = { name: string; role: string };
export type TicketTier = { label: string; price: string; note: string };

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  /** Short badge name, e.g. "ANJ" (optional) */
  short?: string;
  /** e.g. "Round 6" (optional) */
  subtitle?: string;
  startISO: string;
  endISO?: string;
  venue: string;
  address: string;
  description: string;
  ticketUrl?: string;
  payment?: string;
  lineup: LineupItem[];
  tickets: TicketTier[];
  genres: string[];
  poster?: { url: string; width: number; height: number; alt: string };
  published: boolean;
  /** Pinned events take over the “Next event” spot on the home page. */
  pinned: boolean;
  updatedAt: string;
};

export const SITE_TZ = "Europe/Helsinki";

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: SITE_TZ, ...opts }).format(new Date(iso));

export const dayLabel = (iso: string) => fmt(iso, { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".").replace(",", "");
export const timeLabel = (iso: string) => fmt(iso, { hour: "2-digit", minute: "2-digit", hour12: false });
export const dayNum = (iso: string) => fmt(iso, { day: "2-digit" });
export const monShort = (iso: string) => fmt(iso, { month: "short" }).toUpperCase();
export const timeRange = (e: Pick<EventItem, "startISO" | "endISO">) =>
  e.endISO ? `${timeLabel(e.startISO)} – ${timeLabel(e.endISO)}` : timeLabel(e.startISO);
export const fullTitle = (e: Pick<EventItem, "title" | "subtitle">) => (e.subtitle ? `${e.title} · ${e.subtitle}` : e.title);

/** Convert a `datetime-local` value (wall-clock time in Finland) to an ISO string with the right offset. */
export function localToISO(local: string): string {
  if (!local) return "";
  const [d, t = "00:00"] = local.split("T");
  const guess = new Date(`${d}T${t}:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: SITE_TZ, timeZoneName: "longOffset" }).formatToParts(guess);
  const off = parts.find((p) => p.type === "timeZoneName")?.value.replace("GMT", "") || "+00:00";
  return `${d}T${t.slice(0, 5)}:00${off === "" ? "+00:00" : off}`;
}

/** ISO → `datetime-local` value in Finland time (for the admin form). */
export function isoToLocal(iso?: string): string {
  if (!iso) return "";
  const p = new Intl.DateTimeFormat("sv-SE", { timeZone: SITE_TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
  return p.replace(" ", "T");
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60) || "event";
