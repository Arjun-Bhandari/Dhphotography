import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const STATUSES = ["new", "contacted", "booked", "delivered", "closed"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  delivered: "Delivered",
  closed: "Closed",
};

export const isStatus = (value: string): value is Status => (STATUSES as readonly string[]).includes(value);

export type Inquiry = typeof inquiries.$inferSelect;

export async function listInquiries(): Promise<Inquiry[]> {
  if (!db) return [];
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiry(id: number) {
  if (!db) return null;
  const [row] = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return row ?? null;
}

export async function setInquiryStatus(id: number, status: Status) {
  if (!db) throw new Error("DATABASE_URL is not set.");
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
}

/** Monthly buckets in India time, oldest first, e.g. for the last 6 months. */
function monthKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit" }).format(date);
}

export function summarise(rows: Inquiry[], now = new Date()) {
  const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>;
  const byOccasion = new Map<string, number>();
  const byMonth = new Map<string, number>();

  for (const row of rows) {
    if (isStatus(row.status)) byStatus[row.status] += 1;
    byOccasion.set(row.occasion, (byOccasion.get(row.occasion) ?? 0) + 1);
    const key = monthKey(row.createdAt);
    byMonth.set(key, (byMonth.get(key) ?? 0) + 1);
  }

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 15);
    const key = monthKey(d);
    const label = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "Asia/Kolkata" }).format(d);
    return { key, label, count: byMonth.get(key) ?? 0 };
  });

  const thisMonth = months[5].count;
  const lastMonth = months[4].count;
  const won = byStatus.booked + byStatus.delivered;

  return {
    total: rows.length,
    open: byStatus.new,
    thisMonth,
    lastMonth,
    booked: won,
    conversion: rows.length ? Math.round((won / rows.length) * 100) : 0,
    byStatus,
    byOccasion: [...byOccasion.entries()].sort((a, b) => b[1] - a[1]),
    months,
  };
}
