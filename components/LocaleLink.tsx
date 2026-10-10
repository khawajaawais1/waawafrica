import Link from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n/config";
import { getLocale } from "@/lib/i18n/server";

/** next/link that automatically adds /fi to internal links on Finnish pages. */
export default async function LocaleLink({ href, ...rest }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = await getLocale();
  return <Link href={localizeHref(href, locale)} {...rest} />;
}
