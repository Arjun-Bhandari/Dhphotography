import { Suspense } from "react";
import { requireSession } from "@/lib/auth/require-session";
import { listInquiries } from "@/lib/dashboard/inquiries";
import { InquiryList } from "./inquiry-list";

export const metadata = { title: "Inquiries" };

export default function InquiriesPage() {
  return (
    <Suspense fallback={<p className="text-stone">Loading inquiries…</p>}>
      <Inquiries />
    </Suspense>
  );
}

async function Inquiries() {
  await requireSession();
  const rows = await listInquiries();
  const waiting = rows.filter((r) => r.status === "new").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl">Inquiries</h1>
        <p className="mt-2 text-stone">
          {waiting === 0
            ? "You are all caught up."
            : `${waiting} ${waiting === 1 ? "person is" : "people are"} waiting for a reply.`}
        </p>
      </div>
      <InquiryList inquiries={rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))} />
    </div>
  );
}
