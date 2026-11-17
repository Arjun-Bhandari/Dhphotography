import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/photo/photo";
import { ButtonLink } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import portrait from "../../../public/profile.jpg";

export const metadata = {
  title: "About",
  description:
    "I am Puskar Dahal, wedding photographer behind Dh Photography. Six years behind the camera, based in Kanglatongbi, Manipur, shooting across India.",
};

const craft = [
  {
    title: "I shoot",
    body: "Weddings, pre-weddings, programmes and birthdays. I stay close to the moments and out of the way of your people.",
  },
  {
    title: "I edit",
    body: "Every photo and film is edited by my own hand, so the colours and feeling stay true to your day.",
  },
  {
    title: "I deliver",
    body: "You receive the finished work from me directly. One photographer from the first message to the final file.",
  },
];

export default function Page() {
  return (
    <>
      {/* Intro: portrait beside the personal tagline */}
      <section className="page-x mx-auto grid w-full max-w-page gap-12 pt-36 pb-24 md:grid-cols-12 md:items-end md:gap-8 md:pt-44 md:pb-36">
        <div className="md:col-span-6">
          <h1 className="text-5xl">{site.taglines.personal}</h1>
          <p className="mt-8 max-w-prose text-lg text-stone">
            I am Puskar Dahal, the photographer behind Dh Photography. A wedding specialist with
            six years behind the camera, I shoot, edit and deliver every frame myself.
          </p>
          <p className="mt-4 max-w-prose text-lg text-stone">
            I am based in {site.location} and travel across India for weddings and celebrations.
          </p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Image
            src={portrait}
            alt="Puskar Dahal smiling among green leaves"
            placeholder="blur"
            preload
            sizes="(min-width: 48rem) 40vw, 100vw"
            className="develop h-auto w-full"
          />
        </div>
      </section>

      {/* How I work */}
      <section className="bg-mist">
        <div className="page-x mx-auto w-full max-w-page py-24 md:py-32">
          <h2 className="max-w-2xl text-4xl">One photographer, start to finish</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {craft.map((item) => (
              <div key={item.title}>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-sm text-stone">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the camera */}
      <section className="page-x mx-auto grid w-full max-w-page gap-12 py-24 md:grid-cols-12 md:items-center md:gap-8 md:py-36">
        <Photo photo={photos.puskar} sizes="(min-width: 48rem) 50vw, 100vw" className="md:col-span-6" />
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="text-4xl">Behind the camera</h2>
          <p className="mt-6 max-w-prose text-lg text-stone">
            I shoot on a Canon R. Between weddings you will find me photographing the hills,
            waterfalls and festivals of Manipur. It keeps my eye fresh for your day.
          </p>
          <Link
            href="/work"
            className="mt-8 inline-block font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            See the work
          </Link>
        </div>
      </section>

      {/* Follow along + quote */}
      <section className="page-x mx-auto w-full max-w-page pb-24 md:pb-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <h2 className="text-4xl">Follow along</h2>
            <p className="mt-4 max-w-prose text-lg text-stone">
              New shoots go up on Instagram and Facebook first. Wedding films live on YouTube.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {site.social.map((item) => (
                <li key={item.href}>
                  <ButtonLink href={item.href} target="_blank" rel="noreferrer" variant="secondary">
                    {item.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <h2 className="text-2xl">Planning something?</h2>
            <p className="mt-3 text-stone">Tell me the date and place, and I will send availability and a quote.</p>
            <ButtonLink href="/contact" className="mt-6">
              Get a quote
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
