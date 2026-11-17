import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import profile from "../../../public/profile.jpg";

export const metadata = { title: "Styleguide", robots: { index: false } };

const colors = [
  { name: "paper", hex: "#FFFFFF", className: "bg-paper ring-1 ring-ink/10" },
  { name: "mist", hex: "#F2F3EF", className: "bg-mist" },
  { name: "ink", hex: "#16201B", className: "bg-ink" },
  { name: "stone", hex: "#5E6862", className: "bg-stone" },
  { name: "forest", hex: "#1E3328", className: "bg-forest" },
  { name: "sindoor", hex: "#E41E00", className: "bg-sindoor" },
  { name: "sindoor-deep", hex: "#C41A00", className: "bg-sindoor-deep" },
  { name: "blush", hex: "#F7C0B9", className: "bg-blush" },
];

const scale = [
  { token: "text-5xl", sample: "Timeless frames" },
  { token: "text-4xl", sample: "Your happiest yes" },
  { token: "text-3xl", sample: "Weddings across India" },
  { token: "text-2xl", sample: "Pre-wedding, wedding and after" },
  { token: "text-xl", sample: "Shot, edited and delivered by Puskar" },
] as const;

const scaleClass: Record<(typeof scale)[number]["token"], string> = {
  "text-5xl": "text-5xl",
  "text-4xl": "text-4xl",
  "text-3xl": "text-3xl",
  "text-2xl": "text-2xl",
  "text-xl": "text-xl",
};

export default function StyleguidePage() {
  return (
    <main className="page-x mx-auto w-full max-w-page py-24">
      <Logo variant="horizontal" className="w-56" />

      <section className="mt-24">
        <h2 className="text-3xl">Colour</h2>
        <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {colors.map((c) => (
            <li key={c.name}>
              <div className={`aspect-square rounded-full ${c.className}`} />
              <p className="mt-3 text-sm font-medium">{c.name}</p>
              <p className="text-xs text-stone tabular-nums">{c.hex}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-32">
        <h2 className="text-3xl">Type</h2>
        <div className="mt-8 space-y-6">
          {scale.map((s) => (
            <div key={s.token} className="grid gap-2 md:grid-cols-[8rem_1fr] md:items-baseline">
              <span className="text-xs text-stone">{s.token}</span>
              <p className={`font-display ${scaleClass[s.token]}`}>{s.sample}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-prose text-lg">
          Hanken Grotesk carries the reading text. Every booking starts with a conversation about
          your day, your people and the moments you want to keep.
        </p>
        <p className="mt-4 max-w-prose text-stone">
          Secondary text sits in stone. Body copy stays under 70 characters a line so long
          descriptions of a package or a story stay easy to read on a phone.
        </p>
      </section>

      <section className="mt-32">
        <h2 className="text-3xl">Actions</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Get a quote</Button>
          <Button variant="secondary">See the work</Button>
        </div>
      </section>

      <section className="mt-32 -mx-5 bg-forest px-5 py-24 text-paper md:-mx-8 md:px-8 xl:-mx-12 xl:px-12">
        <Logo variant="stacked" className="w-40" />
        <h2 className="mt-16 max-w-3xl text-4xl">Every frame shot, edited and delivered by Puskar.</h2>
        <p className="mt-6 max-w-prose text-blush">
          Forest is the dark surface. Blush and paper are the only text colours used on it.
        </p>
        <div className="mt-10">
          <Button variant="on-dark">Message on WhatsApp</Button>
        </div>
      </section>

      <section className="mt-32">
        <h2 className="text-3xl">Photo develop</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-[2fr_1fr]">
          <Image
            src={profile}
            alt="Puskar Dahal smiling among green leaves"
            placeholder="blur"
            className="develop h-auto w-full"
            sizes="(min-width: 768px) 66vw, 100vw"
          />
          <p className="text-stone">
            Photos keep square corners, like prints. The first time a photo appears it resolves
            from a soft wash into full colour.
          </p>
        </div>
      </section>
    </main>
  );
}
