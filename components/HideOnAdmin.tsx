"use client";

import { usePathname } from "next/navigation";

/** Hides public-site chrome (footer) inside the /admin area. */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/admin") ? null : <>{children}</>;
}
