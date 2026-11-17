import { PageIntro } from "@/components/site/page-intro";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { InquiryForm } from "./inquiry-form";

export const metadata = {
  title: "Get a quote",
  description:
    "Ask Dh Photography about your wedding, pre-wedding, birthday or programme. Based in Manipur, shooting across India.",
};

export default function Page() {
  return (
    <>
      <PageIntro title="Get a quote">
        Tell me your date, the place and what you are celebrating. I will reply with
        availability and a quote made for your day.
      </PageIntro>

      <section className="page-x mx-auto grid w-full max-w-page gap-16 pb-24 md:grid-cols-12 md:gap-8 md:pb-36">
        <div className="md:col-span-7">
          <InquiryForm />
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="text-2xl">Prefer to talk?</h2>
          <p className="mt-3 text-stone">Most couples reach me on WhatsApp. Calls are welcome too.</p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <ButtonLink href={site.whatsappUrl} target="_blank" rel="noreferrer" variant="secondary">
              Message on WhatsApp
            </ButtonLink>
            <a href={`tel:${site.phone}`} className="font-medium tabular-nums underline-offset-4 hover:underline">
              Call {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className="break-all text-stone underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>

          <h2 className="mt-12 text-2xl">Where I work</h2>
          <p className="mt-3 text-stone">
            Based in {site.location}. I travel across India for weddings and events.
          </p>
        </aside>
      </section>
    </>
  );
}
