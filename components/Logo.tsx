import Image from "next/image";
import logo from "@/public/images/logo.webp";

export default function Logo({ className = "", priority }: { className?: string; priority?: boolean }) {
  return <Image src={logo} alt="WaawAfrica Events" className={className} priority={priority} sizes="72px" />;
}
