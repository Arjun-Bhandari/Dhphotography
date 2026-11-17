"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo as PhotoData } from "@/content/photos";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  className?: string;
  /** Classes for the <img>; defaults to natural aspect ratio (never cropped). */
  imgClassName?: string;
};

/**
 * A photo at its natural aspect ratio that "develops" (blush wash → full colour)
 * the first time it scrolls into view. Blush sits behind it as the placeholder.
 */
export function Photo({ photo, sizes, className = "", imgClassName = "h-auto w-full" }: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A cached image can finish loading before hydration, so onLoad never fires for it.
    if (imgRef.current?.complete) setLoaded(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bg-blush/40 ${className}`}>
      <Image
        ref={imgRef}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`${imgClassName} ${inView && loaded ? "develop" : "opacity-0"}`}
      />
    </div>
  );
}
