import { ButtonLink } from "@/components/ui/button";

export default function Home() {
  return (
    // Placeholder hero until Puskar's photos arrive; the header overlays this on "/".
    <section className="relative flex min-h-dvh items-end bg-forest text-paper">
      <div className="page-x mx-auto w-full max-w-page pb-16 md:pb-24">
        <h1 className="max-w-4xl text-5xl">Capturing your happiest &ldquo;Yes&rdquo; in timeless frames.</h1>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="on-dark">
            Get a quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
