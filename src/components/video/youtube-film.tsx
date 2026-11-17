"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Light YouTube embed: shows the thumbnail and a play button, and only loads the
 * player (privacy-enhanced, youtube-nocookie) when pressed. Keeps pages fast.
 */
export function YouTubeFilm({ id, title, sizes = "100vw" }: { id: string; title: string; sizes?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-forest">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play film: ${title}`}
          className="group absolute inset-0 grid place-items-center"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-[scale] duration-(--duration-slow) ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span aria-hidden className="absolute inset-0 bg-forest/25 transition-colors group-hover:bg-forest/10" />
          <span
            aria-hidden
            className="relative grid size-16 place-items-center rounded-full bg-paper text-forest shadow-btn-dark transition-[scale] duration-(--duration-base) ease-out group-hover:scale-110 md:size-20"
          >
            <svg viewBox="0 0 16 16" className="ml-1 size-6 md:size-7" fill="currentColor">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
