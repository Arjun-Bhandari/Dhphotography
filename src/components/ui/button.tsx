import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "on-dark";

const base =
  "relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 " +
  "text-base font-medium transition-[background-color,color,transform] duration-(--duration-base) ease-out " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

// Outline fill grows as a circle from the bottom edge, echoing the logo.
const circleFill =
  "before:absolute before:inset-0 before:-z-10 before:bg-ink before:content-[''] " +
  "before:[clip-path:circle(0%_at_50%_100%)] before:transition-[clip-path] " +
  "before:duration-(--duration-slow) before:ease-out hover:before:[clip-path:circle(150%_at_50%_100%)] " +
  "motion-reduce:before:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-sindoor text-paper hover:bg-sindoor-deep",
  secondary: `bg-transparent text-ink ring-1 ring-ink/20 ring-inset hover:text-paper ${circleFill}`,
  "on-dark": "bg-paper text-forest hover:bg-blush",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({
  variant,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}

export function ButtonLink({
  variant,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
