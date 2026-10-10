import AdminShell from "@/components/admin/AdminShell";
import EventForm from "@/components/admin/EventForm";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  await requireAdmin();
  return (
    <AdminShell title="New event">
      <EventForm />
    </AdminShell>
  );
}
