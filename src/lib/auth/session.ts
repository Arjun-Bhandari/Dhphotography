// Single-owner dashboard session: a signed, expiring token in an httpOnly cookie.
// Uses Web Crypto only, so it runs in both proxy.ts and server code.
//   ADMIN_PASSWORD   the dashboard password
//   SESSION_SECRET   long random string used to sign sessions (32+ characters)

export const SESSION_COOKIE = "dh_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

const encoder = new TextEncoder();

function secret() {
  const value = process.env.SESSION_SECRET;
  return value && value.length >= 32 ? value : null;
}

/** True when both env vars are set, i.e. the dashboard can be used. */
export function authConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

function toBase64Url(bytes: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(key: string, message: string) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message)));
}

/** Constant-time string comparison (no early exit on the first differing character). */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("SESSION_SECRET must be set (32+ characters).");
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  return `${expires}.${await hmac(key, `session:${expires}`)}`;
}

export async function verifySessionToken(token: string | undefined) {
  const key = secret();
  if (!key || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) * 1000 < Date.now()) return false;
  return safeEqual(signature, await hmac(key, `session:${expires}`));
}

/** Compares HMACs of both values so neither length nor content leaks through timing. */
export async function passwordMatches(input: string) {
  const password = process.env.ADMIN_PASSWORD;
  const key = secret();
  if (!password || !key) return false;
  return safeEqual(await hmac(key, `pw:${input}`), await hmac(key, `pw:${password}`));
}
