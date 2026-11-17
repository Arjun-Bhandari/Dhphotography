"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navigation, site } from "@/lib/site";
import { setScrollLocked } from "./smooth-scroll";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
};

export function MenuToggle({
  open,
  onOpenChange,
  toggleRef,
}: Pick<MobileMenuProps, "open" | "onOpenChange"> & { toggleRef: RefObject<HTMLButtonElement | null> }) {
  return (
    <button
      ref={toggleRef}
      type="button"
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => onOpenChange(!open)}
      className="-mr-2 grid size-11 place-items-center rounded-full md:hidden"
    >
      <span aria-hidden className="relative block h-3 w-6">
        <span
          className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-[top,rotate] duration-(--duration-base) ease-out ${open ? "top-[5px] rotate-45" : "top-0"}`}
        />
        <span
          className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-[top,rotate] duration-(--duration-base) ease-out ${open ? "top-[5px] -rotate-45" : "top-2.5"}`}
        />
      </span>
    </button>
  );
}

/** Rendered outside the header: the header's transform/blur would otherwise trap this fixed panel. */
export function MobileMenuPanel({
  open,
  onOpenChange,
  pathname,
  toggleRef,
}: MobileMenuProps & { toggleRef: RefObject<HTMLButtonElement | null> }) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const openedRef = useRef(false);

  // Close whenever the route changes.
  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  useEffect(() => {
    setScrollLocked(open);
    if (open) {
      openedRef.current = true;
      firstLinkRef.current?.focus({ preventScroll: true });
    } else if (openedRef.current) {
      openedRef.current = false;
      toggleRef.current?.focus({ preventScroll: true });
    }
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange, toggleRef]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const onChange = () => media.matches && onOpenChange(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [onOpenChange]);

  return (
    <div className="md:hidden">
      {/* Panel opens as a circle growing from the menu button, like the logo's circles. */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-40 flex flex-col bg-forest pt-18 text-paper",
          "transition-[clip-path] motion-reduce:transition-none",
          // Radius = screen diagonal, so the whole duration is visible growth (no overshoot off-screen).
          open
            ? "duration-(--duration-menu-open) ease-smooth [clip-path:circle(hypot(100vw,100dvh)_at_calc(100%-2.25rem)_2.25rem)]"
            : "duration-(--duration-menu-close) ease-in-out [clip-path:circle(0px_at_calc(100%-2.25rem)_2.25rem)]",
        ].join(" ")}
      >
        <nav aria-label="Main" className="page-x flex flex-1 flex-col justify-center gap-2">
          {navigation.map((item, i) => (
            <Link
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              style={{ transitionDelay: open ? `${200 + i * 50}ms` : "0ms" }}
              className={[
                "font-display text-4xl transition-[opacity,translate] duration-(--duration-slow) ease-out",
                "aria-[current=page]:text-blush motion-reduce:transition-none",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="page-x flex flex-col gap-4 pb-10">
          <ButtonLink href={site.whatsappUrl} target="_blank" rel="noreferrer" variant="on-dark" className="self-start">
            Message on WhatsApp
          </ButtonLink>
          <a href={`tel:${site.phone}`} className="text-blush tabular-nums">
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
