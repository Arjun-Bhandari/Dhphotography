import Image from "next/image";
import {
  AppleCarouselContent,
  AppleCarouselControls,
  AppleCarouselItem,
  AppleCarouselPlayButton,
  AppleCarouselRoot,
  AppleCarouselTab,
  AppleCarouselTabList,
} from "@/components/apple-carousel";
import type { Photo } from "@/content/photos";

/** Auto-advancing strip; square corners and each photo at its own width (never cropped). */
export function ManipurCarousel({ photos }: { photos: Photo[] }) {
  return (
    <AppleCarouselRoot duration={5000}>
      <AppleCarouselContent>
        {photos.map((photo) => (
          <AppleCarouselItem
            key={photo.id}
            // Width = card height × the photo's own ratio, so every card shows its whole photo.
            style={{ width: `calc(var(--card-h) * ${photo.width / photo.height})` }}
            className="h-(--card-h) rounded-none bg-mist [--card-h:30rem] @max-5xl:[--card-h:26rem] @max-3xl:[--card-h:22rem]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 48rem) 45vw, 80vw"
              className="size-full"
            />
          </AppleCarouselItem>
        ))}
      </AppleCarouselContent>

      <AppleCarouselControls size="sm">
        <AppleCarouselTabList aria-label="Manipur photos">
          {photos.map((photo) => (
            <AppleCarouselTab key={photo.id}>{photo.alt}</AppleCarouselTab>
          ))}
        </AppleCarouselTabList>
        <AppleCarouselPlayButton />
      </AppleCarouselControls>
    </AppleCarouselRoot>
  );
}
