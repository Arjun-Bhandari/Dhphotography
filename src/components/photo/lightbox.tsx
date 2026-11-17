"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { setScrollLocked } from "@/components/site/smooth-scroll";
import type { Photo } from "@/content/photos";

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

/** Fullscreen viewer on forest green. Whole photo always visible (contain, never cropped). */
export function Lightbox({ photos, index, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const swipeStart = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + photos.length) % photos.length);
  };
  const close = () => onIndexChange(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });
    // Next frame, so the opening fade actually transitions from its start state.
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      setVisible(false);
      setScrollLocked(false);
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndexChange(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!photo || index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      className={[
        "fixed inset-0 z-[70] flex flex-col bg-forest text-paper",
        "transition-opacity duration-(--duration-slow) ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onPointerDown={(e) => {
        swipeStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeStart.current === null) return;
        const dx = e.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="page-x flex h-16 shrink-0 items-center justify-between md:h-20">
        <p className="text-sm text-paper/70 tabular-nums">
          {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-full ring-1 ring-paper/30 transition-colors hover:bg-paper hover:text-forest"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 md:px-24">
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className={[
            "bg-transparent object-contain transition-[opacity,scale] duration-(--duration-slow) ease-out motion-reduce:transition-none",
            visible ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
          ].join(" ")}
        />
        {photos.length > 1 ? (
          <>
            <NavButton direction="previous" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </>
        ) : null}
      </div>

      <p className="page-x shrink-0 py-5 text-center text-sm text-paper/80 md:py-6">{photo.alt}</p>
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const next = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Next photo" : "Previous photo"}
      className={[
        "absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-forest/60 ring-1 ring-paper/30 backdrop-blur-sm transition-colors hover:bg-paper hover:text-forest md:grid",
        next ? "right-6" : "left-6",
      ].join(" ")}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={next ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5"} />
      </svg>
    </button>
  );
}
