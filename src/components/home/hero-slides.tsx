"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export type HeroSlideImage = {
  desktopSrcSet?: string;
  mobileSrcSet?: string;
  src: string;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  desktopFocus: string;
  mobileFocus: string;
};

const INTERVAL = 6000;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Full-bleed photos that crossfade on a timer. Pauses on request, while the tab is hidden,
 * and never auto-advances for reduced-motion visitors.
 */
export function HeroSlides({ slides }: { slides: HeroSlideImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const playing = !paused && !reducedMotion && slides.length > 1;

  useEffect(() => {
    if (!playing) return;
    let timer = setTimeout(function tick() {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
      timer = setTimeout(tick, INTERVAL);
    }, INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, slides.length, index]);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <picture
              key={slide.src}
              className={[
                "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none",
                active ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <source media="(min-width: 48rem)" srcSet={slide.desktopSrcSet} sizes={slide.sizes} />
              <img
                srcSet={slide.mobileSrcSet}
                sizes={slide.sizes}
                src={slide.src}
                alt={active ? slide.alt : ""}
                width={slide.width}
                height={slide.height}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                style={
                  {
                    "--focus-mobile": slide.mobileFocus,
                    "--focus-desktop": slide.desktopFocus,
                  } as React.CSSProperties
                }
                className={[
                  "size-full object-cover [object-position:var(--focus-mobile)] md:[object-position:var(--focus-desktop)]",
                  // A slow settle while each slide is up; the first one also "develops" on load.
                  "transition-transform duration-[7000ms] ease-out motion-reduce:transition-none",
                  active ? "scale-100" : "scale-[1.04]",
                  i === 0 ? "develop" : "",
                ].join(" ")}
              />
            </picture>
          );
        })}
      </div>

      {slides.length > 1 ? (
        <div className="flex items-center gap-3" role="group" aria-label="Hero photos">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group grid size-6 place-items-center rounded-full"
            >
              <span
                className={[
                  "block size-2 rounded-full bg-paper transition-[opacity,scale] duration-(--duration-base) ease-out",
                  i === index ? "scale-125 opacity-100" : "opacity-45 group-hover:opacity-80",
                ].join(" ")}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="ml-1 grid size-8 place-items-center rounded-full text-paper/80 ring-1 ring-paper/40 transition-colors hover:text-paper hover:ring-paper/80"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="currentColor">
              {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}
