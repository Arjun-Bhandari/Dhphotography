import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { home } from "@/content/photos";
import { site } from "@/lib/site";
import { HeroSlides, type HeroSlideImage } from "./hero-slides";

/**
 * Full-bleed hero slideshow. Each slide is art-directed (landscape on desktop, portrait on
 * phones) and carries focal points: the one place photos are cropped.
 */
export function Hero() {
  const slides: HeroSlideImage[] = home.heroSlides.map(({ desktop, mobile, desktopFocus, mobileFocus }) => {
    const common = { alt: desktop.alt, sizes: "100vw" };
    const {
      props: { srcSet: desktopSrcSet },
    } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
    const {
      props: { srcSet: mobileSrcSet, src, sizes, width, height },
    } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });
    return {
      desktopSrcSet,
      mobileSrcSet,
      src,
      sizes,
      width: Number(width),
      height: Number(height),
      alt: mobile.alt,
      desktopFocus: desktopFocus ?? "50% 50%",
      mobileFocus: mobileFocus ?? "50% 50%",
    };
  });

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest text-paper md:min-h-dvh">
      {/* Forest-tinted shade so the headline reads on any photo; strongest at the bottom. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(30_51_40/0.85),rgb(30_51_40/0.35)_45%,rgb(30_51_40/0.1)_70%)]"
      />
      {/* Separate top scrim so header links stay readable over bright skies and leaves. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(to_bottom,rgb(22_32_27/0.7),rgb(22_32_27/0.35)_50%,transparent)]"
      />

      <div className="page-x mx-auto w-full max-w-page pt-40 pb-10 md:pb-16">
        {/*
          Kept low and wide on desktop (two-line headline, copy and buttons on one row)
          so the text stays in the bottom third, clear of faces in the photo.
        */}
        <h1 className="max-w-3xl text-4xl md:max-w-5xl">{site.taglines.brand}</h1>
        <div className="mt-5 flex flex-col gap-8 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg text-paper/85">
            Weddings, pre-weddings, programmes and birthdays across India, shot by Puskar Dahal.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Get a quote</ButtonLink>
            <ButtonLink href="/work" variant="on-dark-ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
        <div className="mt-8 md:mt-10">
          <HeroSlides slides={slides} />
        </div>
      </div>
    </section>
  );
}
