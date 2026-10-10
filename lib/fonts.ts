import localFont from "next/font/local";

export const bricolage = localFont({ src: "../app/fonts/bricolage.woff2", variable: "--font-bricolage", weight: "200 800", display: "swap" });
export const fraunces = localFont({ src: "../app/fonts/fraunces-italic.woff2", variable: "--font-fraunces", style: "italic", weight: "100 900", display: "swap" });
export const manrope = localFont({ src: "../app/fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });

export const fontVars = `${bricolage.variable} ${fraunces.variable} ${manrope.variable}`;
