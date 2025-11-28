"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";

export default function AcceleratorsView({ items }: { items: any[] }) {
  const [view, setView] = useState("cards");
  const router = useRouter();
  return (
    <div style={{ margin: "24px auto", padding: "0 16px" }}>
      <h2 className="page-title">Data Cosmos Toolkit</h2>
      <div style={{ display: "flex", gap: 12, margin: "24px 0" }}>
        <button onClick={() => setView("table")} style={{ padding: "8px 16px", borderRadius: 6, background: view === "table" ? "#f15840" : "#222", color: "#fff", border: "none" }}>Table view</button>
        <button onClick={() => setView("cards")} style={{ padding: "8px 16px", borderRadius: 6, background: view === "cards" ? "#f15840" : "#222", color: "#fff", border: "none" }}>Cards view</button>
        <button onClick={() => setView("list")} style={{ padding: "8px 16px", borderRadius: 6, background: view === "list" ? "#f15840" : "#222", color: "#fff", border: "none" }}>List view</button>
        <Button type="primary" onClick={() => router.push("/accelerators/new")}>Add new Accelerator</Button>
        
      </div>
      {view === "table" && (
        <Table
          dataSource={items.map((it: any) => ({
            key: it._id,
            name: it.name,
            description: it.description,
            image: it.imageUrl ? <img src={it.imageUrl} alt={it.name} style={{ maxWidth: 80, borderRadius: 6 }} /> : null,
            video: it.videoUrl ? <video src={it.videoUrl} controls style={{ maxWidth: 120, borderRadius: 6 }} /> : null,
            actions: (
              <div className="flex gap-2">
                <Link href={`/accelerators/list/${it._id}`} className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">View</Link>
                <Link href={`/accelerators/list/${it._id}/edit`} className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition">Edit</Link>
              </div>
            ),
          }))}
          columns={[
            { title: "Title", dataIndex: "name", key: "name" },
            { title: "Description", dataIndex: "description", key: "description " },
            { title: "Image", dataIndex: "image", key: "image" },
            { title: "Video", dataIndex: "video", key: "video" },
            { title: "Actions", dataIndex: "actions", key: "actions" },
          ]}
          pagination={false}
          style={{ background: "#fff", borderRadius: 8 }}
        />
      )}
      {view === "cards" && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
          {items.map((it: any) => (
            <div key={it._id} className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
              {it.imageUrl ? (
                <img src={it.imageUrl} alt={it.name} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-gray-200" />
              )}
              <div className="p-4 flex flex-col gap-2">
                <strong className="block text-lg font-semibold mb-2 text-gray-900">{it.name}</strong>
                <div className="text-gray-700 mb-2">{it.description}</div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/accelerators/list/${it._id}`} className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">View</Link>
                  <Link href={`/accelerators/list/${it._id}/edit`} className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition">Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {view === "list" && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((it: any) => (
            <li key={it._id} style={{ margin: "18px 0", background: "#fff", borderRadius: 8, padding: 16, color: "#222", boxShadow: "0 2px 12px #0001" }}>
              <strong style={{ fontSize: 16 }}>{it.name}</strong> — {it.description}
              {it.imageUrl ? (
                <div>
                  <img src={it.imageUrl} alt={it.name} style={{ maxWidth: 120, borderRadius: 6, marginTop: 8 }} />
                </div>
              ) : null}
              {it.videoUrl ? (
                <div style={{ marginTop: 8 }}>
                  <video src={it.videoUrl} controls style={{ maxWidth: 180, borderRadius: 6 }} />
                </div>
              ) : null}
              <div className="flex gap-2 mt-2">
                <Link href={`/accelerators/list/${it._id}`} className="px-3 py-1 rounded bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">View</Link>
                <Link href={`/accelerators/list/${it._id}/edit`} className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
