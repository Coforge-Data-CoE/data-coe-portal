"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./accelerators.scss"

const dummyData = [
  {
    _id: 1,
    name: "Accelerator1",
    banner: "/db-analyzer-01.png",
    description: "This is a description for Accelerator1.",
  },
  {
    _id: 2,
    name: "Accelerator2",
    banner: "/dg-nexus.png",
    description: "This is a description for Accelerator2.",
  },
  {
    _id: 3,
    name: "Accelerator3",
    banner: "/data-migration.png",
    description: "This is a description for Accelerator3.",
  },
  {
    _id: 4,
    name: "Accelerator4",
    banner: "/customer-support.png",
    description: "This is a description for Accelerator4.",
  },
];

const apiUrl = (path: string) => {
  // if (typeof window !== "undefined") {
  //   return new URL(path, window.location.origin).toString();
  // }
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/datacosmos";
  return base + path;
};

export default function Accelerators() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/accelerators/list");
  }, [router]);
}
