import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Sparkles, Dumbbell, Users, MessageCircle } from "lucide-react";

import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/admin/SignOutButton";
import AdminNavLinks from "@/components/admin/AdminNavLinks";

export const metadata = {
  title: "Admin Control Center | THE FIXX",
};

const navItems = [
  { label: "Overview", href: "/admin", icon: Sparkles },
  { label: "Classes", href: "/admin/classes", icon: Dumbbell },
  { label: "Trainers", href: "/admin/trainers", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageCircle },
];

export default async function AdminSecureLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <div className="relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-orange-500/18 via-amber-400/12 to-transparent px-5 py-10 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              THE FIXX
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Admin Control Center
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Curate immersive content, trainers, and member experiences.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
              {session.user?.email}
            </div>
            <SignOutButton />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.22),_transparent_55%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-6 sm:py-12 lg:flex-row">
        <aside className="w-full lg:max-w-xs lg:shrink-0">
          <AdminNavLinks items={navItems} />
        </aside>
        <main className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
