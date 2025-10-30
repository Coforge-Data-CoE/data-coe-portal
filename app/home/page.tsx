
"use client";
import React, { useState } from "react";
import Image from "next/image";

const dummyData = [
  {
    _id: 1,
    name: "Accelerator1",
    banner: "/coforge-logo.svg",
    description: "This is a description for Accelerator1."
  },
  {
    _id: 2,
    name: "Accelerator2",
    banner: "/coforge-logo.svg",
    description: "This is a description for Accelerator2."
  },
  {
    _id: 3,
    name: "Accelerator3",
    banner: "/coforge-logo.svg",
    description: "This is a description for Accelerator3."
  }
];

export default function Home() {
  const [items] = useState(dummyData);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map(item => (
          <div key={item._id} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <Image
              src={item.banner}
              alt={item.name}
              width={400}
              height={160}
              className="object-cover w-full h-40"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{item.description}</p>
              <button className="mt-auto bg-[#f15840] text-white px-4 py-2 rounded hover:bg-[#d94c2f] transition">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
