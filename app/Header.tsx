import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/coforge-logo.svg" alt="Coforge Logo" width={120} height={40} />
        </Link>
        <span className="text-xl font-bold text-gray-900 dark:text-white">| Data COE Portal</span>
      </div>
      <nav className="flex gap-6">
        <Link href="/home" className="text-gray-700 dark:text-gray-300 hover:text-[#f15840] font-medium">Home</Link>
        <Link href="/accelerator" className="text-gray-700 dark:text-gray-300 hover:text-[#f15840] font-medium">Accelerators</Link>
        <Link href="/authentication/signin" className="text-gray-700 dark:text-gray-300 hover:text-[#f15840] font-medium">Sign In</Link>
        <Link href="/authentication/register" className="text-gray-700 dark:text-gray-300 hover:text-[#f15840] font-medium">Register</Link>
      </nav>
    </header>
  );
}
