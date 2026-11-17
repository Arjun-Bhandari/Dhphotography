// Renders the share card (scripts/og-image.tsx) to public/og.png.
// Usage: npm run og   (re-run after changing the tagline or the card design)
import { writeFileSync } from "node:fs";
import Image from "./og-image";

(async () => {
  const res = await Image();
  writeFileSync("public/og.png", Buffer.from(await res.arrayBuffer()));
  console.log("Wrote public/og.png");
})();
