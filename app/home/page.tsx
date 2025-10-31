
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  BankOutlined,
  SafetyCertificateOutlined,
  CarOutlined,
  ShoppingOutlined,
  HeartOutlined,
  BulbOutlined
} from "@ant-design/icons";

const dummyData = [
  {
    _id: 1,
    name: "Coforge SUPERNOVA",
    banner: "/supernova.png",
    bg: "/supernova.jpg",
    description: "SUPERNOVA: Accelerate your data transformation with blazing speed and intelligence."
  },
  {
    _id: 2,
    name: "Coforge NEBULA",
    banner: "/nebula.png",
    bg: "/nebula.jpg",
    description: "NEBULA: Unify and visualize your enterprise data in a single cloud."
  },
  {
    _id: 3,
    name: "Coforge HYPERNOVA",
    banner: "/hypernova.png",
    bg: "/hypernova.png",
    description: "HYPERNOVA: Supercharge analytics and automation for next-gen business outcomes."
  },
  {
    _id: 4,
    name: "Coforge PULSAR",
    banner: "/pulsar.png",
    bg: "/pulsar.jpg",
    description: "PULSAR: Real-time data streaming and event-driven insights for your enterprise."
  },
  {
    _id: 5,
    name: "Coforge Quasar",
    banner: "/quasar.png",
    bg: "/quasar.jpg",
    description: "Quasar: Quantum leap in data governance, security, and compliance."
  }
];

const industries = [
  { id: 1, name: "Banking & Financial Services", icon: <BankOutlined /> },
  { id: 2, name: "Insurance", icon: <SafetyCertificateOutlined /> },
  { id: 3, name: "Travel, Transport & Hospitality", icon: <CarOutlined /> },
  { id: 4, name: "Retail, Manufacturing & Customer Goods", icon: <ShoppingOutlined /> },
  { id: 5, name: "Healthcare & Life Sciences", icon: <HeartOutlined /> },
  { id: 6, name: "Public Sector Energy & Utilties", icon: <BulbOutlined /> }
];

export default function Home() {
  const [items] = useState(dummyData);

  return (
    <div
      className="min-h-screen font-sans p-8 flex"
      style={{
        background: 'linear-gradient(120deg, #4468bcff 0%, #183e7bff 100%)',
      }}
    >
      {/* Left Menu */}
      <aside className="w-72 mr-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 h-fit sticky top-8 self-start">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Industries</h2>
        <ul className="space-y-3">
          {industries.map(industry => (
            <li key={industry.id} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#f15840] cursor-pointer">
              <span className="text-xl">{industry.icon}</span>
              <span>{industry.name}</span>
            </li>
          ))}
        </ul>
      </aside>
      {/* Heading */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Data Offerings</h1>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {items.map(item => (
          <div
            key={item._id}
            className="rounded-lg shadow-lg overflow-hidden flex flex-col items-center"
            style={{
              background: `linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.85) 100%), url(${item.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white'
            }}
          >
            <div className="flex justify-center items-center pt-6">
              <Image
                src={item.banner}
                alt={item.name}
                width={64}
                height={64}
                className="object-contain rounded-full bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2 text-white text-center">{item.name}</h2>
              <p className="text-gray-200 mb-4 flex-1 text-center">{item.description}</p>
              {/* <button className="mt-auto bg-[#f15840] text-white px-4 py-2 rounded hover:bg-[#d94c2f] transition">View Details</button> */}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
