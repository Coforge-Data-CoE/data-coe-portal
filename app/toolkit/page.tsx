"use client";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import ToolkitCards from "../components/ToolkitCards";

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
      {/* Banner Pane */}
      <div
        className="w-full rounded-xl mb-10 flex flex-col items-center justify-center text-center p-8"
        style={{
          background: "linear-gradient(90deg, #0b0e2c 0%, #1e3c72 100%)",
          color: "white",
          minHeight: "420px",
          // backgroundImage: "url(/banner-01.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl font-bold mb-4">
          Try Out Our Data Accelerator Offerings
        </h1>
        {/* <p className="text-lg max-w-2xl mx-auto">
          Accelerate your data-driven initiatives with our suite of powerful
          tools and solutions. Explore accelerators designed to streamline data
          integration, analytics, and automation for your enterprise.
        </p> */}
        <p className="text-lg max-w-2xl mx-auto">
        Explore our powerful suite of cutting-edge accelerators designed to streamline your enterprise data journey. Featuring advanced capabilities like Agentic Data Quality, AI Orchestration, automated Migration, and robust Data Governance, we help you unleash the full potential of your data.
        </p>
      </div>
      {/* Cards Grid */}
      <ToolkitCards items={items} basePath={basePath} />
    </div>
  );
}
