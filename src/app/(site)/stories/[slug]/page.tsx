import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryGallery } from "./story-gallery";
import { Photo } from "@/components/photo/photo";
import { ButtonLink } from "@/components/ui/button";
import { YouTubeFilm } from "@/components/video/youtube-film";
import { getStory, stories } from "@/content/stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return { title: story.title, description: story.intro };
}

// The page itself stays synchronous so navigation can show its shell instantly;
// the part that reads the slug sits inside Suspense. Unknown slugs render the
// not-found UI with noindex (with Cache Components the status stays 200 by design).
export default function Page({ params }: PageProps<"/stories/[slug]">) {
  return (
    <Suspense fallback={<div aria-hidden className="min-h-dvh" />}>
      <Story params={params} />
    </Suspense>
  );
}

async function Story({ params }: { params: PageProps<"/stories/[slug]">["params"] }) {
  const story = getStory((await params).slug);
  if (!story) notFound();

  const index = stories.indexOf(story);
  const next = stories[(index + 1) % stories.length];

  return (
    <>
      <section className="page-x mx-auto w-full max-w-page pt-36 md:pt-44">
        <Link href="/stories" className="text-sm text-stone underline-offset-4 hover:text-ink hover:underline">
          All stories
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-6">
            <p className="text-sm text-stone">
              {story.occasion}, {story.location}, {story.date}
            </p>
            <h1 className="mt-2 text-5xl">{story.title}</h1>
            <p className="mt-6 max-w-prose text-lg text-stone">{story.intro}</p>
          </div>
          <Photo
            photo={story.cover}
            sizes="(min-width: 48rem) 45vw, 100vw"
            className="md:col-span-5 md:col-start-8"
          />
        </div>
      </section>

      <section className="page-x mx-auto w-full max-w-page py-24 md:py-32">
        <StoryGallery photos={story.photos.filter((p) => p.id !== story.cover.id)} />
      </section>

      {story.film ? (
        <section className="bg-forest text-paper">
          <div className="page-x mx-auto w-full max-w-page py-24 md:py-32">
            <h2 className="text-4xl">The film</h2>
            <div className="mt-10">
              <YouTubeFilm id={story.film} title={`${story.title} film`} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-x mx-auto flex w-full max-w-page flex-wrap items-end justify-between gap-8 py-24 md:py-32">
        <div>
          <h2 className="text-3xl">Planning something similar?</h2>
          <p className="mt-3 text-stone">Tell me your date and place, and I will send a quote.</p>
          <ButtonLink href="/contact" className="mt-6">
            Get a quote
          </ButtonLink>
        </div>
        {next && next.slug !== story.slug ? (
          <Link href={`/stories/${next.slug}`} className="group text-right">
            <span className="text-sm text-stone">Next story</span>
            <span className="mt-1 block font-display text-2xl underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-ink/40">
              {next.title}
            </span>
          </Link>
        ) : null}
      </section>
    </>
  );
}
