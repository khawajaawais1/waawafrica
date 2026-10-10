import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import EventForm from "@/components/admin/EventForm";
import { requireAdmin } from "@/lib/auth";
import { getEventsFresh } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const event = (await getEventsFresh()).find((e) => e.id === id);
  if (!event) notFound();
  return (
    <AdminShell title="Edit event">
      <EventForm event={event} />
    </AdminShell>
  );
}
