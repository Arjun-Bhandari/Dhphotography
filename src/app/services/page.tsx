import { Photo } from "@/components/photo/photo";
import { PageIntro } from "@/components/site/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { packages } from "@/content/packages";
import { photos, type Photo as PhotoData } from "@/content/photos";
import { site } from "@/lib/site";

export const metadata = {
  title: "Services",
  description:
    "Wedding, pre-wedding, birthday and programme photography packages from Dh Photography. Every package ends in a quote made for your day.",
};

// One photo per package, chosen from that kind of shoot.
const packagePhotos: Record<string, PhotoData> = {
  "two-hearts": photos.coupleHug,
  "forever-and-after": photos.coupleBlossom,
  "moments-that-matter": photos.traditional,
  "candles-and-confetti": photos.birthdayFamily,
  "your-story": photos.haldiBride,
};

// The real workflow, so numbering is meaningful here.
const steps = [
  { title: "Tell me about your day", body: "Send the date, place and what you are celebrating, by the form or on WhatsApp." },
  { title: "We plan it together", body: "A call to understand the rituals, the people and the moments that matter to you. Then your quote." },
  { title: "I shoot the day", body: "I stay close but out of the way, so you can be with your people while I keep the moments." },
  { title: "I edit and deliver", body: "Every photo and film is edited by me, then delivered to you ready to share and keep." },
];

export default function Page() {
  return (
    <>
      <PageIntro title="Services">
        Weddings, pre-weddings, programmes and birthdays across India. Every package is shaped
        around your day, so each one ends in a quote made for you.
      </PageIntro>

      <section className="page-x mx-auto w-full max-w-page pb-24 md:pb-36">
        <ol className="space-y-24 md:space-y-36">
          {packages.map((pkg, i) => {
            const photo = packagePhotos[pkg.id];
            const flipped = i % 2 === 1;
            return (
              <li
                key={pkg.id}
                id={pkg.id}
                className="grid scroll-mt-28 gap-10 md:grid-cols-12 md:items-center md:gap-8"
              >
                {photo ? (
                  <Photo
                    photo={photo}
                    sizes="(min-width: 48rem) 42vw, 100vw"
                    className={`md:col-span-5 ${flipped ? "md:col-start-8 md:row-start-1" : ""}`}
                  />
                ) : null}
                <div className={`md:col-span-6 ${flipped ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
                  <p className="text-sm font-medium text-stone">{pkg.forWhat}</p>
                  <h2 className="mt-2 text-4xl">{pkg.name}</h2>
                  <p className="mt-5 max-w-prose text-lg text-stone">{pkg.summary}</p>
                  <ul className="mt-8 space-y-3">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sindoor" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact" variant="secondary" className="mt-10">
                    Get a quote for {pkg.name}
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="bg-mist">
        <div className="page-x mx-auto w-full max-w-page py-24 md:py-32">
          <h2 className="max-w-2xl text-4xl">How it works</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="grid size-10 place-items-center rounded-full bg-paper font-display text-lg tabular-nums ring-1 ring-ink/10">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/contact">Get a quote</ButtonLink>
            <a href={site.whatsappUrl} target="_blank" rel="noreferrer" className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Or message me on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
