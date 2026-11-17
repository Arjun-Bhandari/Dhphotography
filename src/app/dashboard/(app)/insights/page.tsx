import { Suspense } from "react";
import { requireSession } from "@/lib/auth/require-session";
import { listInquiries, summarise } from "@/lib/dashboard/inquiries";

export const metadata = { title: "Insights" };

export default function InsightsPage() {
  return (
    <Suspense fallback={<p className="text-stone">Loading insights…</p>}>
      <Insights />
    </Suspense>
  );
}

async function Insights() {
  await requireSession();
  const rows = await listInquiries();
  const stats = summarise(rows);
  const maxMonth = Math.max(1, ...stats.months.map((m) => m.count));
  const maxOccasion = Math.max(1, ...stats.byOccasion.map(([, n]) => n));
  const trend = stats.thisMonth - stats.lastMonth;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl">Insights</h1>
        <p className="mt-2 text-stone">How the website is bringing in work.</p>
      </div>

      {/* Headline numbers */}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Waiting for a reply" value={stats.open} highlight={stats.open > 0} />
        <Stat
          label="This month"
          value={stats.thisMonth}
          note={trend === 0 ? "Same as last month" : `${trend > 0 ? "+" : ""}${trend} vs last month`}
        />
        <Stat label="Booked" value={stats.booked} note={`${stats.conversion}% of all inquiries`} />
        <Stat label="All time" value={stats.total} />
      </dl>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Last 6 months">
          <ol className="flex h-40 items-end gap-3" aria-label="Inquiries per month">
            {stats.months.map((m) => (
              <li key={m.key} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-sm tabular-nums">{m.count}</span>
                <span
                  aria-hidden
                  className="w-full rounded-t-md bg-sindoor/80"
                  style={{ height: `${Math.max(4, (m.count / maxMonth) * 96)}px` }}
                />
                <span className="text-xs text-stone">{m.label}</span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="What people are celebrating">
          {stats.byOccasion.length ? (
            <ul className="space-y-3">
              {stats.byOccasion.map(([occasion, count]) => (
                <li key={occasion}>
                  <div className="flex justify-between gap-4 text-sm">
                    <span>{occasion}</span>
                    <span className="tabular-nums text-stone">{count}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-mist">
                    <div className="h-2 rounded-full bg-forest" style={{ width: `${(count / maxOccasion) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-stone">No inquiries yet.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value, note, highlight }: { label: string; value: number; note?: string; highlight?: boolean }) {
  return (
    <div className="rounded-panel bg-paper p-5">
      <dt className="text-sm text-stone">{label}</dt>
      <dd className={`mt-1 font-display text-4xl tabular-nums ${highlight ? "text-sindoor-deep" : ""}`}>{value}</dd>
      {note ? <dd className="mt-1 text-xs text-stone">{note}</dd> : null}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-panel bg-paper p-6">
      <h2 className="mb-5 font-sans text-lg font-medium">
        {title}
      </h2>
      {children}
    </section>
  );
}
