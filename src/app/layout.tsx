import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Hedvig_Letters_Serif } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { SmoothScroll } from "@/components/site/smooth-scroll";
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
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <div id="main" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
