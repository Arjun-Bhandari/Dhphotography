import Image from "next/image";
import Link from "next/link";
import { logout } from "../actions";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <>
      <header className="border-b border-ink/10 bg-paper">
        <div className="page-x mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/brand/logo-mark.svg" alt="" width={56} height={26} unoptimized className="bg-transparent" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" target="_blank" className="text-stone underline-offset-4 hover:text-ink hover:underline">
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
