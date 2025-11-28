"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type ActivityItem = {
  _id: string;
  type: string;
  createdAt: string;
  meta?: Record<string, any>;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

function formatDateInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function ActivityPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = React.useState<ActivityItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [fromDate, setFromDate] = React.useState<string>("");
  const [toDate, setToDate] = React.useState<string>("");

  const email = session?.user?.email || "";

  const applyPreset = (preset: "today" | "last7" | "thisMonth" | "all") => {
    const now = new Date();
    let from = "";
    let to = "";
    if (preset === "today") {
      const today = formatDateInput(now);
      from = today;
      to = today;
    } else if (preset === "last7") {
      const start = new Date();
      start.setDate(now.getDate() - 6);
      from = formatDateInput(start);
      to = formatDateInput(now);
    } else if (preset === "thisMonth") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      from = formatDateInput(start);
      to = formatDateInput(now);
    } else {
      from = "";
      to = "";
    }
    setFromDate(from);
    setToDate(to);
  };

  const fetchActivities = React.useCallback(async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("email", email);
      if (fromDate) params.set("from", fromDate);
      if (toDate) params.set("to", toDate);

      // Adjust to your API route. If you used /api/users?email=..., return activities there.
      const res = await fetch(`${basePath}/api/activities?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list: ActivityItem[] = data.activities || [];
      setItems(list);
    } catch (e: any) {
      setError(e.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }, [email, fromDate, toDate]);

  React.useEffect(() => {
    if (status === "authenticated") {
      fetchActivities();
    }
  }, [status, fetchActivities]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchActivities();
  };

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">My Activity</h1>
        <Link href={`${basePath}/`} className="text-sm text-[#f15840] hover:underline">
          ← Back
        </Link>
      </div>

      <div className="bg-[gray-50] border border-[#2a3358] rounded p-4 mb-4">
        <form className="flex flex-wrap items-end gap-3" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-xs text-gray-300 mb-1">From</label>
            <input
              type="date"
              className="px-2 py-1 rounded border border-[#2a3358]"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-300 mb-1">To</label>
            <input
              type="date"
              className="px-2 py-1 rounded border border-[#2a3358]"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="px-3 py-2 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm border border-[#f15840]"
              disabled={loading || !email}
            >
              Apply
            </button>
            <div className="flex justify-end" />
            <button
              type="button"
              className="px-3 py-2 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm border border-[#f15840]"
              onClick={() => applyPreset("today")}
            >
              Today
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm border border-[#f15840]"
              onClick={() => applyPreset("last7")}
            >
              Last 7 days
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded text-[#f15840] font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm border border-[#f15840]"
              onClick={() => applyPreset("thisMonth")}
            >
              This Month
            </button>
            <button
              type="button"
              className="ml-2 px-3 py-2 rounded text-gray-300 hover:text-white transition text-sm border border-[#2a3358]"
              onClick={() => applyPreset("all")}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="border border-[#2a3358] rounded overflow-hidden">
        {loading ? (
          <div className="px-4 py-4 text-sm text-gray-300">Loading...</div>
        ) : error ? (
          <div className="px-4 py-4 text-sm text-red-400">Error: {error}</div>
        ) : items.length === 0 ? (
          <div className="px-4 py-4 text-sm text-gray-300">No activities found.</div>
        ) : (
          <ul className="divide-y divide-[#2a3358]">
            {items.map((a) => (
              <li key={a._id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#f15840] text-xs font-semibold uppercase tracking-wide">
                    {a.type}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
                {/* {a.meta && Object.keys(a.meta).length > 0 && (
                  <div className="mt-1 text-[12px] text-gray-300 break-words">
                    {JSON.stringify(a.meta)}
                  </div>
                )} */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}