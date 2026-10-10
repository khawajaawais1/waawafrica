import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";
import { get, put } from "@vercel/blob";
import type { EventItem } from "./event-types";
export type { EventItem } from "./event-types";

/**
 * Event storage.
 * - On Vercel (or anywhere with BLOB_READ_WRITE_TOKEN set): a single JSON file in Vercel Blob.
 * - Locally without a token: `.data/events.json` in the project (great for `npm run dev`).
 */
const BLOB_PATH = "data/events.json";
const LOCAL_FILE = path.join(process.cwd(), ".data", "events.json");
export const EVENTS_TAG = "events";

export const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

/** Starter content, used until the first event is saved from /admin. */
const seed: EventItem[] = [
  {
    id: "anj-round-6",
    slug: "anj-round-6",
    title: "Afrobeat Night JKL",
    short: "ANJ",
    subtitle: "Round 6",
    startISO: "2026-10-24T22:00:00+03:00",
    endISO: "2026-10-25T04:30:00+02:00", // clocks go back that night (DST ends)
    venue: "Teerenpeli JKL",
    address: "Kauppakatu 32, Jyväskylä",
    description:
      "Afrobeats, Amapiano, Dancehall, Latin & more — with live percussion, MCs and dance. Jyväskylä’s biggest African night is back for round six.",
    ticketUrl: "https://kide.app",
    payment: "Tickets on Kide.app · Cash or mobile pay at the door",
    lineup: [
      { name: "DJ Cliff", role: "DJ · Tampere" },
      { name: "DJ Goodblood", role: "DJ · Helsinki" },
      { name: "MC Shaka", role: "MC" },
      { name: "MC Litmayne", role: "MC" },
      { name: "Pape Cisse", role: "One-man show · live percussion" },
      { name: "Boss Gal H", role: "Dance" },
    ],
    tickets: [
      { label: "Early Bird", price: "6€", note: "only 30 tickets" },
      { label: "Before midnight", price: "8€", note: "" },
      { label: "After midnight", price: "10€", note: "" },
    ],
    genres: ["Afrobeats", "Amapiano", "Dancehall", "Latin & More"],
    poster: { url: "/images/poster-anj6.webp", width: 900, height: 1600, alt: "Poster for Afrobeat Night JKL Round 6" },
    fi: {
      subtitle: "Kierros 6",
      description:
        "Afrobeatsia, Amapianoa, Dancehallia, latinorytmejä ja paljon muuta — liverumpujen, MC:iden ja tanssin kera. Jyväskylän suurin afrikkalainen ilta palaa kuudetta kertaa.",
      payment: "Liput Kide.appista · Käteinen tai mobiilimaksu ovelta",
      tickets: [
        { label: "Early Bird", note: "vain 30 lippua" },
        { label: "Ennen puoltayötä", note: "" },
        { label: "Puolenyön jälkeen", note: "" },
      ],
    },
    published: true,
    pinned: false,
    updatedAt: "2026-10-10T12:00:00.000Z",
  },
];

/**
 * Read the event list. A missing file means "nothing saved yet" → starter content.
 * In strict mode (admin) any other error is thrown, so a temporary storage hiccup can never
 * cause the admin to save over your real events with the starter list.
 */
async function readRaw(strict = false): Promise<EventItem[]> {
  try {
    if (blobEnabled()) {
      const res = await get(BLOB_PATH, { access: "public", useCache: false });
      if (!res) return seed;
      if (res.statusCode !== 200) throw new Error(`Blob read failed (${res.statusCode})`);
      return JSON.parse(await new Response(res.stream).text()) as EventItem[];
    }
    const text = await fs.readFile(LOCAL_FILE, "utf8").catch((e: NodeJS.ErrnoException) => {
      if (e.code === "ENOENT") return null;
      throw e;
    });
    return text ? (JSON.parse(text) as EventItem[]) : seed;
  } catch (err) {
    if (strict) throw err;
    console.error("[events] read failed, showing starter content", err);
    return seed;
  }
}

/** Cached read used by public pages; invalidated whenever an admin saves. */
export const getEvents = unstable_cache(() => readRaw(false), ["events-v2"], { tags: [EVENTS_TAG], revalidate: 3600 });

/** Uncached read for the admin area. */
export const getEventsFresh = () => readRaw(true);

export async function writeEvents(events: EventItem[]) {
  const body = JSON.stringify(events, null, 2);
  if (blobEnabled()) {
    await put(BLOB_PATH, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("Storage not configured: connect a Vercel Blob store to this project (Storage → Blob), then redeploy.");
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, body, "utf8");
}

/** Save a poster image; returns its public URL. */
export async function storePoster(file: File, slug: string): Promise<string> {
  const ext = file.type === "image/png" ? "png" : file.type === "image/jpeg" ? "jpg" : "webp";
  const name = `posters/${slug}-${Date.now()}.${ext}`;
  if (blobEnabled()) {
    const res = await put(name, file, { access: "public", addRandomSuffix: true, contentType: file.type || "image/webp" });
    return res.url;
  }
  if (process.env.VERCEL) throw new Error("Storage not configured: connect a Vercel Blob store to upload posters.");
  // Local mode: keep uploads in .data/uploads (served by app/api/uploads)
  const dest = path.join(process.cwd(), ".data", "uploads", name);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}

/* ───────── Selectors ───────── */

const now = () => Date.now();
const ended = (e: EventItem) => new Date(e.endISO || e.startISO).getTime() < now();
const byStart = (a: EventItem, b: EventItem) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime();

export async function getPublished() {
  return (await getEvents()).filter((e) => e.published);
}

export async function getUpcoming() {
  return (await getPublished()).filter((e) => !ended(e)).sort(byStart);
}

export async function getPast() {
  return (await getPublished()).filter(ended).sort((a, b) => byStart(b, a));
}

/** The headline event: a pinned upcoming event, otherwise the next one coming up. */
export async function getFeatured(): Promise<EventItem | null> {
  const up = await getUpcoming();
  return up.find((e) => e.pinned) ?? up[0] ?? null;
}

export async function getBySlug(slug: string) {
  return (await getPublished()).find((e) => e.slug === slug) ?? null;
}
