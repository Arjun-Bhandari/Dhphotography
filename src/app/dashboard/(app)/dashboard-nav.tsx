"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const tabs = [
  { href: "/dashboard", label: "Inquiries" },
  { href: "/dashboard/insights", label: "Insights" },
] as const;

/** Tabs for the dashboard. `inquiriesBadge` is streamed in by the server (count of new inquiries). */
export function DashboardNav({ inquiriesBadge }: { inquiriesBadge?: ReactNode }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={[
              "relative inline-flex h-16 items-center gap-2 px-3 text-sm font-medium transition-colors",
              active ? "text-ink" : "text-stone hover:text-ink",
            ].join(" ")}
          >
            {tab.label}
            {tab.href === "/dashboard" ? inquiriesBadge : null}
            {active ? <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-sindoor" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}
