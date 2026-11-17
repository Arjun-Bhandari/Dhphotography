import type { MetadataRoute } from "next";
import { stories } from "@/content/stories";
import { site } from "@/lib/site";

// Public pages only; /brand and /styleguide are internal and left out (see robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/stories`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${site.url}/stories/${story.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...storyPages];
}
