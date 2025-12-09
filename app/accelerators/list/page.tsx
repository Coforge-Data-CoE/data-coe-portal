"use client";
import React, { useEffect, useState } from "react";
import ToolkitCards from "../../components/ToolkitCards";
import { Button, Table } from "antd";
import { useRouter } from "next/navigation";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

export default function ItemsList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${basePath}/api/accelerators`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch accelerators");
        return res.json();
      })
      .then(data => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      {/* Banner Pane */}
      {/* <div
        className="w-full rounded-xl mb-10 flex flex-col items-center justify-center text-center p-8"
        style={{
          background: "linear-gradient(90deg, #082340 0%, #1e3c72 100%)",
          color: "white",
          minHeight: "420px",
          backgroundImage: "url(/banner-01.png)", // Replace with your background
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Data Accelerators
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Accelerate your data-driven initiatives with our suite of powerful
          tools and solutions. Explore accelerators designed to streamline data
          integration, analytics, and automation for your enterprise.
        </p>
      </div> */}
       <div style={{ display: "flex", gap: 12, margin: "24px 0" }}>
        <Button type="primary" onClick={() => router.push("/accelerators/new")}>Add new Accelerator</Button>
</div>
      {/* Cards Grid */}
      <ToolkitCards
        items={items}
        basePath={basePath}
        title="Our Accelerators"
        isAdmin={true}
        hideTryOut={true}
        onEdit={id => {
          window.location.href = `${basePath}/accelerators/new?id=${id}`;
        }}
        onDelete={id => {
          // Implement delete logic here, e.g. show confirmation and call API
          if (window.confirm("Are you sure you want to delete this accelerator?")) {
            fetch(`${basePath}/api/accelerator/${id}`, { method: "DELETE" })
              .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                // Optionally refresh list
                setItems(items.filter(item => item._id !== id));
              })
              .catch(err => alert(err.message));
          }
        }}
      />
    </div>
  );
}
