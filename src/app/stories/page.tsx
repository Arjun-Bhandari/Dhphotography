import Link from "next/link";
import { Photo } from "@/components/photo/photo";
import { PageIntro } from "@/components/site/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { YouTubeFilm } from "@/components/video/youtube-film";
import { films } from "@/content/films";
import { stories } from "@/content/stories";
import { site } from "@/lib/site";

export const metadata = {
  title: "Stories",
  description:
    "Weddings, birthdays and celebrations told from start to finish, with wedding films, by Dh Photography.",
};

export default function Page() {
  const youtube = site.social.find((s) => s.label === "YouTube");

  return (
    <>
      <PageIntro title="Stories">
        Whole days, told from the first ritual to the last dance. This is what you receive: not
        just highlights, but your story in order.
      </PageIntro>

      <section className="page-x mx-auto w-full max-w-page pb-24 md:pb-36">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {stories.map((story) => (
            <li key={story.slug}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="overflow-hidden">
                  <div className="transition-[scale] duration-(--duration-slow) ease-out group-hover:scale-[1.02] motion-reduce:transition-none">
                    <Photo photo={story.cover} sizes="(min-width: 48rem) 45vw, 100vw" />
                  </div>
                </div>
                <p className="mt-5 text-sm text-stone">
                  {story.occasion}, {story.location}, {story.date}
                </p>
                <h2 className="mt-1 text-3xl underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-ink/40">
                  {story.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-forest text-paper">
        <div className="page-x mx-auto w-full max-w-page py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl">Wedding films</h2>
              <p className="mt-4 max-w-prose text-lg text-blush">
                Every film is shot and edited by me. Press play to watch here, or see them all on
                YouTube.
              </p>
            </div>
            {youtube ? (
              <ButtonLink href={youtube.href} target="_blank" rel="noreferrer" variant="on-dark-ghost">
                All films on YouTube
              </ButtonLink>
            ) : null}
          </div>

          <div className="mt-12 md:mt-16">
            <YouTubeFilm id={films[0].id} title={`${films[0].couple}, ${films[0].date}`} />
            <p className="mt-4 text-paper/80">
              {films[0].couple} <span className="text-paper/50">· {films[0].date}</span>
            </p>
          </div>

          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {films.slice(1).map((film) => (
              <li key={film.id}>
                <YouTubeFilm id={film.id} title={`${film.couple}, ${film.date}`} sizes="(min-width: 64rem) 25vw, 50vw" />
                <p className="mt-3 text-sm text-paper/80">
                  {film.couple} <span className="text-paper/50">· {film.date}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
