"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/require-session";
import {
  authConfigured,
  createSessionToken,
  passwordMatches,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth/session";
import { isStatus, setInquiryStatus } from "@/lib/dashboard/inquiries";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  // Checked per request (not at build time), so adding the env vars only needs a restart.
  if (!authConfigured()) {
    return { error: "Sign-in is not set up. Add ADMIN_PASSWORD and a 32+ character SESSION_SECRET." };
  }
  const password = String(form.get("password") ?? "");
  if (!(await passwordMatches(password))) {
    // Slow down guessing a little.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password is not right. Try again." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  const next = String(form.get("next") ?? "");
  // Only allow returning to a dashboard path, never an external URL.
  redirect(next.startsWith("/dashboard") ? next : "/dashboard");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/dashboard/login");
}

export async function updateStatus(form: FormData) {
  await requireSession();
  const id = Number(form.get("id"));
  const status = String(form.get("status") ?? "");
  if (!Number.isInteger(id) || !isStatus(status)) return;
  await setInquiryStatus(id, status);
  refresh();
}
