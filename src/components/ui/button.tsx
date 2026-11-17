import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "on-dark";

const base =
  "relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 " +
  "text-base font-medium btn-motion " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.97] active:shadow-none " +
  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

// Every variant's hover fill grows as a circle from the bottom edge, echoing the logo.
const circleFill =
  "before:absolute before:inset-0 before:-z-10 before:content-[''] " +
  "before:[clip-path:circle(0%_at_50%_100%)] before:transition-[clip-path] " +
  "before:duration-(--duration-hover-fill) before:ease-smooth hover:before:[clip-path:circle(150%_at_50%_100%)] " +
  "[--btn-color-duration:var(--duration-hover-fill)] [--btn-color-ease:var(--ease-smooth)] " +
  "motion-reduce:before:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-sindoor text-paper shadow-btn-strong before:bg-sindoor-deep hover:shadow-btn-strong-hover",
  secondary:
    "bg-paper text-ink shadow-btn ring-1 ring-ink/15 ring-inset before:bg-ink " +
    "hover:text-paper hover:shadow-btn-hover",
  "on-dark": "bg-paper text-forest shadow-btn-dark before:bg-blush hover:shadow-btn-dark-hover",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${circleFill} ${variants[variant]} ${className}`;
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
