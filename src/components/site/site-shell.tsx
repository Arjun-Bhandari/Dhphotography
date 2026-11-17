import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { SmoothScroll } from "./smooth-scroll";

/** Public site chrome: skip link, smooth scroll, header and footer. Not used by /dashboard. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Header />
      <div id="main" className="flex flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
}
