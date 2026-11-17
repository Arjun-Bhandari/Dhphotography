"use client";

import { useState } from "react";
import { JustifiedGallery } from "@/components/photo/justified-gallery";
import { Lightbox } from "@/components/photo/lightbox";
import type { Photo, PhotoCategory } from "@/content/photos";

const FILTERS: { label: string; categories: PhotoCategory[] | null }[] = [
  { label: "All", categories: null },
  { label: "Weddings", categories: ["wedding"] },
  { label: "Pre & post-wedding", categories: ["pre-wedding", "post-wedding", "haldi"] },
  { label: "Birthdays", categories: ["birthday"] },
  { label: "Programmes", categories: ["programme"] },
  { label: "Manipur", categories: ["manipur"] },
];

export function WorkGallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active = FILTERS[filter].categories;
  const shown = active ? photos.filter((p) => active.includes(p.category)) : photos;
  const filters = FILTERS.filter((f) => !f.categories || photos.some((p) => f.categories!.includes(p.category)));

  return (
    <>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const i = FILTERS.indexOf(f);
          const selected = i === filter;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(i)}
              className={[
                "min-h-10 rounded-full px-4 text-sm font-medium ring-1 ring-inset",
                "transition-[background-color,color,box-shadow] duration-(--duration-base) ease-out",
                selected ? "bg-ink text-paper ring-ink" : "text-ink ring-ink/15 hover:ring-ink/40",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so photos re-develop when the set changes. */}
      <JustifiedGallery
        key={filter}
        photos={shown}
        fillLastRow={false}
        onSelect={setOpenIndex}
        className="mt-8 md:mt-10"
      />

      <Lightbox photos={shown} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}
