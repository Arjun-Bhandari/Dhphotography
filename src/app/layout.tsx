import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Hedvig_Letters_Serif } from "next/font/google";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: "Dh Photography: Wedding & Event Photographer in Manipur",
    template: "%s | Dh Photography",
  },
  description:
    "Wedding, pre-wedding, event and birthday photography and films by Dh Photography. Based in Kanglatongbi, Manipur, and available across India.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hedvig.variable} ${hanken.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body>; don't treat that as a mismatch. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
