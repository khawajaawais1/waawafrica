import Image from "next/image";
import Link from "next/link";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
import Logo from "@/components/Logo";
import { requireAdmin } from "@/lib/auth";
import { blobEnabled, getEventsFresh } from "@/lib/events";
import { dayLabel, fullTitle, timeRange, type EventItem } from "@/lib/event-types";
import { logout, togglePin, togglePublish } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await requireAdmin();
  const sp = await searchParams;
  const events = (await getEventsFresh()).slice().sort((a, b) => +new Date(b.startISO) - +new Date(a.startISO));
  const now = Date.now();
  const isPast = (e: EventItem) => new Date(e.endISO || e.startISO).getTime() < now;
  const upcoming = events.filter((e) => !isPast(e)).reverse();
  const past = events.filter(isPast);
  const storage = blobEnabled() ? "Vercel Blob" : process.env.VERCEL ? "NOT CONNECTED" : "Local file (.data/events.json)";

  return (
    <>
      <header className="sticky top-0 z-20 bg-ink text-cream">
        <div aria-hidden="true" className="kente h-1.5" />
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo className="h-10 w-auto" />
            <span className="hidden font-display text-lg font-extrabold sm:inline">Events admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full px-3 py-2 text-sm font-semibold ring-1 ring-cream/25 hover:bg-cream hover:text-ink">View site</Link>
            <form action={logout}><button className="rounded-full px-3 py-2 text-sm font-semibold ring-1 ring-cream/25 hover:bg-ember">Sign out</button></form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {sp.saved && <p role="status" className="mb-6 rounded-2xl bg-leaf px-5 py-4 font-bold text-cream">Saved! The website has been updated.</p>}
        {sp.deleted && <p role="status" className="mb-6 rounded-2xl bg-ink px-5 py-4 font-bold text-cream">Event deleted.</p>}
        {storage === "NOT CONNECTED" && (
          <p className="mb-6 rounded-2xl bg-ember px-5 py-4 font-semibold text-cream">
            Storage isn’t connected, so changes can’t be saved. In Vercel open your project → Storage → Create → Blob, connect it to this project, then redeploy.
          </p>
        )}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Events</h1>
            <p className="mt-2 text-sm text-ink/60">Storage: {storage}. The next upcoming published event (or the pinned one) is featured on the home page.</p>
          </div>
          <Link href="/admin/events/new" className="rounded-full bg-sun px-6 py-3.5 font-bold text-ink shadow-sm hover:bg-ink hover:text-sun">+ New event</Link>
        </div>

        <Section title="Upcoming" items={upcoming} empty="No upcoming events yet — add one!" />
        <Section title="Past" items={past} empty="No past events." muted />
      </main>
    </>
  );
}

function Section({ title, items, empty, muted }: { title: string; items: EventItem[]; empty: string; muted?: boolean }) {
  return (
    <section className="mt-10">
      <h2 className="eyebrow mb-4 text-ember">{title} ({items.length})</h2>
      {items.length === 0 ? (
        <p className="rounded-2xl bg-white/60 p-6 text-ink/60 ring-1 ring-ink/10">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((e) => (
            <li key={e.id} className={`flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/10 sm:flex-row sm:items-center ${muted ? "opacity-75" : ""}`}>
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-ink">
                {e.poster ? <Image src={e.poster.url} alt="" fill sizes="64px" className="object-cover" /> : <span className="grid h-full place-items-center font-display text-xs font-extrabold text-sun">{e.short || "WAAW"}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-extrabold">{fullTitle(e)}</h3>
                  {!e.published && <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-bold">Draft</span>}
                  {e.pinned && <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold">★ Featured</span>}
                </div>
                <p className="mt-1 text-sm text-ink/70">{dayLabel(e.startISO)} · {timeRange(e)} · {e.venue}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/admin/events/${e.id}`} className="rounded-full bg-ink px-3.5 py-2 text-sm font-bold text-cream hover:bg-ember">Edit</Link>
                {e.published && <Link href={`/events/${e.slug}`} target="_blank" className="rounded-full px-3.5 py-2 text-sm font-bold ring-1 ring-ink/20">View</Link>}
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={e.id} />
                  <button className="rounded-full px-3.5 py-2 text-sm font-bold ring-1 ring-ink/20 hover:bg-ink/5">{e.published ? "Unpublish" : "Publish"}</button>
                </form>
                {!muted && (
                  <form action={togglePin}>
                    <input type="hidden" name="id" value={e.id} />
                    <button className="rounded-full px-3.5 py-2 text-sm font-bold ring-1 ring-ink/20 hover:bg-sun">{e.pinned ? "Unfeature" : "★ Feature"}</button>
                  </form>
                )}
                <ConfirmDelete id={e.id} title={e.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
