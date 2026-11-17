import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { countNewInquiries } from "@/lib/dashboard/inquiries";
import { logout } from "../actions";
import { DashboardNav } from "./dashboard-nav";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <>
      <header className="border-b border-ink/10 bg-paper">
        <div className="page-x mx-auto flex h-16 w-full max-w-page items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/dashboard" aria-label="Dashboard home" className="shrink-0">
              <Image src="/brand/logo-mark.svg" alt="" width={56} height={26} unoptimized className="bg-transparent" />
            </Link>
            <DashboardNav
              inquiriesBadge={
                <Suspense fallback={null}>
                  <NewBadge />
                </Suspense>
              }
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="hidden text-stone underline-offset-4 hover:text-ink hover:underline sm:inline">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="text-stone underline-offset-4 hover:text-ink hover:underline">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="page-x mx-auto w-full max-w-page flex-1 py-10 md:py-14">{children}</main>
    </>
  );
}

async function NewBadge() {
  await connection();
  const n = await countNewInquiries();
  if (!n) return null;
  return (
    <span className="grid min-w-5 place-items-center rounded-full bg-sindoor px-1.5 text-xs leading-5 text-paper tabular-nums">
      <span className="sr-only">, </span>
      {n}
      <span className="sr-only"> new</span>
    </span>
  );
}
