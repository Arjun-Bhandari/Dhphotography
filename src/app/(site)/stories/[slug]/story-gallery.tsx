"use client";

import { useState } from "react";
import { JustifiedGallery } from "@/components/photo/justified-gallery";
import { Lightbox } from "@/components/photo/lightbox";
import type { Photo } from "@/content/photos";

/** A story's photos in order, each opening in the lightbox. */
export function StoryGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <JustifiedGallery photos={photos} fillLastRow={false} onSelect={setOpenIndex} />
      <Lightbox photos={photos} index={openIndex} onIndexChange={setOpenIndex} />
    </>
  );
}
