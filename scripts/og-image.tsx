import { readFile } from "node:fs/promises";
import { join } from "node:path";
/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Share card design for WhatsApp, Instagram, Facebook and search results.
// Rendered once to public/og.png by `npm run og` (a static file loads instantly for link previews).
export const alt = "Dh Photography: wedding and event photography from Manipur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export default async function Image() {
  const [hedvig, logo, mark] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/HedvigLettersSerif.ttf")),
    readFile(join(process.cwd(), "public/brand/logo-horizontal.svg"), "utf8"),
    readFile(join(process.cwd(), "public/brand/logo-mark.svg"), "utf8"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#FFFFFF",
          padding: "64px 72px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* The three circles, large and bleeding off the right edge */}
        <img
          src={svgDataUri(mark)}
          width={760}
          height={358}
          alt=""
          style={{ position: "absolute", right: -190, top: 140, opacity: 0.95 }}
        />

        <img src={svgDataUri(logo)} width={260} height={73} alt="" />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontFamily: "Hedvig", fontSize: 66, lineHeight: 1.05, color: "#16201B" }}>
            {site.taglines.brand}
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#5E6862" }}>
            Weddings, pre-weddings, birthdays and programmes. Manipur, across India.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Hedvig", data: hedvig, style: "normal", weight: 400 }],
    },
  );
}
