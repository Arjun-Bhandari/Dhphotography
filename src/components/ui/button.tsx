import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "on-dark" | "on-dark-ghost";
type Size = "md" | "lg";

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full " +
  "font-medium btn-motion " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.97] active:shadow-none " +
  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";

// Every variant's hover fill grows as a circle from the bottom edge, echoing the logo.
// 80% just covers a pill-shaped button, so the whole duration is visible growth.
const circleFill =
  "before:absolute before:inset-0 before:-z-10 before:content-[''] " +
  "before:[clip-path:circle(0%_at_50%_100%)] before:transition-[clip-path] " +
  "before:duration-(--duration-hover-fill) before:ease-smooth hover:before:[clip-path:circle(80%_at_50%_100%)] " +
  "[--btn-color-duration:var(--duration-hover-fill)] [--btn-color-ease:var(--ease-smooth)] " +
  "motion-reduce:before:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-sindoor text-paper shadow-btn-strong before:bg-sindoor-deep hover:shadow-btn-strong-hover",
  secondary:
    "bg-paper text-ink shadow-btn ring-1 ring-ink/15 ring-inset before:bg-ink " +
    "hover:text-paper hover:shadow-btn-hover",
  "on-dark": "bg-paper text-forest shadow-btn-dark before:bg-blush hover:shadow-btn-dark-hover",
  "on-dark-ghost":
    "bg-transparent text-paper ring-1 ring-paper/50 ring-inset backdrop-blur-sm before:bg-paper " +
    "hover:text-forest hover:shadow-btn-dark-hover",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 text-base",
  // Hero and other headline calls to action.
  lg: "min-h-14 px-8 text-lg",
};

export function buttonClasses(variant: Variant = "primary", className = "", size: Size = "md") {
  return `${base} ${sizes[size]} ${circleFill} ${variants[variant]} ${className}`;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClasses(variant, className, size)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClasses(variant, className, size)} {...props} />;
}
