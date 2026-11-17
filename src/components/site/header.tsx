"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { navigation } from "@/lib/site";
import { MenuToggle, MobileMenuPanel } from "./mobile-menu";

/** Pages that open with a full-bleed photo, where the header starts transparent over it. */
const overlayRoutes = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // 0 → 1 over the first 120px: the bar frosts, rounds and lifts off the edges gradually.
      headerRef.current?.style.setProperty("--frost", String(Math.min(y / 120, 1)));
      setScrolled(y > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = overlayRoutes.has(pathname) && !scrolled;
  const onDark = overlay || menuOpen;

  return (
    <>
      {/* Always visible: flat at the top of the page, a floating rounded frosted bar once scrolled. */}
      <header
        ref={headerRef}
        className={[
          "page-x fixed inset-x-0 top-0 z-50 pt-[calc(var(--frost,0)*0.75rem)]",
          "transition-[color] duration-(--duration-hover-fill) ease-smooth",
          onDark ? "text-paper" : "text-ink",
        ].join(" ")}
      >
        <div
          style={{
            // The scroll position drives these; the short linear part only smooths out wheel steps.
            transition:
              "background-color 200ms linear, backdrop-filter 200ms linear, box-shadow 200ms linear, " +
              "border-radius 200ms linear, padding 200ms linear",
          }}
          className={[
            // Max width = page container minus its xl side padding, so the logo lines up with page content.
            "mx-auto flex h-16 max-w-[calc(var(--container-page)-6rem)] items-center justify-between gap-6 md:h-18",
            "rounded-[calc(var(--frost,0)*2.25rem)] px-[calc(var(--frost,0)*1rem)] md:px-[calc(var(--frost,0)*1.5rem)]",
            menuOpen
              ? "bg-transparent"
              : "bg-[rgb(255_255_255/calc(var(--frost,0)*0.85))] backdrop-blur-[calc(var(--frost,0)*12px)] " +
                "shadow-[0_10px_30px_-12px_rgb(22_32_27/calc(var(--frost,0)*0.3)),0_0_0_1px_rgb(22_32_27/calc(var(--frost,0)*0.06))]",
          ].join(" ")}
        >
          <Link href="/" aria-label="Dh Photography, home" className="-m-2 p-2">
            <Logo variant="horizontal" title="" className="h-9 w-auto md:h-10" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative rounded-full px-4 py-2 text-sm font-medium opacity-80 transition-opacity duration-(--duration-fast) hover:opacity-100 aria-[current=page]:opacity-100"
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sindoor"
                    />
                  ) : null}
                </Link>
              );
            })}
            <ButtonLink href="/contact" variant={onDark ? "on-dark" : "primary"} className="ml-4">
              Get a quote
            </ButtonLink>
          </nav>

          <MenuToggle open={menuOpen} onOpenChange={setMenuOpen} toggleRef={toggleRef} />
        </div>
      </header>
      <MobileMenuPanel
        open={menuOpen}
        onOpenChange={setMenuOpen}
        pathname={pathname}
        toggleRef={toggleRef}
      />
    </>
  );
}
