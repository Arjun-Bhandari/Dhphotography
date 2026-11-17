// PLACEHOLDER packages: names and inclusions to be confirmed with Puskar (specs/02-scope.md).
// No prices or timelines here on purpose; every package ends in a quote.

export type Package = {
  id: string;
  name: string;
  forWhat: string;
  coverage: string;
  /** First person, one or two sentences. */
  summary: string;
  includes: string[];
};

export const packages: Package[] = [
  {
    id: "two-hearts",
    name: "Two Hearts",
    forWhat: "Pre-wedding and wedding",
    coverage: "Photos, cinematic film and drone",
    summary:
      "We start with a pre-wedding shoot so you get comfortable in front of my camera, then I cover your wedding from the first ritual to the farewell.",
    includes: [
      "Pre-wedding shoot at a location you love",
      "Full wedding day coverage",
      "Edited photos of every ritual and your people",
      "Cinematic wedding film",
      "Drone shots of the venue and celebrations",
    ],
  },
  {
    id: "forever-and-after",
    name: "Forever & After",
    forWhat: "Pre-wedding, wedding and post-wedding",
    coverage: "Photos, film, drone and a full story album",
    summary:
      "Your whole story in one place: before, during and after the wedding, finished as a printed album you can hold.",
    includes: [
      "Everything in Two Hearts",
      "Post-wedding couple shoot",
      "Haldi, mehendi and sangeet coverage",
      "Printed story album",
    ],
  },
  {
    id: "moments-that-matter",
    name: "Moments That Matter",
    forWhat: "School functions, poojas and ceremonies",
    coverage: "Photos and a highlight film",
    summary:
      "Annual days, cultural programmes, poojas and family ceremonies, covered quietly so the moment stays yours.",
    includes: [
      "Coverage of the full programme or ceremony",
      "Group and family photos",
      "Edited photo set",
      "Short highlight film",
    ],
  },
  {
    id: "candles-and-confetti",
    name: "Candles & Confetti",
    forWhat: "Birthdays, from first to fiftieth",
    coverage: "Photos and a short reel",
    summary:
      "First birthdays, milestone parties and surprise celebrations. I catch the cake, the candles and the faces around them.",
    includes: [
      "Party coverage from decor to cake cutting",
      "Family and guest portraits",
      "Edited photo set",
      "Short reel for sharing",
    ],
  },
  {
    id: "your-story",
    name: "Your Story, Your Way",
    forWhat: "Anything else you are celebrating",
    coverage: "Built around your day",
    summary:
      "Engagements, anniversaries, maternity, family portraits or something new. Tell me the idea and I will shape the coverage around it.",
    includes: ["Coverage planned with you", "Photos, film or both", "Any location across India"],
  },
];
