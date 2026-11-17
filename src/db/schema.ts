import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Inquiries from the contact form. The dashboard will list these and move them
// through statuses: new → contacted → booked → delivered (or closed).
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  occasion: text("occasion").notNull(),
  eventDate: date("event_date"),
  location: text("location").notNull(),
  message: text("message"),
  status: text("status").default("new").notNull(),
});

export type NewInquiry = typeof inquiries.$inferInsert;
