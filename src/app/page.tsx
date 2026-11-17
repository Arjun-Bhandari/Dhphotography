import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function Home() {
  return (
    // Placeholder hero until Puskar's photos arrive; the header overlays this on "/".
    // Shorter on phones so the headline is not floating under a screen of empty space.
    <section className="relative flex min-h-[60svh] items-end bg-forest text-paper md:min-h-[88svh]">
      <div className="page-x mx-auto w-full max-w-page pt-32 pb-12 md:pb-24">
        <h1 className="max-w-4xl text-5xl">{site.taglines.brand}</h1>
        <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
          <ButtonLink href="/contact" variant="on-dark">
            Get a quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
