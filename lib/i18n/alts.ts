import type { Photo } from "@/lib/images";
import type { Locale } from "./config";

/** Finnish alt texts for every photo (English lives in lib/images.ts). */
const fiAlts: Record<string, string> = {
  drummerSmile: "Hymyilevä rumpali nostaa kätensä esityksen keskellä värikkään djemben vieressä",
  clubSinger: "Laulaja esiintyy sinisissä ja vaaleanpunaisissa klubivaloissa WaawAfrica-illassa",
  clubPerformers: "Esiintyjät lavalla mikrofonin ja rumpujen kanssa Afrobeat-illassa",
  clubCrowdWide: "Täysi, tanssiva yleisö tapahtumapaikan lämpimissä valoissa",
  clubDjembe: "Rumpali soittaa djembeä lavalla vihreissä ja punaisissa valoissa",
  clubHandsUp: "Tanssijat nostavat kädet ilmaan Afrobeat-illassa",
  clubBand: "Livebändi esiintyy lavalla saksofonin, laulun ja rumpujen kanssa",
  clubCrowdRed: "Yleisö tanssii syvän punaisessa valossa",
  clubEmbrace: "Ystävät halaavat täydellä tanssilattialla",
  summerStageWide: "WaaW Summer Sessions: DJ-teltta, graffitiseinät ja myyntikojut metsäpuistossa",
  summerSign: "Käsin maalattu kyltti: ”Tervetuloa! Free Entry – WaaW Summer Sessions 18.7 Here”",
  summerTentRain: "Ihmiset kokoontuvat teltan alle esiintyjän ympärille kesätapahtumassa",
  summerPark: "WaawAfrican teltta ja banderollit mäntymetsäpuistossa",
  summerTentCrowd: "Väki jakaa ruokaa ja musiikkia valkoisen festivaaliteltan alla",
  summerMc: "MC esiintyy mikrofoniin festivaaliteltan alla",
  summerGraffitiDuo: "Kaksi nuorta taiteilijaa poseeraa juuri maalatun WAAW-graffititaulun vieressä",
  summerGraffitiTrio: "Kolme taiteilijaa poseeraa värikkään graffitiseinän edessä",
  summerKidsDj: "Lapset leikkivät nurmella WaawAfrican DJ-kopin edessä",
  summerGraffitiWalls: "Taiteilijat maalaavat graffitiseiniä ulkona kesätapahtumassa",
  summerMcBanner: "Keltapaitainen MC esiintyy WaawAfrica-banderollin edessä",
  summerDjBooth: "DJ miksaa WaawAfrican kopissa ihmisten kerääntyessä ympärille",
  summerDjMc: "DJ ja MC esiintyvät yhdessä WaawAfrican kopissa",
  stageDanceTroupe: "Länsiafrikkalainen tanssiryhmä esiintyy rumpaleiden kanssa lavalla",
  communityPuppet: "Hymyilevät vieraat poseeraavat ison ystävällisen nuken kanssa yhteisötapahtumassa",
  communityDinner: "Eri taustoista tulevat ihmiset jakavat pitkän yhteisen illallispöydän",
  stageBandCrowd: "Yleisö nostaa kätensä livebändille lavalla",
  communityKids: "Samanlaisiin T-paitoihin pukeutuneet lapset halaavat ja nauravat esiintyjän kanssa",
  workshopDrums: "Koululaiset opettelevat soittamaan djembe-rumpuja lavalla",
  outdoorStage: "Yleisö nauttii ulkokonsertista kaupunkipuistossa",
  stageBand: "Monikulttuurinen bändi esiintyy keikkapaikalla",
  stageFlags: "Esiintyjät lavalla Suomen ja Senegalin liput käsissään",
  stageDancerJump: "Tanssija hyppää rumpaleiden edessä kirkkaissa perinneasuissa",
  stageMaskedDancer: "Naamioitu tanssija kirkkaan oranssissa asussa katsoo yleisöä kohti",
  humanityTeaching: "Vapaaehtoinen juttelee yhdessä istuvan lapsiryhmän kanssa Senegalissa",
  stageDanceEnergy: "Tanssijat ja muusikot täyttävät lavan energialla",
  stageDanceSchool: "Opiskelijat esittävät afrikkalaisen tanssin täydelle yleisölle",
  festivalNight: "Valtava festivaaliyleisö yöllä valaistun lavan edessä",
  humanityGiving: "Vapaaehtoinen jakaa tarvikkeita lapsille Senegalissa",
  humanityGroup: "Suuri joukko lapsia ja vapaaehtoisia hymyilee yhteiskuvassa",
  humanityMeal: "Lapset jakavat ruokaa kulhoista maassa istuen",
  humanityCircle: "Lapset istuvat piirissä ja jakavat aterian",
  stageDjembeFlag: "Kasvonsa maalannut rumpali soittaa djembeä Senegalin lipun edessä",
  posterAnj6: "Juliste: Afrobeat Night JKL, kierros 6, lauantaina 24.10.2026 Teerenpelissä Jyväskylässä",
};

export function localizePhoto<T extends Photo>(p: T, locale: Locale): T {
  if (locale === "fi" && p.alt && p.id && fiAlts[p.id]) return { ...p, alt: fiAlts[p.id] };
  return p;
}
