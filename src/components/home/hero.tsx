import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { home } from "@/content/photos";
import { site } from "@/lib/site";

/**
 * Full-bleed hero: a landscape photo on desktop, a portrait one on phones (art direction).
 * This is the one place a photo is cropped, so each image carries a focal point.
 */
export function Hero() {
  const { heroDesktop: desktop, heroMobile: mobile } = home;
  const common = { alt: desktop.alt, sizes: "100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest text-paper md:min-h-dvh">
      <picture className="absolute inset-0 -z-20">
        <source media="(min-width: 48rem)" srcSet={desktopSrcSet} />
        <img
          {...img}
          srcSet={mobileSrcSet}
          alt={img.alt}
          className="develop size-full object-cover [object-position:var(--focus-mobile)] md:[object-position:var(--focus-desktop)]"
          style={
            {
              "--focus-mobile": mobile.focus ?? "50% 50%",
              "--focus-desktop": desktop.focus ?? "50% 50%",
            } as React.CSSProperties
          }
        />
      </picture>
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

      <div className="page-x mx-auto w-full max-w-page pt-40 pb-12 md:pb-20">
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
            <ButtonLink href="/contact">
              Get a quote
            </ButtonLink>
            <ButtonLink href="/work" variant="on-dark-ghost">
              See the work
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
