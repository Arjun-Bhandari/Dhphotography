import { PageIntro } from "@/components/site/page-intro";
import { site } from "@/lib/site";

export const metadata = { title: "About" };

export default function Page() {
  return (
    <PageIntro title={site.taglines.personal}>
      I am Puskar Dahal, the photographer behind Dh Photography. A wedding specialist with six
      years behind the camera, I shoot, edit and deliver every frame myself.
    </PageIntro>
  );
}
