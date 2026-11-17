import Image from "next/image";
import { SiteShell } from "@/components/site/site-shell";
import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteShell>
    <section className="page-x mx-auto flex w-full max-w-page flex-1 flex-col justify-center pt-36 pb-24 md:pt-44 md:pb-36">
      <Image src="/brand/logo-mark.svg" alt="" width={144} height={68} unoptimized className="w-28 bg-transparent md:w-36" />
      <p className="mt-10 text-sm text-stone">Error 404</p>
      <h1 className="mt-2 max-w-3xl text-5xl">This frame did not make the album.</h1>
      <p className="mt-6 max-w-prose text-lg text-stone">
        The page you are looking for has moved or never existed. The photos are all still
        here, though.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See the work
        </ButtonLink>
      </div>
    </section>
    </SiteShell>
  );
}
