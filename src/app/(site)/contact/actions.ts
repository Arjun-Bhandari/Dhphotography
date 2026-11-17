"use server";

import { notifyInquiry, saveInquiry } from "@/lib/inquiries";
import { occasions } from "./occasions";

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors: Partial<Record<Field, string>>; values: Values }
  | { status: "sent"; name: string };

type Field = "name" | "phone" | "email" | "occasion" | "eventDate" | "location" | "message";
type Values = Partial<Record<Field, string>>;

const get = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Honeypot: people never see this field, bots fill it in. Pretend it worked.
  if (get(form, "website")) return { status: "sent", name: "" };

  const values: Values = {
    name: get(form, "name"),
    phone: get(form, "phone"),
    email: get(form, "email"),
    occasion: get(form, "occasion"),
    eventDate: get(form, "eventDate"),
    location: get(form, "location"),
    message: get(form, "message"),
  };

  const fieldErrors: Partial<Record<Field, string>> = {};
  if (!values.name) fieldErrors.name = "Enter your name.";
  if (!values.phone || values.phone.replace(/\D/g, "").length < 10)
    fieldErrors.phone = "Enter a phone or WhatsApp number with at least 10 digits.";
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
    fieldErrors.email = "Enter a valid email, or leave it empty.";
  if (!occasions.some((o) => o.value === values.occasion)) fieldErrors.occasion = "Choose what you are celebrating.";
  if (!values.location) fieldErrors.location = "Enter the town or venue.";
  if ((values.message?.length ?? 0) > 2000) fieldErrors.message = "Keep the message under 2000 characters.";

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors, values };
  }

  const inquiry = {
    name: values.name!.slice(0, 120),
    phone: values.phone!.slice(0, 40),
    email: values.email || null,
    occasion: values.occasion!,
    eventDate: values.eventDate || null,
    location: values.location!.slice(0, 200),
    message: values.message || null,
  };

  try {
    await saveInquiry(inquiry);
  } catch (error) {
    console.error("[inquiry] save failed:", error);
    return {
      status: "error",
      message: "Your message could not be sent. Please try again, or message me on WhatsApp.",
      fieldErrors: {},
      values,
    };
  }
  await notifyInquiry(inquiry);

  return { status: "sent", name: inquiry.name.split(" ")[0] };
}
