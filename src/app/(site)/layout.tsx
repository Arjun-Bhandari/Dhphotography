import { SiteShell } from "@/components/site/site-shell";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
