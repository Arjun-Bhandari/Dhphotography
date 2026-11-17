// Stories: one page per event, told in order. The first three are PLACEHOLDERS built
// from stand-in photos; replace them with real events (with the couple's permission).
// To add one: put its photos in public/photos, run `npm run photos`, then add an entry.

import { getPhoto, photos, type Photo } from "./photos";

export type Story = {
  slug: string;
  title: string;
  occasion: string;
  /** Free text so a story can be "December 2026" or a full date. */
  date: string;
  location: string;
  /** Two or three lines in Puskar's voice. */
  intro: string;
  cover: Photo;
  /** In the order the day happened. */
  photos: Photo[];
  /** YouTube video id of this event's film, if there is one. */
  film?: string;
  placeholder?: boolean;
};

export const stories: Story[] = [
  {
    slug: "pink-birthday-celebration",
    title: "A pink birthday celebration",
    occasion: "Birthday",
    date: "2025",
    location: "Manipur",
    intro:
      "Balloons, a pink cake and a family that could not stop laughing. I kept close to the cake table, because that is where the best moments always happen.",
    cover: photos.birthdayCouple,
    photos: [
      photos.birthdayPortrait,
      photos.birthdayFamily,
      photos.birthdayCouple,
      photos.birthdayCake,
      ...["DHP19801.jpg", "DHP19803.jpg", "DHP19815.jpg", "DHP19817.jpg", "birthday-edits.JPG"].map(getPhoto),
    ],
    placeholder: true,
  },
  {
    slug: "red-and-gold-wedding",
    title: "A wedding in red and gold",
    occasion: "Wedding",
    date: "2025",
    location: "Manipur",
    intro:
      "From the haldi in the garden to the mandap in the evening, a day of red silk, gold and quiet smiles. Every ritual, kept the way it felt.",
    cover: photos.brideYellowWall,
    photos: [
      photos.haldiBride,
      photos.brideYellowWall,
      photos.brideVeil,
      photos.brideShoulder,
      photos.brideHands,
      getPhoto("DHP14476.jpg"),
      photos.groom,
      photos.mirror,
    ],
    placeholder: true,
  },
  {
    slug: "under-the-bougainvillea",
    title: "Under the bougainvillea",
    occasion: "Post-wedding",
    date: "2025",
    location: "Manipur",
    intro:
      "A slow afternoon after the wedding, walking under purple bougainvillea. No schedule, no rituals, just the two of them.",
    cover: photos.coupleBlossom,
    photos: [photos.coupleBlossom, getPhoto("post-wed-fb-04.jpg"), photos.coupleHug],
    placeholder: true,
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
