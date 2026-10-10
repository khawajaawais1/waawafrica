import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import LoginForm from "@/components/admin/LoginForm";
import { authConfigured, isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = authConfigured();
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo className="h-20 w-auto" priority /></div>
        <div className="rounded-[2rem] bg-cream p-7 text-ink shadow-2xl sm:p-9">
          <div aria-hidden="true" className="kente -mx-7 -mt-7 mb-7 h-2 rounded-t-[2rem] sm:-mx-9 sm:-mt-9" />
          <h1 className="text-3xl font-extrabold">Team sign in</h1>
          <p className="mb-6 mt-2 text-sm text-ink/70">Manage WaawAfrica events.</p>
          {configured ? (
            <LoginForm askEmail={Boolean(process.env.ADMIN_EMAIL)} />
          ) : (
            <div className="rounded-2xl bg-sun/30 p-4 text-sm leading-relaxed">
              <strong>Admin isn’t set up yet.</strong> In Vercel → Project → Settings → Environment Variables, add{" "}
              <code className="font-bold">ADMIN_PASSWORD</code> (and optionally <code className="font-bold">ADMIN_EMAIL</code>,{" "}
              <code className="font-bold">AUTH_SECRET</code>), then redeploy. Locally, put them in <code className="font-bold">.env.local</code>.
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-cream/60"><a href="/" className="underline">← Back to the website</a></p>
      </div>
    </main>
  );
}
