"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { saveEvent, type FormState } from "@/app/admin/actions";
import { isoToLocal, type EventItem, type LineupItem, type TicketTier } from "@/lib/event-types";

// Stable keys for repeatable rows (index keys would mix up values when a middle row is removed)
let rowSeq = 0;
const rowKey = () => `r${++rowSeq}`;
type Row<T> = T & { _k: string };
type TicketRow = Row<TicketTier & { labelFi: string; noteFi: string }>;

type Props = { event?: EventItem };

/** Resize an image in the browser so uploads stay small and fast (max 1600px, WebP). */
async function shrink(file: File): Promise<{ file: File; w: number; h: number; preview: string }> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, w, h);
  const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/webp", 0.85));
  const out = new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
  return { file: out, w, h, preview: URL.createObjectURL(blob) };
}

const Field = ({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-bold">{label}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-ink/55">{hint}</span>}
  </label>
);

export default function EventForm({ event }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});
  const [lineup, setLineup] = useState<Row<LineupItem>[]>(() =>
    (event?.lineup.length ? event.lineup : [{ name: "", role: "" }]).map((l) => ({ ...l, _k: rowKey() }))
  );
  const [tickets, setTickets] = useState<TicketRow[]>(() =>
    (event?.tickets.length ? event.tickets : [{ label: "", price: "", note: "" }]).map((t, i) => ({
      ...t,
      labelFi: event?.fi?.tickets?.[i]?.label ?? "",
      noteFi: event?.fi?.tickets?.[i]?.note ?? "",
      _k: rowKey(),
    }))
  );
  const blankTicket = (): TicketRow => ({ label: "", price: "", note: "", labelFi: "", noteFi: "", _k: rowKey() });
  const [preview, setPreview] = useState<string | undefined>(event?.poster?.url);
  const [dims, setDims] = useState({ w: event?.poster?.width ?? 0, h: event?.poster?.height ?? 0 });
  const [removePoster, setRemovePoster] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPoster = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const s = await shrink(f);
      const dt = new DataTransfer();
      dt.items.add(s.file);
      if (fileRef.current) fileRef.current.files = dt.files;
      setPreview(s.preview);
      setDims({ w: s.w, h: s.h });
      setRemovePoster(false);
    } catch {
      /* fall back to the original file */
    } finally {
      setBusy(false);
    }
  };

  // Submit manually (no automatic form reset) so nothing typed is lost if validation fails
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input type="hidden" name="poster_w" value={dims.w} />
      <input type="hidden" name="poster_h" value={dims.h} />
      <input type="hidden" name="poster_remove" value={removePoster ? "1" : "0"} />

      <fieldset className="grid gap-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:grid-cols-2 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Basics</legend>
        <Field label="Event title *" className="sm:col-span-2">
          <input name="title" required defaultValue={event?.title} placeholder="Afrobeat Night JKL" className="adm-input" />
        </Field>
        <Field label="Edition / subtitle" hint="e.g. Round 7">
          <input name="subtitle" defaultValue={event?.subtitle} className="adm-input" />
        </Field>
        <Field label="Short badge" hint="Big letters on the event card, e.g. ANJ">
          <input name="short" maxLength={12} defaultValue={event?.short} className="adm-input" />
        </Field>
        <Field label="Starts * (Finland time)">
          <input name="start" type="datetime-local" required defaultValue={isoToLocal(event?.startISO)} className="adm-input" />
        </Field>
        <Field label="Ends (Finland time)">
          <input name="end" type="datetime-local" defaultValue={isoToLocal(event?.endISO)} className="adm-input" />
        </Field>
        <Field label="Venue *">
          <input name="venue" required defaultValue={event?.venue} placeholder="Teerenpeli JKL" className="adm-input" />
        </Field>
        <Field label="Address">
          <input name="address" defaultValue={event?.address} placeholder="Kauppakatu 32, Jyväskylä" className="adm-input" />
        </Field>
        <Field label="Description" className="sm:col-span-2">
          <textarea name="description" rows={4} defaultValue={event?.description} className="adm-input resize-y" />
        </Field>
        <Field label="Music / genres" hint="Separate with commas" className="sm:col-span-2">
          <input name="genres" defaultValue={event?.genres.join(", ")} placeholder="Afrobeats, Amapiano, Dancehall" className="adm-input" />
        </Field>
      </fieldset>

      <fieldset className="rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Poster</legend>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid h-56 w-36 shrink-0 place-items-center overflow-hidden rounded-2xl bg-ink text-center text-xs text-cream/60">
            {preview && !removePoster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Poster preview" className="h-full w-full object-cover" />
            ) : (
              "No poster"
            )}
          </div>
          <div className="space-y-3">
            <input ref={fileRef} name="poster" type="file" accept="image/*" onChange={onPoster} className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2.5 file:font-bold file:text-cream" />
            <p className="text-xs text-ink/55">Portrait works best (e.g. 1080×1920). Images are automatically resized and compressed before upload.</p>
            {busy && <p className="text-sm font-semibold">Optimising image…</p>}
            {event?.poster && !removePoster && (
              <button type="button" onClick={() => setRemovePoster(true)} className="text-sm font-bold text-ember underline">Remove poster</button>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Line-up</legend>
        <ul className="mt-4 space-y-3">
          {lineup.map((l, i) => (
            <li key={l._k} className="flex items-start gap-2">
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <input name="lineup_name" aria-label={`Artist ${i + 1} name`} placeholder="Name" defaultValue={l.name} className="adm-input" />
                <input name="lineup_role" aria-label={`Artist ${i + 1} role`} placeholder="Role (DJ · Helsinki)" defaultValue={l.role} className="adm-input" />
              </div>
              <button type="button" onClick={() => setLineup(lineup.filter((_, j) => j !== i))} aria-label={`Remove artist ${i + 1}`} className="grid size-12 shrink-0 place-items-center rounded-full text-xl ring-1 ring-ink/15 hover:bg-ember hover:text-cream">×</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setLineup([...lineup, { name: "", role: "", _k: rowKey() }])} className="mt-4 rounded-full px-4 py-2 text-sm font-bold ring-1 ring-ink/20 hover:bg-sun">+ Add artist</button>
      </fieldset>

      <fieldset className="rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Tickets</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Ticket link" hint="Kide.app or any https:// link">
            <input name="ticketUrl" type="url" defaultValue={event?.ticketUrl} placeholder="https://kide.app/events/…" className="adm-input" />
          </Field>
          <Field label="Payment note">
            <input name="payment" defaultValue={event?.payment} placeholder="Cash or mobile pay at the door" className="adm-input" />
          </Field>
        </div>
        <ul className="mt-5 space-y-3">
          {tickets.map((t, i) => (
            <li key={t._k} className="flex items-start gap-2">
              <div className="grid flex-1 grid-cols-[1fr_5.5rem] gap-2 sm:grid-cols-[1fr_7rem_1fr]">
                <input name="ticket_label" aria-label={`Ticket ${i + 1} name`} placeholder="Early Bird" defaultValue={t.label} className="adm-input" />
                <input name="ticket_price" aria-label={`Ticket ${i + 1} price`} placeholder="6€" defaultValue={t.price} className="adm-input" />
                <input name="ticket_note" aria-label={`Ticket ${i + 1} note`} placeholder="Note (only 30 tickets)" defaultValue={t.note} className="adm-input col-span-2 sm:col-span-1" />
                <input name="ticket_label_fi" lang="fi" aria-label={`Ticket ${i + 1} name in Finnish`} placeholder="🇫🇮 Nimi (Ennakko)" defaultValue={t.labelFi} className="adm-input bg-sun/10" />
                <span className="hidden sm:block" />
                <input name="ticket_note_fi" lang="fi" aria-label={`Ticket ${i + 1} note in Finnish`} placeholder="🇫🇮 Huomio (vain 30 lippua)" defaultValue={t.noteFi} className="adm-input col-span-2 bg-sun/10 sm:col-span-1" />
              </div>
              <button type="button" onClick={() => setTickets(tickets.filter((_, j) => j !== i))} aria-label={`Remove ticket ${i + 1}`} className="grid size-12 shrink-0 place-items-center rounded-full text-xl ring-1 ring-ink/15 hover:bg-ember hover:text-cream">×</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setTickets([...tickets, blankTicket()])} className="mt-4 rounded-full px-4 py-2 text-sm font-bold ring-1 ring-ink/20 hover:bg-sun">+ Add ticket type</button>
      </fieldset>

      <fieldset className="grid gap-5 rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:grid-cols-2 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Finnish version (Suomeksi)</legend>
        <p className="text-sm text-ink/60 sm:col-span-2">
          Shown on the Finnish site (/fi). Leave a field empty to use the English text. Names, venue and line-up are shared by both languages.
        </p>
        <Field label="Title in Finnish" hint="Usually the same — only fill in if it changes">
          <input name="title_fi" lang="fi" defaultValue={event?.fi?.title} placeholder={event?.title || "Afrobeat Night JKL"} className="adm-input" />
        </Field>
        <Field label="Edition / subtitle in Finnish" hint="e.g. Kierros 7">
          <input name="subtitle_fi" lang="fi" defaultValue={event?.fi?.subtitle} className="adm-input" />
        </Field>
        <Field label="Description in Finnish" className="sm:col-span-2">
          <textarea name="description_fi" lang="fi" rows={4} defaultValue={event?.fi?.description} className="adm-input resize-y" />
        </Field>
        <Field label="Payment note in Finnish" className="sm:col-span-2">
          <input name="payment_fi" lang="fi" defaultValue={event?.fi?.payment} placeholder="Käteinen tai mobiilimaksu ovelta" className="adm-input" />
        </Field>
        <p className="text-sm text-ink/60 sm:col-span-2">Ticket names in Finnish are in the Tickets section (yellow fields).</p>
      </fieldset>

      <fieldset className="space-y-4 rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-7">
        <legend className="eyebrow -mb-2 px-1 text-ember">Visibility</legend>
        <label className="mt-4 flex items-start gap-3">
          <input type="checkbox" name="published" defaultChecked={event?.published ?? true} className="mt-1 size-5 accent-[var(--color-leaf)]" />
          <span><strong>Published</strong> — show this event on the website.</span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="pinned" defaultChecked={event?.pinned ?? false} className="mt-1 size-5 accent-[var(--color-sun)]" />
          <span><strong>Feature on home page</strong> — replaces the “Next event” spot (otherwise the soonest upcoming event is shown).</span>
        </label>
      </fieldset>

      <div className="sticky bottom-0 -mx-4 flex flex-col-reverse gap-3 border-t border-ink/10 bg-cream/95 px-4 py-4 backdrop-blur sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border-0 sm:px-0">
        <Link href="/admin" className="text-center font-semibold underline">Cancel</Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p role="alert" aria-live="polite" className="text-sm font-semibold text-ember">{state.error}</p>
          <button type="submit" disabled={pending || busy} className="rounded-full bg-ink px-8 py-4 font-bold text-cream transition hover:bg-ember disabled:opacity-60">
            {pending ? "Saving…" : event ? "Save changes" : "Publish event"}
          </button>
        </div>
      </div>
    </form>
  );
}
