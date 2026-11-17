import { useId, type SVGProps } from "react";
import {
  HORIZONTAL_WORDMARK_TRANSFORM,
  LOGO_COLORS,
  LOGO_PATHS,
  LOGO_VIEWBOX,
} from "./logo-paths";

type LogoVariant = "stacked" | "horizontal" | "mark" | "wordmark";

type LogoProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  variant?: LogoVariant;
  /**
   * "color": brand-red circles, wordmark in `currentColor`.
   * "mono": everything in `currentColor`, circles keep their opacity steps (watermarks, overlays).
   */
  tone?: "color" | "mono";
  /** Accessible name. Pass "" when the logo sits next to visible "Dh Photography" text. */
  title?: string;
};

function Mark({ tone }: { tone: "color" | "mono" }) {
  const id = useId();
  const { circleSoft, circleMid, circleBold } = LOGO_PATHS;

  if (tone === "mono") {
    return (
      <g fill="currentColor">
        <path fillOpacity={0.28} d={circleSoft} />
        <path fillOpacity={0.71} d={circleMid} />
        <path fillOpacity={0.91} d={circleBold} />
      </g>
    );
  }

  // Overlaps are painted as solid colours (not opacity) so the mark looks the same on any background.
  return (
    <>
      <defs>
        <clipPath id={`${id}-soft`}>
          <path d={circleSoft} />
        </clipPath>
        <clipPath id={`${id}-bold`}>
          <path d={circleBold} />
        </clipPath>
      </defs>
      <path fill={LOGO_COLORS.soft} d={circleSoft} />
      <path fill={LOGO_COLORS.mid} d={circleMid} />
      <path fill={LOGO_COLORS.bold} d={circleBold} />
      <path fill={LOGO_COLORS.softMid} clipPath={`url(#${id}-soft)`} d={circleMid} />
      <path fill={LOGO_COLORS.midBold} clipPath={`url(#${id}-bold)`} d={circleMid} />
    </>
  );
}

function Wordmark() {
  return (
    <g fill="currentColor">
      <path d={LOGO_PATHS.dh} />
      <path d={LOGO_PATHS.photography} />
    </g>
  );
}

export function Logo({
  variant = "horizontal",
  tone = "color",
  title = "Dh Photography",
  ...props
}: LogoProps) {
  const titleId = useId();
  const hasMark = variant !== "wordmark";
  const hasWordmark = variant !== "mark";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEWBOX[variant]}
      role={title ? "img" : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {hasMark ? <Mark tone={tone} /> : null}
      {hasWordmark ? (
        variant === "horizontal" ? (
          <g transform={HORIZONTAL_WORDMARK_TRANSFORM}>
            <Wordmark />
          </g>
        ) : (
          <Wordmark />
        )
      ) : null}
    </svg>
  );
}
