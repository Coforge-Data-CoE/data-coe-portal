
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";

const dummyData = [
  {
    _id: 1,
    name: "Accelerator1",
    banner: "/db-analyzer-01.png",
    description: "This is a description for Accelerator1."
  },
  {
    _id: 2,
    name: "Accelerator2",
    banner: "/dg-nexus.png",
    description: "This is a description for Accelerator2."
  },
  {
    _id: 3,
    name: "Accelerator3",
    banner: "/data-migration.png",
    description: "This is a description for Accelerator3."
  },
    {
    _id: 4,
    name: "Accelerator4",
    banner: "/customer-support.png",
    description: "This is a description for Accelerator4."
  }
];

export default function Home() {
  const [items] = useState(dummyData);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      {/* Banner Pane */}
      <div
        className="w-full rounded-xl mb-10 flex flex-col items-center justify-center text-center p-8"
        style={{
          background: 'linear-gradient(90deg, #082340 0%, #1e3c72 100%)',
          color: 'white',
          minHeight: '420px',
          backgroundImage: 'url(/banner-01.png)', // Replace with your background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Welcome to Data Accelerators</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Accelerate your data-driven initiatives with our suite of powerful tools and solutions. Explore accelerators designed to streamline data integration, analytics, and automation for your enterprise.
        </p>
      </div>
      {/* Cards Grid */}
      <h1 className="text-3xl font-bold mb-4 text-center">Our Accelerators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {items.map(item => (
          <Card key={item._id} className="flex flex-col overflow-hidden" sx={{ p: 0 }}>
            <Image
              src={item.banner}
              alt={item.name}
              width={400}
              height={320}
              className="object-cover w-full rounded-xl overflow-hidden"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{item.description}</p>
              <button className="mt-auto bg-[#f15840] text-white px-4 py-2 rounded hover:bg-[#d94c2f] transition">View Details</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
