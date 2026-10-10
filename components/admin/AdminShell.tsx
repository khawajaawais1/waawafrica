import Link from "next/link";
import Logo from "@/components/Logo";

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-20 bg-ink text-cream">
        <div aria-hidden="true" className="kente h-1.5" />
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3"><Logo className="h-10 w-auto" /><span className="text-sm font-bold">← All events</span></Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-4 pt-8 sm:px-6 sm:pt-12">
        <h1 className="mb-8 text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {children}
      </main>
    </>
  );
}
