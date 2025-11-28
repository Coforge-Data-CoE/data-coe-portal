"use client";
import React, { useEffect, useState } from "react";
import AcceleratorsView from "./AcceleratorsView";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

export default function ItemsList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  return <AcceleratorsView items={items} />;
}
