import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal, dependency-free admin auth.
 * Set ADMIN_PASSWORD (and ideally AUTH_SECRET) in Vercel → Project → Settings → Environment Variables.
 * Optional: ADMIN_EMAIL to require a matching email as well.
 */
const COOKIE = "waaw_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const secret = () => process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");

const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

export const authConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export function checkCredentials(email: string, password: string) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const wantEmail = process.env.ADMIN_EMAIL;
  if (wantEmail && email.trim().toLowerCase() !== wantEmail.trim().toLowerCase()) return false;
  return safeEqual(password, pw);
}

export async function createSession() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const value = `${exp}.${sign(String(exp))}`;
  (await cookies()).set(COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!secret()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(exp));
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
