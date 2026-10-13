import nodemailer from "nodemailer";

const mailFrom = "developers@happy2tech.fi";
const mailTo = "waaw.africajkl@gmail.com";

export async function deliver(kind: "contact" | "waitlist", payload: Record<string, unknown>) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const email = typeof payload.email === "string" ? payload.email : "";
  const text = kind === "contact"
    ? [
        `Name: ${String(payload.name ?? "")}`,
        `Email: ${email}`,
        `Organisation: ${String(payload.organisation ?? "")}`,
        `Topic: ${String(payload.topic ?? "")}`,
        `Language: ${String(payload.lang ?? "en")}`,
        "",
        "Message:",
        String(payload.message ?? ""),
      ].join("\n")
    : `Waitlist email: ${email}\nList: ${String(payload.list ?? "dakar-bazaar")}`;

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: kind === "contact" && isEmail(email) ? email : undefined,
      subject: kind === "contact" ? `Website contact: ${String(payload.topic ?? "general")}` : "Dakar Bazaar waitlist signup",
      text,
    });
    return true;
  } catch (error) {
    console.error("SMTP form delivery failed", error);
    return false;
  }
}

export const isEmail = (v: unknown) => typeof v === "string" && /^\S+@\S+\.\S+$/.test(v) && v.length < 200;
export const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
