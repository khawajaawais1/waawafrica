import type { StaticImageData } from "next/image";

import drummerSmile from "@/public/images/drummer-smile.webp";
import clubSinger from "@/public/images/club-singer.webp";
import clubPerformers from "@/public/images/club-performers.webp";
import clubCrowdWide from "@/public/images/club-crowd-wide.webp";
import clubDjembe from "@/public/images/club-djembe.webp";
import clubHandsUp from "@/public/images/club-hands-up.webp";
import clubBand from "@/public/images/club-band.webp";
import clubCrowdRed from "@/public/images/club-crowd-red.webp";
import clubEmbrace from "@/public/images/club-embrace.webp";
import summerStageWide from "@/public/images/summer-stage-wide.webp";
import summerSign from "@/public/images/summer-sign.webp";
import summerTentRain from "@/public/images/summer-tent-rain.webp";
import summerPark from "@/public/images/summer-park.webp";
import summerTentCrowd from "@/public/images/summer-tent-crowd.webp";
import summerMc from "@/public/images/summer-mc.webp";
import summerGraffitiDuo from "@/public/images/summer-graffiti-duo.webp";
import summerGraffitiTrio from "@/public/images/summer-graffiti-trio.webp";
import summerKidsDj from "@/public/images/summer-kids-dj.webp";
import summerGraffitiWalls from "@/public/images/summer-graffiti-walls.webp";
import summerMcBanner from "@/public/images/summer-mc-banner.webp";
import summerDjBooth from "@/public/images/summer-dj-booth.webp";
import summerDjMc from "@/public/images/summer-dj-mc.webp";
import stageDanceTroupe from "@/public/images/stage-dance-troupe.webp";
import communityPuppet from "@/public/images/community-puppet.webp";
import communityDinner from "@/public/images/community-dinner.webp";
import stageBandCrowd from "@/public/images/stage-band-crowd.webp";
import communityKids from "@/public/images/community-kids.webp";
import workshopDrums from "@/public/images/workshop-drums.webp";
import outdoorStage from "@/public/images/outdoor-stage.webp";
import stageBand from "@/public/images/stage-band.webp";
import stageFlags from "@/public/images/stage-flags.webp";
import stageDancerJump from "@/public/images/stage-dancer-jump.webp";
import stageMaskedDancer from "@/public/images/stage-masked-dancer.webp";
import humanityTeaching from "@/public/images/humanity-teaching.webp";
import stageDanceEnergy from "@/public/images/stage-dance-energy.webp";
import stageDanceSchool from "@/public/images/stage-dance-school.webp";
import festivalNight from "@/public/images/festival-night.webp";
import humanityGiving from "@/public/images/humanity-giving.webp";
import humanityGroup from "@/public/images/humanity-group.webp";
import humanityMeal from "@/public/images/humanity-meal.webp";
import humanityCircle from "@/public/images/humanity-circle.webp";
import stageDjembeFlag from "@/public/images/stage-djembe-flag.webp";
import posterAnj6 from "@/public/images/poster-anj6.webp";

export type Photo = { src: StaticImageData; alt: string };

export const img = {
  drummerSmile: { src: drummerSmile, alt: "A smiling percussionist raises his hand mid-performance beside a colourful djembe" },
  clubSinger: { src: clubSinger, alt: "A singer performs under blue and pink club lights at a WaawAfrica night" },
  clubPerformers: { src: clubPerformers, alt: "Performers on stage with mic and percussion at an Afrobeat night" },
  clubCrowdWide: { src: clubCrowdWide, alt: "A packed, dancing crowd under warm venue lights" },
  clubDjembe: { src: clubDjembe, alt: "A drummer plays djembe on stage under green and red lights" },
  clubHandsUp: { src: clubHandsUp, alt: "Dancers throw their hands in the air at an Afrobeat night" },
  clubBand: { src: clubBand, alt: "A live band with saxophone, vocals and percussion performs on stage" },
  clubCrowdRed: { src: clubCrowdRed, alt: "A crowd dancing in deep red light" },
  clubEmbrace: { src: clubEmbrace, alt: "Friends embrace on a busy dance floor" },
  summerStageWide: { src: summerStageWide, alt: "WaaW Summer Sessions: DJ tent, graffiti walls and market stalls in a forest park" },
  summerSign: { src: summerSign, alt: "Hand-painted sign reading “Tervetuloa! Free Entry – WaaW Summer Sessions 18.7 Here”" },
  summerTentRain: { src: summerTentRain, alt: "People gather under a tent around a performer at the summer sessions" },
  summerPark: { src: summerPark, alt: "The WaawAfrica tent and banners set up in a pine forest park" },
  summerTentCrowd: { src: summerTentCrowd, alt: "A crowd shares food and music under a white festival tent" },
  summerMc: { src: summerMc, alt: "An MC performs into a microphone under the festival tent" },
  summerGraffitiDuo: { src: summerGraffitiDuo, alt: "Two young artists pose beside a freshly painted WAAW graffiti board" },
  summerGraffitiTrio: { src: summerGraffitiTrio, alt: "Three artists pose in front of a colourful graffiti wall" },
  summerKidsDj: { src: summerKidsDj, alt: "Children play on the grass in front of the WaawAfrica DJ booth" },
  summerGraffitiWalls: { src: summerGraffitiWalls, alt: "Artists paint graffiti walls outdoors during the summer sessions" },
  summerMcBanner: { src: summerMcBanner, alt: "An MC in a yellow shirt performs in front of the WaawAfrica banner" },
  summerDjBooth: { src: summerDjBooth, alt: "A DJ mixes at the WaawAfrica booth while people gather around" },
  summerDjMc: { src: summerDjMc, alt: "A DJ and an MC perform together at the WaawAfrica booth" },
  stageDanceTroupe: { src: stageDanceTroupe, alt: "A West African dance troupe performs with drummers on stage" },
  communityPuppet: { src: communityPuppet, alt: "Smiling guests pose with a big friendly puppet at a community event" },
  communityDinner: { src: communityDinner, alt: "People from different backgrounds share a long community dinner table" },
  stageBandCrowd: { src: stageBandCrowd, alt: "A crowd raises their hands for a live band on stage" },
  communityKids: { src: communityKids, alt: "Children in matching T-shirts hug and laugh with a performer" },
  workshopDrums: { src: workshopDrums, alt: "Schoolchildren learn to play djembe drums on stage" },
  outdoorStage: { src: outdoorStage, alt: "An audience enjoys an outdoor concert in a city park" },
  stageBand: { src: stageBand, alt: "A multicultural band performs at a live venue" },
  stageFlags: { src: stageFlags, alt: "Performers on stage holding the flags of Finland and Senegal" },
  stageDancerJump: { src: stageDancerJump, alt: "A dancer leaps in front of drummers in bright traditional outfits" },
  stageMaskedDancer: { src: stageMaskedDancer, alt: "A masked dancer in a vivid orange costume faces the audience" },
  humanityTeaching: { src: humanityTeaching, alt: "A volunteer talks with a group of children seated together in Senegal" },
  stageDanceEnergy: { src: stageDanceEnergy, alt: "Dancers and musicians fill the stage with energy" },
  stageDanceSchool: { src: stageDanceSchool, alt: "Students perform an African dance routine for a full audience" },
  festivalNight: { src: festivalNight, alt: "A huge night-time festival crowd in front of a lit stage" },
  humanityGiving: { src: humanityGiving, alt: "A volunteer hands out supplies to children in Senegal" },
  humanityGroup: { src: humanityGroup, alt: "A large group of children and volunteers smile together for a photo" },
  humanityMeal: { src: humanityMeal, alt: "Children share food together from bowls on the ground" },
  humanityCircle: { src: humanityCircle, alt: "Children sit in a circle sharing a meal" },
  stageDjembeFlag: { src: stageDjembeFlag, alt: "A drummer with painted face plays djembe in front of the Senegalese flag" },
  posterAnj6: { src: posterAnj6, alt: "Poster for Afrobeat Night JKL Round 6 on Saturday 24 October 2026 at Teerenpeli Jyväskylä" },
} satisfies Record<string, Photo>;
