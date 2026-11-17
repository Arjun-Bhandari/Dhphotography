"use client";

import { useState } from "react";
import { whatsappReplyLink } from "@/lib/whatsapp";
import { updateStatus } from "../actions";

// Kept in sync with STATUSES in lib/dashboard/inquiries.ts (that module is server-only).
const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "booked", label: "Booked" },
  { value: "delivered", label: "Delivered" },
  { value: "closed", label: "Closed" },
] as const;

const statusTone: Record<string, string> = {
  new: "bg-sindoor text-paper",
  contacted: "bg-blush text-ink",
  booked: "bg-forest text-paper",
  delivered: "bg-mist text-ink ring-1 ring-ink/10",
  closed: "bg-mist text-stone ring-1 ring-ink/10",
};

type Row = {
  id: number;
  createdAt: string;
  name: string;
  phone: string;
  email: string | null;
  occasion: string;
  eventDate: string | null;
  location: string;
  message: string | null;
  status: string;
};

const formatDate = (iso: string | null, withTime = false) =>
  iso
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...(withTime ? { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" } : { timeZone: "UTC" }),
      }).format(new Date(withTime ? iso : `${iso}T00:00:00Z`))
    : "Date not decided";

export function InquiryList({ inquiries }: { inquiries: Row[] }) {
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  const count = (status: string) => inquiries.filter((i) => i.status === status).length;

  return (
    <section>
      <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
        {[{ value: "all", label: "All" }, ...STATUSES].map((s) => {
          const n = s.value === "all" ? inquiries.length : count(s.value);
          return (
            <button
              key={s.value}
              type="button"
              aria-pressed={filter === s.value}
              onClick={() => setFilter(s.value)}
              className={[
                "min-h-10 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition-colors",
                filter === s.value ? "bg-ink text-paper ring-ink" : "bg-paper text-ink ring-ink/10 hover:ring-ink/30",
              ].join(" ")}
            >
              {s.label} <span className="tabular-nums opacity-60">{n}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-panel bg-paper p-8 text-stone">
          {inquiries.length === 0
            ? "No inquiries yet. They will appear here as soon as someone sends the contact form."
            : "Nothing with this status."}
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((inq) => (
            <li key={inq.id} className="rounded-panel bg-paper p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-sans text-lg font-medium">{inq.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[inq.status] ?? ""}`}>
                      {STATUSES.find((s) => s.value === inq.status)?.label ?? inq.status}
                    </span>
                  </div>
                  <p className="mt-1 text-stone">
                    {inq.occasion} · {formatDate(inq.eventDate)} · {inq.location}
                  </p>
                  <p className="mt-1 text-xs text-stone">Received {formatDate(inq.createdAt, true)}</p>
                </div>

                <form action={updateStatus}>
                  <input type="hidden" name="id" value={inq.id} />
                  <label className="flex items-center gap-2 text-sm text-stone">
                    Status
                    <select
                      name="status"
                      defaultValue={inq.status}
                      onChange={(e) => e.currentTarget.form?.requestSubmit()}
                      className="rounded-full bg-mist px-3 py-2 text-sm text-ink ring-1 ring-ink/10 focus:ring-2 focus:ring-sindoor focus:outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </form>
              </div>

              {inq.message ? (
                <p className="mt-4 max-w-prose whitespace-pre-line border-l-2 border-blush pl-4 text-ink">{inq.message}</p>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <a
                  href={whatsappReplyLink(inq.phone, inq.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-sindoor px-4 py-2 font-medium text-paper transition-colors hover:bg-sindoor-deep"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${inq.phone.replace(/[^\d+]/g, "")}`}
                  className="rounded-full px-4 py-2 font-medium ring-1 ring-ink/15 ring-inset transition-colors hover:bg-mist"
                >
                  Call {inq.phone}
                </a>
                {inq.email ? (
                  <a
                    href={`mailto:${inq.email}`}
                    className="rounded-full px-4 py-2 font-medium ring-1 ring-ink/15 ring-inset transition-colors hover:bg-mist"
                  >
                    {inq.email}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
