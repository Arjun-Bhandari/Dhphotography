import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Photo } from "@/components/photo/photo";
import { ButtonLink } from "@/components/ui/button";
import { packages } from "@/content/packages";
import { home, photos } from "@/content/photos";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="page-x mx-auto grid w-full max-w-page gap-12 py-24 md:grid-cols-12 md:items-center md:gap-8 md:py-36">
        <div className="md:col-span-5">
          <h2 className="text-4xl">Every frame shot, edited and delivered by Puskar.</h2>
          <p className="mt-6 max-w-prose text-lg text-stone">
            For six years Puskar Dahal has photographed weddings, pre-weddings, school functions,
            poojas and birthdays. He is with you from the first ritual to the last dance, then
            edits and delivers every photo and film himself.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            About Puskar
          </ButtonLink>
        </div>
        <Photo
          photo={photos.puskar}
          sizes="(min-width: 48rem) 50vw, 100vw"
          className="md:col-span-6 md:col-start-7"
        />
      </section>

      {/* Selected work: natural aspect ratios in columns, nothing cropped */}
      <section className="page-x mx-auto w-full max-w-page pb-24 md:pb-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl">Selected work</h2>
          <Link
            href="/work"
            className="font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            See all work
          </Link>
        </div>
        <div className="mt-10 columns-2 gap-3 sm:gap-4 md:mt-14 md:columns-3 md:gap-6">
          {home.selected.map((photo) => (
            <Photo
              key={photo.id}
              photo={photo}
              sizes="(min-width: 48rem) 33vw, 50vw"
              className="mb-3 break-inside-avoid sm:mb-4 md:mb-6"
            />
          ))}
        </div>
      </section>

      {/* Manipur: a horizontal strip at a fixed height, widths follow each photo */}
      <section className="pb-24 md:pb-36">
        <div className="page-x mx-auto w-full max-w-page">
          <h2 className="text-4xl">Manipur, between shoots</h2>
          <p className="mt-4 max-w-prose text-lg text-stone">
            Hills, waterfalls, temples and quiet details near home. The same eye he brings to your
            day.
          </p>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 [scrollbar-width:thin] md:mt-14 md:scroll-px-8 md:gap-6 md:px-8 xl:scroll-px-[max(3rem,calc((100vw_-_var(--container-page))/2_+_3rem))] xl:px-[max(3rem,calc((100vw_-_var(--container-page))/2_+_3rem))]">
          {home.manipur.map((photo) => (
            <Photo
              key={photo.id}
              photo={photo}
              sizes="(min-width: 48rem) 40vw, 70vw"
              className="shrink-0 snap-start"
              imgClassName="h-[22rem] w-auto max-w-none md:h-[30rem]"
            />
          ))}
        </div>
      </section>

      {/* Packages teaser */}
      <section className="bg-mist">
        <div className="page-x mx-auto grid w-full max-w-page gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-32">
          <div className="md:col-span-4">
            <h2 className="text-4xl">A package for every celebration</h2>
            <p className="mt-6 max-w-sm text-lg text-stone">
              Every package is shaped around your day, so each one ends in a quote made for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Get a quote</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                See packages
              </ButtonLink>
            </div>
          </div>
          <ul className="space-y-10 md:col-span-7 md:col-start-6">
            {packages.map((pkg) => (
              <li key={pkg.id} className="grid gap-1 sm:grid-cols-[1fr_1fr] sm:gap-6">
                <h3 className="text-2xl">{pkg.name}</h3>
                <div>
                  <p className="font-medium">{pkg.forWhat}</p>
                  <p className="text-stone">{pkg.coverage}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
