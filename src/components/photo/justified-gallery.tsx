import type { Photo as PhotoData } from "@/content/photos";
import { Photo } from "./photo";

/**
 * Justified rows: every photo in a row has the same height and each row spans the full
 * width, with no cropping. Each item grows in proportion to its aspect ratio, which keeps
 * heights equal. With `fillLastRow` off, a spacer keeps a short last row at row height
 * instead of stretching it (useful when the number of photos varies).
 */
export function JustifiedGallery({
  photos,
  className = "",
  fillLastRow = true,
}: {
  photos: PhotoData[];
  className?: string;
  fillLastRow?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-2 [--row-h:9rem] sm:gap-3 sm:[--row-h:13rem] md:gap-4 md:[--row-h:17rem] xl:[--row-h:20rem] ${fillLastRow ? "" : "after:grow-[999] after:content-['']"} ${className}`}
    >
      {photos.map((photo) => {
        const ratio = photo.width / photo.height;
        return (
          <div
            key={photo.id}
            style={{ flexGrow: ratio, flexBasis: `calc(var(--row-h) * ${ratio})` }}
            className="min-w-0"
          >
            <Photo photo={photo} sizes="(min-width: 48rem) 40vw, 60vw" />
          </div>
        );
      })}
    </div>
  );
}
