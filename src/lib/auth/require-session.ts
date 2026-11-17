import "server-only";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

/**
 * Second check inside server code (pages and actions), in addition to proxy.ts:
 * server actions can be called directly, so they must never rely on the proxy alone.
 */
export async function requireSession() {
  // Per-request work (reads the clock to check expiry), never prerendered.
  await connection();
  const store = await cookies();
  if (!(await verifySessionToken(store.get(SESSION_COOKIE)?.value))) {
    redirect("/dashboard/login");
  }
}
