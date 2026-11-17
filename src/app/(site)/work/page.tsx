import { PageIntro } from "@/components/site/page-intro";
import { WorkGallery } from "@/components/work/work-gallery";
import { allPhotos } from "@/content/photos";

export const metadata = {
  title: "Work",
  description:
    "Wedding, pre-wedding, birthday and programme photography from Dh Photography, Manipur.",
};

// Portraits of the photographer and unsorted photos stay out of the portfolio.
const portfolio = allPhotos.filter((p) => p.category !== "portrait" && p.category !== "uncategorized");

export default function Page() {
  return (
    <>
      <PageIntro title="The work">
        Weddings, pre-weddings, birthdays and programmes, plus a few quiet moments from home in
        Manipur. Tap any photo to see it full size.
      </PageIntro>
      <section className="page-x mx-auto w-full max-w-page pb-24 md:pb-36">
        <WorkGallery photos={portfolio} />
      </section>
    </>
  );
}
