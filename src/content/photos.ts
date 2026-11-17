// Stand-in photo library. Same shape the Neon `photos` table will have, so the dashboard
// can replace this file without touching the pages. Files live in public/photos (not in git).

export type PhotoCategory =
  | "wedding"
  | "pre-wedding"
  | "post-wedding"
  | "haldi"
  | "programme"
  | "birthday"
  | "portrait"
  | "manipur";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: PhotoCategory;
  /** CSS object-position, only used where a layout must crop (the hero). */
  focus?: string;
};

const p = (
  file: string,
  width: number,
  height: number,
  category: PhotoCategory,
  alt: string,
  focus?: string,
): Photo => ({ id: file.replace(/\.\w+$/, ""), src: `/photos/${file}`, width, height, category, alt, focus });

export const photos = {
  coupleRed: p("wed-fb-05.jpg", 2048, 1365, "wedding", "Bride and groom in red wedding attire standing under green trees", "50% 40%"),
  brideRed: p("wed-fb-06.jpg", 1365, 2048, "wedding", "Bride in a red sari with mehendi, smiling down at her hands"),
  haldiGroup: p("fb-pre-wed-02.jpg", 2048, 1365, "haldi", "Bride in white with friends in yellow and red, laughing at a haldi gathering"),
  haldiBack: p("fb-01.jpg", 1638, 2048, "haldi", "Bride in a yellow and white lehenga, arms raised, seen from behind"),
  coupleYellow: p("pre-wed-fb-08.jpg", 1638, 2048, "pre-wedding", "Couple in yellow embracing at dusk, the bride smiling at the camera", "50% 35%"),
  brideYellow: p("pre-wed-fb-07.jpg", 1638, 2048, "pre-wedding", "Bride in a yellow and red sari with flower jewellery against a blue sky", "50% 20%"),
  coupleBlossom: p("post-wed-fb-03.jpg", 1638, 2048, "post-wedding", "Newly married couple walking hand in hand under purple bougainvillea"),
  coupleKiss: p("post-wed-fb-04.jpg", 1638, 2048, "post-wedding", "Groom kissing the bride's hand beneath a flowering tree"),
  blossomPortrait: p("hero-01.jpg", 1638, 2048, "portrait", "Woman in a green kurta reaching up into white blossoms"),
  traditional: p("traditonal-func-01-fb.jpg", 1365, 2048, "programme", "Woman in traditional Manipuri attire leaning against a tree"),
  festival: p("fest-fb-10.jpg", 1638, 2048, "programme", "Singer performing on stage at the Thadou Cultural Festival 2023"),
  baby: p("baby-09.jpg", 1638, 2048, "birthday", "Baby girl in a pink dress and bow sitting on the grass"),
  puskar: p("self-fb-16.jpg", 1440, 960, "portrait", "Puskar Dahal behind his Canon camera on a tripod"),
  paddy: p("hero-green-fb-17.jpg", 1294, 2048, "manipur", "Rice paddy under a blue sky with hills in the distance"),
  waterfall: p("hero-fb-13.jpg", 1500, 2048, "manipur", "Waterfall dropping into a dark rocky pool"),
  temple: p("hero-fb-14.jpg", 2048, 1408, "manipur", "Temple with tiered roofs at the end of a hedged stone path"),
  town: p("town-fb-12.jpg", 2048, 1365, "manipur", "Town in the valley seen from a hillside"),
  butterfly: p("hero-fb-15.jpg", 2048, 1455, "manipur", "Butterfly feeding on a small pink flower"),
  mushrooms: p("hero-fb-11.jpg", 1422, 2048, "manipur", "Cluster of small white mushrooms in the dark"),
  bulb: p("hero-fb-18.jpg", 692, 1080, "manipur", "Light bulb glowing against a sunset sky"),
} satisfies Record<string, Photo>;

export type HeroSlide = {
  desktop: Photo;
  mobile: Photo;
  /** Focal points per breakpoint; faces must land in the top two-thirds (headline sits below). */
  desktopFocus?: string;
  mobileFocus?: string;
};

export const home = {
  heroSlides: [
    // Mobile uses a portrait with the face in the upper third, so the headline sits over the sari.
    { desktop: photos.coupleRed, mobile: photos.brideYellow, desktopFocus: "50% 40%", mobileFocus: "50% 20%" },
    { desktop: photos.coupleYellow, mobile: photos.coupleYellow, desktopFocus: "50% 32%", mobileFocus: "60% 30%" },
    { desktop: photos.haldiGroup, mobile: photos.haldiBack, desktopFocus: "50% 30%", mobileFocus: "50% 25%" },
    { desktop: photos.coupleBlossom, mobile: photos.coupleBlossom, desktopFocus: "50% 28%", mobileFocus: "50% 30%" },
  ] satisfies HeroSlide[],
  selected: [
    photos.coupleBlossom,
    photos.haldiGroup,
    photos.brideYellow,
    photos.brideRed,
    photos.traditional,
    photos.haldiBack,
    photos.coupleKiss,
    photos.festival,
    photos.baby,
    photos.blossomPortrait,
  ],
  manipur: [photos.paddy, photos.temple, photos.waterfall, photos.town, photos.butterfly, photos.mushrooms, photos.bulb],
};
