// Scans public/photos and updates src/content/photo-library.json.
// - Adds new images with their real (EXIF-rotated) size and a guessed category.
// - Keeps alt text, category and focus you have already edited.
// - Drops entries whose file no longer exists.
// Usage: npm run photos

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { imageSize } from "image-size";

const PHOTO_DIR = "public/photos";
const LIBRARY = "src/content/photo-library.json";
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// Filename hints → category. Anything unmatched is "uncategorized" until edited.
const CATEGORY_HINTS = [
  [/pre-?wed/i, "pre-wedding"],
  [/post-?wed/i, "post-wedding"],
  [/haldi/i, "haldi"],
  [/wed|bride|groom/i, "wedding"],
  [/birthday|baby|bday/i, "birthday"],
  [/fest|func|pooja|school|programme/i, "programme"],
  [/town|green|landscape|manipur|hero-fb/i, "manipur"],
  [/self|portrait/i, "portrait"],
];

const guessCategory = (file) =>
  CATEGORY_HINTS.find(([pattern]) => pattern.test(file))?.[1] ?? "uncategorized";

const library = existsSync(LIBRARY) ? JSON.parse(readFileSync(LIBRARY, "utf8")) : {};
const files = readdirSync(PHOTO_DIR)
  .filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const next = {};
const added = [];
for (const file of files) {
  const { width, height, orientation } = imageSize(readFileSync(join(PHOTO_DIR, file)));
  // EXIF orientations 5–8 are rotated 90°, so the displayed size is swapped.
  const rotated = orientation >= 5;
  const size = rotated ? { width: height, height: width } : { width, height };
  const existing = library[file];
  next[file] = existing
    ? { ...existing, ...size }
    : { ...size, category: guessCategory(file), alt: "" };
  if (!existing) added.push(file);
}

const removed = Object.keys(library).filter((f) => !next[f]);
writeFileSync(LIBRARY, `${JSON.stringify(next, null, 2)}\n`);

console.log(`${files.length} photos in library.`);
if (added.length) console.log(`Added: ${added.join(", ")}`);
if (removed.length) console.log(`Removed (file missing): ${removed.join(", ")}`);
const missingAlt = Object.entries(next).filter(([, p]) => !p.alt).map(([f]) => f);
if (missingAlt.length) console.log(`Needs alt text: ${missingAlt.join(", ")}`);
