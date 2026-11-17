import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Internal design reference pages stay out of search results.
    rules: { userAgent: "*", allow: "/", disallow: ["/brand", "/styleguide"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
