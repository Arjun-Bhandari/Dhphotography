import { site } from "@/lib/site";

/**
 * Structured data so search engines understand the business (name, place, contact,
 * area served, social profiles). Rendered once, on the home page.
 */
export function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description:
      "Wedding, pre-wedding, birthday and event photography and films, based in Kanglatongbi, Manipur and available across India.",
    url: site.url,
    logo: `${site.url}/brand/png/logo-mark-square@512.png`,
    image: `${site.url}/opengraph-image`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kanglatongbi",
      addressRegion: "Manipur",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    // Listed as always open on the business's Facebook page.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    founder: { "@type": "Person", name: site.owner, jobTitle: "Photographer" },
    knowsAbout: ["Wedding photography", "Pre-wedding photography", "Wedding films", "Event photography", "Birthday photography"],
    sameAs: site.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are our own constants.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
