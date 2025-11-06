"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [galaxyDropdownOpen, setGalaxyDropdownOpen] = useState(false);

  // Close dropdown on outside click or escape
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.offerings-dropdown')) {
        setDropdownOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.galaxies-dropdown')) {
        setGalaxyDropdownOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setGalaxyDropdownOpen(false);
      }
    }
    if (dropdownOpen || galaxyDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen, galaxyDropdownOpen]);

  return (
    <header className="w-full bg-[#1f316d] dark:bg-gray-900 shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/datacosmos">
          <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Logo" width={200} height={36} />
        </Link>
        {/* <span className="text-xl font-bold text-gray-900 dark:text-white">| Data Cosmos</span> */}
      </div>
      <nav className="flex gap-6 items-center">
        <Link href="/datacosmos" className="text-white dark:text-white hover:text-[#f15840] font-medium flex items-center gap-2">
          <i className="ri-home-2-line text-lg"></i>Home
        </Link>
        {/* <Link href="/accelerator" className="text-white dark:text-white hover:text-[#f15840] font-medium flex items-center gap-2">
          <i className="ri-rocket-2-line text-lg"></i>Accelerators
        </Link> */}
        <div className="relative offerings-dropdown">
          <button
            className="text-white dark:text-white hover:text-[#f15840] font-medium focus:outline-none flex items-center gap-2"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <i className="ri-menu-2-line text-lg"></i>Technology Offerings ▾
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 min-w-[220px] bg-white dark:bg-gray-800 rounded shadow-lg transition-opacity z-50">
              <ul className="py-2">
                <li><Link href="/offerings/supernova" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-star-line text-lg"></i>Coforge SUPERNOVA</Link></li>
                <li><Link href="/offerings/nebula" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-cloud-line text-lg"></i>Coforge NEBULA</Link></li>
                <li><Link href="/offerings/hypernova" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-fire-line text-lg"></i>Coforge HYPERNOVA</Link></li>
                <li><Link href="/offerings/pulsar" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-flashlight-line text-lg"></i>Coforge PULSAR</Link></li>
                <li><Link href="/offerings/quasar" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-lightbulb-line text-lg"></i>Coforge QUASAR</Link></li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative galaxies-dropdown">
          <button
            className="text-white dark:text-white hover:text-[#f15840] font-medium focus:outline-none flex items-center gap-2"
            onClick={() => setGalaxyDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={galaxyDropdownOpen}
          >
            <i className="ri-building-line text-lg"></i>Industries ▾
          </button>
          {galaxyDropdownOpen && (
            <div className="absolute left-0 mt-2 min-w-[220px] bg-white dark:bg-gray-800 rounded shadow-lg transition-opacity z-50">
              <ul className="py-2">
                <li><Link href="/galaxies/bfsi" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-bank-line text-lg"></i>BFSI Galaxy</Link></li>
                <li><Link href="/galaxies/ins" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-shield-line text-lg"></i>Insurance Galaxy</Link></li>
                <li><Link href="/galaxies/tth" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-plane-line text-lg"></i>TTH Galaxy</Link></li>
                <li><Link href="/galaxies/retail" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-shopping-cart-line text-lg"></i>Retail Galaxy</Link></li>
                <li><Link href="/galaxies/healthcare" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-heart-pulse-line text-lg"></i>Healthcare Galaxy</Link></li>
                <li><Link href="/galaxies/energy" className="block px-6 py-2 text-gray-900 dark:text-white hover:bg-[#f15840]/10 flex items-center gap-2"><i className="ri-government-line text-lg"></i>Energy Galaxy</Link></li>
              </ul>
            </div>
          )}
        </div>
        <Link href="/authentication/signin" className="text-white dark:text-white hover:text-[#f15840] font-medium flex items-center gap-2">
          <i className="ri-login-box-line text-lg"></i>Sign In
        </Link>
        <Link href="/authentication/register" className="text-white dark:text-white hover:text-[#f15840] font-medium flex items-center gap-2">
          <i className="ri-user-add-line text-lg"></i>Register
        </Link>
      </nav>
    </header>
  );
}
