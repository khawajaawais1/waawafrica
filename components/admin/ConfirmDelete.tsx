"use client";

import { useState } from "react";
import { deleteEvent } from "@/app/admin/actions";

export default function ConfirmDelete({ id, title }: { id: string; title: string }) {
  const [armed, setArmed] = useState(false);
  if (!armed)
    return (
      <button type="button" onClick={() => setArmed(true)} className="rounded-full px-3.5 py-2 text-sm font-bold text-ember ring-1 ring-ember/40 hover:bg-ember hover:text-cream">
        Delete
      </button>
    );
  return (
    <form action={deleteEvent} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-full bg-ember px-3.5 py-2 text-sm font-bold text-cream" aria-label={`Confirm delete ${title}`}>
        Confirm delete
      </button>
      <button type="button" onClick={() => setArmed(false)} className="text-sm font-semibold underline">Cancel</button>
    </form>
  );
}
