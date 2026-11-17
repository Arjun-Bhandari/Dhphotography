import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-forest text-paper">
      <div className="page-x mx-auto max-w-page pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="max-w-xl text-4xl">Tell Puskar about your day.</h2>
            <p className="mt-6 max-w-md text-blush">
              Share your date and location. You&rsquo;ll get a reply with availability and a quote,
              usually within a day.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href={site.whatsappUrl} target="_blank" rel="noreferrer" variant="on-dark">
                Message on WhatsApp
              </ButtonLink>
              <a
                href={`tel:${site.phone}`}
                className="tabular-nums underline-offset-4 hover:underline"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4 md:col-start-9">
            <nav aria-label="Footer">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="opacity-80 transition-opacity hover:opacity-100">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="space-y-3">
              {site.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-80 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all opacity-80 transition-opacity hover:opacity-100"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-8 md:mt-32 md:flex-row md:items-end md:justify-between">
          <Logo variant="stacked" className="w-36" />
          <p className="text-sm text-paper/60">
            © <CopyrightYear /> {site.name}. Based in {site.location}, shooting across India.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Prerendered and refreshed daily, so the footer stays static without a stale year.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
