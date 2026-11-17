import { PageIntro } from "@/components/site/page-intro";
import { site } from "@/lib/site";

export const metadata = { title: "About" };

export default function Page() {
  return (
    <PageIntro title={site.taglines.personal}>
      Puskar Dahal, wedding specialist with six years behind the camera. He shoots, edits and
      delivers every frame himself.
    </PageIntro>
  );
}
