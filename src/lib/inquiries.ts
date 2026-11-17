import "server-only";
import { db } from "@/db";
import { inquiries, type NewInquiry } from "@/db/schema";
import { inquiryEmail } from "@/lib/email/inquiry-email";
import { LOGO_CID, LOGO_PNG_BASE64 } from "@/lib/email/logo";
import { site } from "@/lib/site";

/** Saves to Neon when configured; otherwise logs, so the form works in local development. */
export async function saveInquiry(inquiry: NewInquiry) {
  if (!db) {
    console.info("[inquiry] DATABASE_URL not set, not saved:", inquiry);
    return;
  }
  await db.insert(inquiries).values(inquiry);
}

/** Emails the inquiry via Resend when RESEND_API_KEY is set. Never throws: email is best-effort. */
export async function notifyInquiry(inquiry: NewInquiry) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.email;
  if (!key) {
    console.info("[inquiry] RESEND_API_KEY not set, no email sent.");
    return;
  }

  const { subject, html, text } = inquiryEmail(inquiry);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL ?? "Dh Photography <onboarding@resend.dev>",
        to,
        reply_to: inquiry.email ?? undefined,
        subject,
        html,
        text,
        // Logo attached inline (referenced as cid: in the HTML); remote images and SVG
        // are often blocked by mail clients.
        attachments: [
          { filename: "dh-photography.png", content: LOGO_PNG_BASE64, content_type: "image/png", content_id: LOGO_CID },
        ],
      }),
    });
    if (!res.ok) console.error("[inquiry] email failed:", res.status, await res.text());
  } catch (error) {
    console.error("[inquiry] email failed:", error);
  }
}
