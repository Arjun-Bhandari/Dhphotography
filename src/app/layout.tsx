import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";

const hedvig = Hedvig_Letters_Serif({
  variable: "--font-hedvig",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dh Photography: Wedding & Event Photographer in Manipur",
    template: "%s | Dh Photography",
  },
  description:
    "Wedding, pre-wedding, event and birthday photography and films by Puskar Dahal. Based in Kanglatongbi, Manipur, and available across India.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hedvig.variable} ${hanken.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
