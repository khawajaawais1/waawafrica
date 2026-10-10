"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession, isAdmin } from "@/lib/auth";
import { EVENTS_TAG, getEventsFresh, storePoster, writeEvents } from "@/lib/events";
import { localToISO, slugify, type EventItem } from "@/lib/event-types";

export type FormState = { error?: string; ok?: boolean };

const str = (fd: FormData, k: string, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);

function refreshSite() {
  revalidateTag(EVENTS_TAG, { expire: 0 });
  revalidatePath("/", "layout");
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin/login");
}

/* ───────── Auth ───────── */

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  const ok = checkCredentials(str(fd, "email", 200), String(fd.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Wrong email or password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ───────── Events ───────── */

export async function saveEvent(_: FormState, fd: FormData): Promise<FormState> {
  await guard();
  try {
    const events = await getEventsFresh();
    const id = str(fd, "id", 80);
    const existing = id ? events.find((e) => e.id === id) : undefined;

    const title = str(fd, "title", 120);
    const startLocal = str(fd, "start", 20);
    const venue = str(fd, "venue", 120);
    if (!title || !startLocal || !venue) return { error: "Title, start date/time and venue are required." };

    const startISO = localToISO(startLocal);
    const endLocal = str(fd, "end", 20);
    const endISO = endLocal ? localToISO(endLocal) : undefined;
    if (endISO && new Date(endISO) <= new Date(startISO)) return { error: "The end time must be after the start time." };

    const subtitle = str(fd, "subtitle", 60);
    let slug = existing?.slug || slugify(`${title} ${subtitle}`);
    if (!existing) {
      const base = slug;
      let n = 2;
      while (events.some((e) => e.slug === slug)) slug = `${base}-${n++}`;
    }

    const names = fd.getAll("lineup_name").map(String);
    const roles = fd.getAll("lineup_role").map(String);
    const lineup = names.map((n, i) => ({ name: n.trim().slice(0, 80), role: (roles[i] ?? "").trim().slice(0, 80) })).filter((l) => l.name);

    const tl = fd.getAll("ticket_label").map(String);
    const tp = fd.getAll("ticket_price").map(String);
    const tn = fd.getAll("ticket_note").map(String);
    const tickets = tl
      .map((l, i) => ({ label: l.trim().slice(0, 60), price: (tp[i] ?? "").trim().slice(0, 20), note: (tn[i] ?? "").trim().slice(0, 60) }))
      .filter((t) => t.label || t.price);

    const genres = str(fd, "genres", 300).split(",").map((g) => g.trim()).filter(Boolean).slice(0, 10);

    let poster = existing?.poster;
    const file = fd.get("poster");
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) return { error: "The poster must be an image." };
      if (file.size > 4 * 1024 * 1024) return { error: "Poster is too large (max 4 MB)." };
      const url = await storePoster(file, slug);
      poster = {
        url,
        width: Number(fd.get("poster_w")) || 900,
        height: Number(fd.get("poster_h")) || 1600,
        alt: `Poster for ${title}${subtitle ? ` ${subtitle}` : ""}`,
      };
    } else if (fd.get("poster_remove") === "1") {
      poster = undefined;
    }

    const ticketUrl = str(fd, "ticketUrl", 300);
    if (ticketUrl && !/^https?:\/\//i.test(ticketUrl)) return { error: "The ticket link must start with https://" };

    const item: EventItem = {
      id: existing?.id || crypto.randomUUID(),
      slug,
      title,
      short: str(fd, "short", 12) || undefined,
      subtitle: subtitle || undefined,
      startISO,
      endISO,
      venue,
      address: str(fd, "address", 160),
      description: str(fd, "description", 2000),
      ticketUrl: ticketUrl || undefined,
      payment: str(fd, "payment", 160) || undefined,
      lineup,
      tickets,
      genres,
      poster,
      published: fd.get("published") === "on",
      pinned: fd.get("pinned") === "on",
      updatedAt: new Date().toISOString(),
    };

    let next = existing ? events.map((e) => (e.id === item.id ? item : e)) : [...events, item];
    if (item.pinned) next = next.map((e) => (e.id === item.id ? e : { ...e, pinned: false }));
    await writeEvents(next);
    refreshSite();
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not save the event." };
  }
  redirect("/admin?saved=1");
}

export async function deleteEvent(fd: FormData) {
  await guard();
  const id = String(fd.get("id") ?? "");
  const events = await getEventsFresh();
  await writeEvents(events.filter((e) => e.id !== id));
  refreshSite();
  redirect("/admin?deleted=1");
}

export async function togglePin(fd: FormData) {
  await guard();
  const id = String(fd.get("id") ?? "");
  const events = await getEventsFresh();
  const target = events.find((e) => e.id === id);
  if (!target) return;
  const pin = !target.pinned;
  await writeEvents(events.map((e) => ({ ...e, pinned: e.id === id ? pin : pin ? false : e.pinned })));
  refreshSite();
  redirect("/admin");
}

export async function togglePublish(fd: FormData) {
  await guard();
  const id = String(fd.get("id") ?? "");
  const events = await getEventsFresh();
  await writeEvents(events.map((e) => (e.id === id ? { ...e, published: !e.published, updatedAt: new Date().toISOString() } : e)));
  refreshSite();
  redirect("/admin");
}
