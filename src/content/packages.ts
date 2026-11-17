// PLACEHOLDER packages: names and inclusions to be confirmed with Puskar (specs/02-scope.md).

export type Package = {
  id: string;
  name: string;
  forWhat: string;
  coverage: string;
};

export const packages: Package[] = [
  {
    id: "two-hearts",
    name: "Two Hearts",
    forWhat: "Pre-wedding and wedding",
    coverage: "Photos, cinematic film and drone",
  },
  {
    id: "forever-and-after",
    name: "Forever & After",
    forWhat: "Pre-wedding, wedding and post-wedding",
    coverage: "Photos, film, drone and a full story album",
  },
  {
    id: "moments-that-matter",
    name: "Moments That Matter",
    forWhat: "School functions, poojas and ceremonies",
    coverage: "Photos and a highlight film",
  },
  {
    id: "candles-and-confetti",
    name: "Candles & Confetti",
    forWhat: "Birthdays, from first to fiftieth",
    coverage: "Photos and a short reel",
  },
  {
    id: "your-story",
    name: "Your Story, Your Way",
    forWhat: "Anything else you are celebrating",
    coverage: "Built around your day",
  },
];
