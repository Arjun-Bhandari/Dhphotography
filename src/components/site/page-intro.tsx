import type { ReactNode } from "react";

/** Opening block for inner pages: clears the fixed header and sets the page title. */
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="page-x mx-auto w-full max-w-page pt-40 pb-16 md:pt-48">
      <h1 className="max-w-4xl text-5xl">{title}</h1>
      {children ? <div className="mt-8 max-w-prose text-lg text-stone">{children}</div> : null}
    </section>
  );
}
