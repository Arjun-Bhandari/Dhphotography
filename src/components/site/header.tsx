"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      // 0 → 1 over the first 80px: the frosted pill fades in with the scroll.
      headerRef.current?.style.setProperty("--frost", String(Math.min(y / 80, 1)));
      // Switch text to ink early, before the pill is light enough to make white text hard to read.
      setScrolled(y > 28);
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
          "page-x fixed inset-x-0 top-0 z-50 pt-3",
          "transition-[color] duration-300 ease-out",
          onDark ? "text-paper" : "text-ink",
          // Over a photo: full-strength links with a soft shadow so they read on bright areas.
          overlay ? "[text-shadow:0_1px_10px_rgb(22_32_27/0.45)] [&_nav_a]:opacity-100" : "",
        ].join(" ")}
      >
        {/* Max width = page container minus its xl side padding, so the logo lines up with page content. */}
        <div className="relative mx-auto grid h-16 max-w-[calc(var(--container-page)-6rem)] grid-cols-[1fr_auto] items-center gap-6 md:h-18 md:grid-cols-[1fr_auto_1fr]">
          {/*
            The frosted pill is its own layer that only fades and scales (both GPU-composited),
            so it tracks the scroll exactly with no blur or layout recalculated per frame.
          */}
          <div
            aria-hidden
            style={
              menuOpen
                ? { opacity: 0 }
                : { opacity: "var(--frost, 0)", scale: "calc(0.97 + var(--frost, 0) * 0.03)" }
            }
            className="pointer-events-none absolute inset-y-0 -inset-x-3 -z-10 rounded-full bg-paper/85 shadow-[0_10px_30px_-12px_rgb(22_32_27/0.3),0_0_0_1px_rgb(22_32_27/0.06)] backdrop-blur-md md:-inset-x-6"
          />

          <Link href="/" aria-label="Dh Photography, home" className="-m-2 justify-self-start p-2">
            {/*
              Logo files (cached once for the whole site) instead of inline SVG; the light and
              dark versions crossfade with the header's text colour.
            */}
            <span className="relative block h-9 w-[128px] md:h-10 md:w-[143px]">
              <Image
                src="/brand/logo-horizontal-light.svg"
                alt=""
                width={143}
                height={40}
                unoptimized
                preload
                className={`absolute inset-0 size-full bg-transparent transition-opacity duration-300 ${onDark ? "opacity-100" : "opacity-0"}`}
              />
              <Image
                src="/brand/logo-horizontal.svg"
                alt=""
                width={143}
                height={40}
                unoptimized
                preload
                className={`absolute inset-0 size-full bg-transparent transition-opacity duration-300 ${onDark ? "opacity-0" : "opacity-100"}`}
              />
            </span>
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
          </nav>

          <div className="hidden justify-self-end md:block">
            <ButtonLink href="/contact" variant={onDark ? "on-dark" : "primary"}>
              Get a quote
            </ButtonLink>
          </div>

          <div className="justify-self-end md:hidden">
            <MenuToggle open={menuOpen} onOpenChange={setMenuOpen} toggleRef={toggleRef} />
          </div>
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
