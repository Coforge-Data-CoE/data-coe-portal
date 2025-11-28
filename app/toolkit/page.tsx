"use client";
import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

export default function ToolkitsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${basePath}/api/accelerators`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch toolkits");
        return res.json();
      })
      .then(data => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="page-title">Data Cosmos Toolkit</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        {items.map((it: any) => (
          <Card
            key={it._id}
            bordered={false}
            className="rounded-xl shadow-lg border border-[#dedede] flex flex-col justify-between"
            style={{ minHeight: 220, padding: 0 }}
            bodyStyle={{ padding: 0 }}
          >
            {it.imageUrl ? (
              <img src={it.imageUrl} alt={it.name} className="w-full h-44 object-cover rounded-t-xl" />
            ) : (
              <div className="w-full h-44 bg-gray-200 rounded-t-xl" />
            )}
            <div className="p-4 flex flex-col gap-2">
              <strong className="block text-lg font-semibold mb-2 text-gray-900">{it.name}</strong>
              <div className="text-gray-700 mb-2">{it.description}</div>
              <div className="flex gap-2 mt-2">
                <Link href={`/accelerators/list/${it._id}`} className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">View</Link>
                <Link href={`/accelerators/list/${it._id}/try`} className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition">Try Out</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
