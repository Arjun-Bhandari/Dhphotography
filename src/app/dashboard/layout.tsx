import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Dh Photography dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: LayoutProps<"/dashboard">) {
  return <div className="flex min-h-dvh flex-col bg-mist">{children}</div>;
}
