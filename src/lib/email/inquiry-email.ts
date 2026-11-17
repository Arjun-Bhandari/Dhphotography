import type { NewInquiry } from "@/db/schema";
import { site } from "@/lib/site";
import { whatsappReplyLink } from "@/lib/whatsapp";
import { LOGO_CID } from "./logo";

// Brand colours (email clients need literal values, not CSS variables).
const c = {
  paper: "#FFFFFF",
  mist: "#F2F3EF",
  ink: "#16201B",
  stone: "#5E6862",
  forest: "#1E3328",
  sindoor: "#E41E00",
  blush: "#F7C0B9",
  line: "#E3E5DF",
};
const serif = "Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

function formatEventDate(iso: string | null | undefined) {
  if (!iso) return "Not decided yet";
  // Parse and format in UTC so the calendar day never shifts with the server's timezone.
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function button(href: string, label: string, primary: boolean) {
  const bg = primary ? c.sindoor : c.paper;
  const fg = primary ? c.paper : c.ink;
  const border = primary ? c.sindoor : c.line;
  return `<td style="padding:0 8px 8px 0;">
    <a href="${escape(href)}" style="display:inline-block;background:${bg};color:${fg};border:1px solid ${border};border-radius:999px;padding:12px 22px;font-family:${sans};font-size:15px;font-weight:600;line-height:20px;text-decoration:none;white-space:nowrap;">${label}</a>
  </td>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 0;border-top:1px solid ${c.line};font-family:${sans};font-size:13px;line-height:20px;color:${c.stone};width:132px;vertical-align:top;">${label}</td>
    <td style="padding:12px 0;border-top:1px solid ${c.line};font-family:${sans};font-size:15px;line-height:22px;color:${c.ink};vertical-align:top;">${value}</td>
  </tr>`;
}

/** Notification email sent to Dh Photography for each new inquiry. */
export function inquiryEmail(inquiry: NewInquiry, receivedAt = new Date()) {
  const name = escape(inquiry.name);
  const firstName = escape(inquiry.name.split(" ")[0]);
  const occasion = escape(inquiry.occasion);
  const location = escape(inquiry.location);
  const phone = escape(inquiry.phone);
  const email = inquiry.email ? escape(inquiry.email) : null;
  const when = formatEventDate(inquiry.eventDate);
  const received = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(receivedAt);
  const message = inquiry.message ? escape(inquiry.message).replace(/\n/g, "<br>") : null;

  const headline =
    inquiry.occasion === "Something else"
      ? `${firstName} has something to celebrate.`
      : `${firstName} is planning a ${occasion.toLowerCase()}.`;
  const subject = `New inquiry: ${inquiry.occasion} – ${inquiry.name}`;
  const preheader = `${inquiry.occasion} · ${when} · ${inquiry.location}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${c.mist};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.mist};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

      <!-- Logo -->
      <tr><td style="padding:0 4px 24px;">
        <img src="cid:${LOGO_CID}" width="180" height="51" alt="Dh Photography" style="display:block;border:0;width:180px;height:auto;">
      </td></tr>

      <!-- Card -->
      <tr><td style="background:${c.paper};border-radius:16px;padding:40px 36px 32px;">
        <p style="margin:0 0 8px;font-family:${sans};font-size:13px;line-height:20px;color:${c.stone};">New inquiry · ${received}</p>
        <h1 style="margin:0;font-family:${serif};font-weight:400;font-size:32px;line-height:38px;color:${c.ink};">${headline}</h1>

        <!-- At a glance -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;background:${c.mist};border-radius:12px;">
          <tr>
            <td style="padding:16px 20px;font-family:${sans};vertical-align:top;">
              <div style="font-size:12px;line-height:18px;color:${c.stone};">Date</div>
              <div style="font-size:15px;line-height:22px;color:${c.ink};font-weight:600;">${when}</div>
            </td>
            <td style="padding:16px 20px;font-family:${sans};vertical-align:top;">
              <div style="font-size:12px;line-height:18px;color:${c.stone};">Where</div>
              <div style="font-size:15px;line-height:22px;color:${c.ink};font-weight:600;">${location}</div>
            </td>
          </tr>
        </table>

        <!-- Actions -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            ${button(whatsappReplyLink(inquiry.phone, inquiry.name), "Reply on WhatsApp", true)}
            ${button(`tel:${inquiry.phone.replace(/[^\d+]/g, "")}`, "Call", false)}
            ${email ? button(`mailto:${inquiry.email}`, "Email", false) : ""}
          </tr>
        </table>

        <!-- Details -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          ${row("Name", name)}
          ${row("Phone / WhatsApp", phone)}
          ${email ? row("Email", `<a href="mailto:${email}" style="color:${c.ink};">${email}</a>`) : ""}
          ${row("Celebrating", occasion)}
          ${row("Date", when)}
          ${row("Town or venue", location)}
        </table>

        ${
          message
            ? `<div style="margin-top:24px;padding:4px 0 4px 20px;border-left:3px solid ${c.blush};background:${c.paper};">
          <div style="font-family:${sans};font-size:12px;line-height:18px;color:${c.stone};margin-bottom:6px;">Their message</div>
          <div style="font-family:${serif};font-size:17px;line-height:27px;color:${c.ink};">${message}</div>
        </div>`
            : ""
        }
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 4px 0;font-family:${sans};font-size:12px;line-height:18px;color:${c.stone};">
        Sent from the contact form on the ${escape(site.name)} website.${email ? " Replying to this email answers them directly." : ""}<br>
        ${escape(site.location)} · ${escape(site.phoneDisplay)}
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `New inquiry · ${received}`,
    "",
    headline.replace(/&#39;/g, "'").replace(/&amp;/g, "&"),
    "",
    `Name: ${inquiry.name}`,
    `Phone / WhatsApp: ${inquiry.phone}`,
    inquiry.email ? `Email: ${inquiry.email}` : null,
    `Celebrating: ${inquiry.occasion}`,
    `Date: ${when}`,
    `Town or venue: ${inquiry.location}`,
    inquiry.message ? `\nTheir message:\n${inquiry.message}` : null,
    "",
    `Reply on WhatsApp: ${whatsappReplyLink(inquiry.phone, inquiry.name)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
