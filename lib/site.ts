import { img, type Photo } from "./images";

/**
 * Central site configuration.
 * Contact details and social accounts are used in the header menu, footer, contact page and SEO data.
 */
export const site = {
  name: "WaawAfrica",
  tagline: "Be Multicultural",
  description:
    "WaawAfrica is a cultural movement bringing African music, dance and community to Finland — with Afrobeat nights, summer sessions, humanity work in Senegal and the upcoming Dakar Bazaar.",
  url: "https://waawafrica.com", // TODO: set your production domain
  email: "waaw.africajkl@gmail.com",
  phone: "+358 40 168 3553", // shown on the site
  phoneHref: "+358401683553", // used for tap-to-call links
  socials: {
    instagram: "https://www.instagram.com/waawafricaevents",
    instagramHandle: "@waawafricaevents",
    facebook: "https://www.facebook.com/share/1FDkV3dVza/",
    tiktok: "https://www.tiktok.com/@waawafricaevents",
    tiktokHandle: "@waawafricaevents",
  },
  ticketsUrl: "https://kide.app",
};

/** Social accounts in display order (header menu, footer, contact page). */
export const socialLinks = [
  { key: "instagram", label: "Instagram", url: site.socials.instagram, handle: site.socials.instagramHandle },
  { key: "facebook", label: "Facebook", url: site.socials.facebook, handle: "WaawAfrica Events" },
  { key: "tiktok", label: "TikTok", url: site.socials.tiktok, handle: site.socials.tiktokHandle },
] as const;
export type SocialKey = (typeof socialLinks)[number]["key"];

/** Navigation — labels come from the dictionaries (lib/i18n/en.ts & fi.ts → common.nav). */
export const nav = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/events", key: "events" },
  { href: "/humanity", key: "humanity" },
  { href: "/dakar-bazaar", key: "bazaar" },
  { href: "/contact", key: "contact" },
] as const;
export type NavKey = (typeof nav)[number]["key"];

/** Bookable offerings on the Events page — texts in the dictionaries (events.offers), same order. */
export const offers = [
  { photo: img.summerPark, href: "/contact?topic=events" },
  { photo: img.workshopDrums, href: "/contact?topic=workshop" },
  { photo: img.stageDancerJump, href: "/contact?topic=performance" },
];

export type GalleryItem = Photo & { cat: GalleryCat };
export type GalleryCat = "afro" | "summer" | "stage" | "community";

export const gallery: GalleryItem[] = [
  { ...img.clubHandsUp, cat: "afro" },
  { ...img.summerSign, cat: "summer" },
  { ...img.stageDanceTroupe, cat: "stage" },
  { ...img.clubSinger, cat: "afro" },
  { ...img.summerGraffitiDuo, cat: "summer" },
  { ...img.communityKids, cat: "community" },
  { ...img.clubBand, cat: "afro" },
  { ...img.stageMaskedDancer, cat: "stage" },
  { ...img.summerDjMc, cat: "summer" },
  { ...img.clubDjembe, cat: "afro" },
  { ...img.communityDinner, cat: "community" },
  { ...img.stageFlags, cat: "stage" },
  { ...img.summerMcBanner, cat: "summer" },
  { ...img.clubEmbrace, cat: "afro" },
  { ...img.workshopDrums, cat: "community" },
  { ...img.stageDancerJump, cat: "stage" },
  { ...img.summerKidsDj, cat: "summer" },
  { ...img.clubCrowdWide, cat: "afro" },
  { ...img.communityPuppet, cat: "community" },
  { ...img.stageDjembeFlag, cat: "stage" },
  { ...img.summerGraffitiWalls, cat: "summer" },
  { ...img.clubPerformers, cat: "afro" },
  { ...img.stageDanceSchool, cat: "stage" },
  { ...img.summerMc, cat: "summer" },
  { ...img.outdoorStage, cat: "community" },
  { ...img.stageBand, cat: "afro" },
  { ...img.stageDanceEnergy, cat: "stage" },
  { ...img.summerTentCrowd, cat: "summer" },
  { ...img.summerGraffitiTrio, cat: "summer" },
  { ...img.stageBandCrowd, cat: "stage" },
  { ...img.clubCrowdRed, cat: "afro" },
  { ...img.summerDjBooth, cat: "summer" },
];

export const humanityGallery: Photo[] = [
  img.humanityGroup,
  img.humanityMeal,
  img.humanityTeaching,
  img.humanityCircle,
  img.humanityGiving,
  img.communityKids,
  img.communityDinner,
  img.workshopDrums,
];
