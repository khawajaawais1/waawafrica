import { redirect } from "next/navigation";

/** Unknown admin URLs go back to the dashboard. */
export default function AdminCatchAll() {
  redirect("/admin");
}
