import { getT } from "@/lib/i18n/server";
import CountdownClient from "./CountdownClient";

export default async function Countdown(props: { to: string; endISO?: string; tone?: "dark" | "light" }) {
  const { t } = await getT();
  return <CountdownClient {...props} t={t.countdown} />;
}
