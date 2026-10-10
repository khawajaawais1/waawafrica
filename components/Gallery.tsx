import type { Photo } from "@/lib/images";
import { localizePhoto } from "@/lib/i18n/alts";
import { getT } from "@/lib/i18n/server";
import GalleryClient from "./GalleryClient";

/** Server wrapper: translates alt texts and labels, then renders the interactive gallery. */
export default async function Gallery({ items, filters, tone }: { items: (Photo & { cat?: string })[]; filters?: boolean; tone?: "dark" | "light" }) {
  const { t, locale } = await getT();
  return <GalleryClient items={items.map((p) => localizePhoto(p, locale))} filters={filters} tone={tone} t={t.gallery} />;
}
