"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const query = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

let instance: Lenis | null = null;

/** Pause or resume page scrolling (e.g. while a menu or lightbox is open). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) instance?.stop();
  else instance?.start();
}

/** Lenis smooth scroll on desktop pointers only; touch and reduced-motion keep native scrolling. */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia(query);

    const sync = () => {
      if (media.matches && !instance) {
        instance = new Lenis({ autoRaf: true, lerp: 0.1 });
      } else if (!media.matches && instance) {
        instance.destroy();
        instance = null;
      }
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
