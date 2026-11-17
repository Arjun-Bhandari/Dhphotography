import { ButtonLink } from "@/components/ui/button";

export default function Home() {
  return (
    // Placeholder hero until Puskar's photos arrive; the header overlays this on "/".
    // Shorter on phones so the headline is not floating under a screen of empty space.
    <section className="relative flex min-h-[72svh] items-end bg-forest text-paper md:min-h-dvh">
      <div className="page-x mx-auto w-full max-w-page pt-32 pb-12 md:pb-24">
        <h1 className="max-w-4xl text-5xl">Capturing your happiest &ldquo;Yes&rdquo; in timeless frames.</h1>
        <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
          <ButtonLink href="/contact" variant="on-dark">
            Get a quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
