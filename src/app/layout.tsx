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
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dh Photography: wedding and event photography from Manipur" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
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
