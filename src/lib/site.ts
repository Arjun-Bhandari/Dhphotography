// Single source for business details used across the site.

const phone = "+918798613217";
const whatsappMessage = "Hi Puskar, I'd like to ask about a shoot.";

export const site = {
  name: "Dh Photography",
  owner: "Puskar Dahal",
  location: "Kanglatongbi, Manipur",
  taglines: {
    brand: "Capturing your happiest “Yes” in timeless frames.",
    personal: "Your love, my lens, a perfect match.",
  },
  phone,
  phoneDisplay: "+91 87986 13217",
  email: "puskardahal325@gmail.com",
  whatsappUrl: `https://wa.me/${phone.slice(1)}?text=${encodeURIComponent(whatsappMessage)}`,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/dh_photography07/" },
    { label: "Facebook", href: "https://www.facebook.com/Puskar125/" },
    { label: "YouTube", href: "https://www.youtube.com/@dhphotography9531/videos" },
  ],
} as const;

export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Stories", href: "/stories" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
