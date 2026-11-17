import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The share image reads these from disk at request time; make sure deploys ship them.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/assets/fonts/**", "./public/brand/*.svg"],
  },
  images: {
    // YouTube thumbnails for wedding films (the video itself only loads on play).
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
