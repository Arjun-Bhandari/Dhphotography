import { Logo } from "@/components/brand/logo";

export const metadata = { title: "Brand", robots: { index: false } };

const backgrounds = [
  { name: "Paper", className: "bg-white text-neutral-950" },
  { name: "Ink", className: "bg-neutral-950 text-white" },
];

export default function BrandPage() {
  return (
    <main className="grid gap-px bg-neutral-200 md:grid-cols-2">
      {backgrounds.map((bg) => (
        <section key={bg.name} className={`${bg.className} flex flex-col items-center gap-16 p-12`}>
          <p className="self-start text-sm opacity-60">{bg.name}</p>
          <Logo variant="stacked" className="w-56" />
          <Logo variant="horizontal" className="w-72" />
          <Logo variant="mark" className="w-24" />
          <Logo variant="stacked" tone="mono" className="w-40" />
        </section>
      ))}
    </main>
  );
}
