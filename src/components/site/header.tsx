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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide while reading down the page, come back as soon as the visitor scrolls up.
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = overlayRoutes.has(pathname) && !scrolled;
  const onDark = overlay || menuOpen;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color] duration-(--duration-slow) ease-out",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
          onDark ? "text-paper" : "text-ink",
          !onDark && scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="page-x mx-auto flex h-18 max-w-page items-center justify-between gap-6">
          <Link href="/" aria-label="Dh Photography, home" className="-m-2 p-2">
            <Logo variant="horizontal" title="" className="h-10 w-auto md:h-11" />
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
