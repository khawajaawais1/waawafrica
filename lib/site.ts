import { img, type Photo } from "./images";

/**
 * Central site configuration.
 * ⚠️ Replace the placeholder email/phone below with real contact details before launch.
 */
export const site = {
  name: "WaawAfrica",
  tagline: "Be Multicultural",
  description:
    "WaawAfrica is a cultural movement bringing African music, dance and community to Finland — with Afrobeat nights, summer sessions, humanity work in Senegal and the upcoming Dakar Bazaar.",
  url: "https://waawafrica.com", // TODO: set your production domain
  email: "hello@waawafrica.com", // TODO: placeholder — replace
  phone: "+358 40 000 0000", // TODO: placeholder — replace
  locations: ["Jyväskylä, Finland", "Dakar, Senegal"],
  socials: {
    instagram: "https://www.instagram.com/waawafricaevents",
    instagramHandle: "@waawafricaevents",
  },
  ticketsUrl: "https://kide.app",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/humanity", label: "Humanity Work" },
  { href: "/dakar-bazaar", label: "Dakar Bazaar" },
  { href: "/contact", label: "Contact" },
] as const;

export type UpcomingCard = {
  title: string;
  when: string;
  where: string;
  blurb: string;
  photo: Photo;
  cta: { label: string; href: string };
  tag: string;
};

export const moreUpcoming: UpcomingCard[] = [
  {
    title: "WaaW Summer Sessions",
    when: "Summer 2027 · dates TBA",
    where: "Outdoors · Jyväskylä",
    blurb:
      "Free-entry open-air days of DJs, MCs, live graffiti, food and family fun under the pines. Be the first to hear the dates.",
    photo: img.summerPark,
    cta: { label: "Get notified", href: "/contact?topic=events" },
    tag: "Open air",
  },
  {
    title: "Drum & Dance Workshops",
    when: "Bookable all year",
    where: "Schools · libraries · companies",
    blurb:
      "Hands-on djembe and West African dance sessions for kids, students and teams — joyful, inclusive and unforgettable.",
    photo: img.workshopDrums,
    cta: { label: "Book a workshop", href: "/contact?topic=workshop" },
    tag: "Education",
  },
  {
    title: "Live Culture Shows",
    when: "On request",
    where: "Festivals · stages · private events",
    blurb:
      "Drummers, dancers and performers bringing the full colour of Senegalese stage culture to your event.",
    photo: img.stageDancerJump,
    cta: { label: "Request a show", href: "/contact?topic=performance" },
    tag: "Performance",
  },
];

export type GalleryItem = Photo & { cat: GalleryCat };
export type GalleryCat = "Afrobeat Nights" | "Summer Sessions" | "Stage & Culture" | "Community";

export const gallery: GalleryItem[] = [
  { ...img.clubHandsUp, cat: "Afrobeat Nights" },
  { ...img.summerSign, cat: "Summer Sessions" },
  { ...img.stageDanceTroupe, cat: "Stage & Culture" },
  { ...img.clubSinger, cat: "Afrobeat Nights" },
  { ...img.summerGraffitiDuo, cat: "Summer Sessions" },
  { ...img.communityKids, cat: "Community" },
  { ...img.clubBand, cat: "Afrobeat Nights" },
  { ...img.stageMaskedDancer, cat: "Stage & Culture" },
  { ...img.summerDjMc, cat: "Summer Sessions" },
  { ...img.clubDjembe, cat: "Afrobeat Nights" },
  { ...img.communityDinner, cat: "Community" },
  { ...img.stageFlags, cat: "Stage & Culture" },
  { ...img.summerMcBanner, cat: "Summer Sessions" },
  { ...img.clubEmbrace, cat: "Afrobeat Nights" },
  { ...img.workshopDrums, cat: "Community" },
  { ...img.stageDancerJump, cat: "Stage & Culture" },
  { ...img.summerKidsDj, cat: "Summer Sessions" },
  { ...img.clubCrowdWide, cat: "Afrobeat Nights" },
  { ...img.communityPuppet, cat: "Community" },
  { ...img.stageDjembeFlag, cat: "Stage & Culture" },
  { ...img.summerGraffitiWalls, cat: "Summer Sessions" },
  { ...img.clubPerformers, cat: "Afrobeat Nights" },
  { ...img.stageDanceSchool, cat: "Stage & Culture" },
  { ...img.summerMc, cat: "Summer Sessions" },
  { ...img.outdoorStage, cat: "Community" },
  { ...img.stageBand, cat: "Afrobeat Nights" },
  { ...img.stageDanceEnergy, cat: "Stage & Culture" },
  { ...img.summerTentCrowd, cat: "Summer Sessions" },
  { ...img.summerGraffitiTrio, cat: "Summer Sessions" },
  { ...img.stageBandCrowd, cat: "Stage & Culture" },
  { ...img.clubCrowdRed, cat: "Afrobeat Nights" },
  { ...img.summerDjBooth, cat: "Summer Sessions" },
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
