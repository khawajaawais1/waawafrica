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
  /** Optional Finnish versions — anything left empty falls back to the English text. */
  fi?: {
    title?: string;
    subtitle?: string;
    description?: string;
    payment?: string;
    /** Same order as `tickets` */
    tickets?: { label?: string; note?: string }[];
  };
  published: boolean;
  /** Pinned events take over the “Next event” spot on the home page. */
  pinned: boolean;
  updatedAt: string;
};

export const SITE_TZ = "Europe/Helsinki";

type Lang = "en" | "fi";
const intl = (l: Lang) => (l === "fi" ? "fi-FI" : "en-GB");
const part = (iso: string, l: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(intl(l), { timeZone: SITE_TZ, ...opts }).format(new Date(iso));
const two = (iso: string, opts: Intl.DateTimeFormatOptions) => part(iso, "en", opts).padStart(2, "0");
const FI_MONTHS = ["TAMMI", "HELMI", "MAALIS", "HUHTI", "TOUKO", "KESÄ", "HEINÄ", "ELO", "SYYS", "LOKA", "MARRAS", "JOULU"];

/** "Saturday 24.10.2026" / "Lauantai 24.10.2026" */
export const dayLabel = (iso: string, l: Lang = "en") => {
  const wd = part(iso, l, { weekday: "long" });
  return `${wd.charAt(0).toUpperCase()}${wd.slice(1)} ${two(iso, { day: "numeric" })}.${two(iso, { month: "numeric" })}.${part(iso, "en", { year: "numeric" })}`;
};
export const timeLabel = (iso: string) => part(iso, "en", { hour: "2-digit", minute: "2-digit", hour12: false }).replace(".", ":");
export const dayNum = (iso: string) => two(iso, { day: "numeric" });
export const monShort = (iso: string, l: Lang = "en") =>
  l === "fi" ? FI_MONTHS[Number(part(iso, "en", { month: "numeric" })) - 1] : part(iso, "en", { month: "short" }).toUpperCase();
export const timeRange = (e: Pick<EventItem, "startISO" | "endISO">) =>
  e.endISO ? `${timeLabel(e.startISO)} – ${timeLabel(e.endISO)}` : timeLabel(e.startISO);
export const fullTitle = (e: Pick<EventItem, "title" | "subtitle">) => (e.subtitle ? `${e.title} · ${e.subtitle}` : e.title);

/** The event as shown in a language: Finnish fields replace English ones when filled in. */
export function localizeEvent(e: EventItem, l: Lang): EventItem {
  if (l !== "fi" || !e.fi) return e;
  const f = e.fi;
  const pick = (v: string | undefined, fallback: string | undefined) => (v && v.trim() ? v.trim() : fallback);
  const title = pick(f.title, e.title)!;
  const subtitle = pick(f.subtitle, e.subtitle);
  return {
    ...e,
    title,
    subtitle,
    description: pick(f.description, e.description) ?? "",
    payment: pick(f.payment, e.payment),
    tickets: e.tickets.map((tk, i) => ({ ...tk, label: pick(f.tickets?.[i]?.label, tk.label)!, note: pick(f.tickets?.[i]?.note, tk.note) ?? "" })),
    poster: e.poster ? { ...e.poster, alt: `Juliste: ${fullTitle({ title, subtitle })}` } : undefined,
  };
}

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
