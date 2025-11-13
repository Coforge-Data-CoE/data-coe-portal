"use client";
// Menu data structure
const menuData = [
  {
    label: "Home",
    href: "/datacosmos",
    icon: "ri-home-2-line",
  },
  {
    label: "Technology Offerings",
    icon: "ri-menu-2-line",
    submenu: [
      { label: "SUPERNOVA", href: "/offerings/supernova", icon: "ri-star-line" },
      { label: "NEBULA", href: "/offerings/nebula", icon: "ri-cloud-line" },
      { label: "HYPERNOVA", href: "/offerings/hypernova", icon: "ri-fire-line" },
      { label: "PULSAR", href: "/offerings/pulsar", icon: "ri-flashlight-line" },
      { label: "QUASAR", href: "/offerings/quasar", icon: "ri-lightbulb-line" },
    ],
  },
  {
    label: "Industries",
    icon: "ri-building-line",
    submenu: [
      { label: "BFS Galaxy", href: "/galaxies/bfs", icon: "ri-bank-line" },
      { label: "Insurance Galaxy", href: "/galaxies/ins", icon: "ri-shield-line" },
      { label: "TTH Galaxy", href: "/galaxies/tth", icon: "ri-plane-line" },
      { label: "Retail Galaxy", href: "/galaxies/retail", icon: "ri-shopping-cart-line" },
      { label: "Healthcare Galaxy", href: "/galaxies/healthcare", icon: "ri-heart-pulse-line" },
      { label: "Energy Galaxy", href: "/galaxies/energy", icon: "ri-government-line" },
    ],
  },
];

// Reusable MenuList component
type MenuListProps = {
  menu: typeof menuData;
  isMobile?: boolean;
  onClose?: () => void;
};
function MenuList({ menu, isMobile = false, onClose }: MenuListProps) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  // Outside click/escape close for desktop dropdowns
  React.useEffect(() => {
    if (isMobile || openIdx === null) return;
    function handleClick(e: MouseEvent) {
      // Only close if click is outside any dropdown
      if (!(e.target as HTMLElement).closest('.offerings-dropdown') && !(e.target as HTMLElement).closest('.galaxies-dropdown')) {
        setOpenIdx(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenIdx(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobile, openIdx]);
  return (
    <>
      {menu.map((item, idx) => {
        if (!item.submenu) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`menu-link flex items-center gap-2${isMobile ? ' text-2xl w-full justify-start' : ' text-sm xl:text-lg'}`}
              onClick={onClose}
            >
              <i className={`${item.icon} ${isMobile ? 'text-2xl' : 'text-sm xl:text-lg'}`}></i>{item.label}
            </Link>
          );
        }
        // Submenu
        if (isMobile) {
          return (
            <React.Fragment key={item.label}>
              <button
                className={`menu-link flex items-center gap-2 w-full justify-start text-left${isMobile ? ' text-2xl' : ''}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <i className={`${item.icon} text-2xl`}></i>{item.label}
                <span className="ml-auto">{openIdx === idx ? '▴' : '▾'}</span>
              </button>
              {openIdx === idx && (
                <div className="flex flex-col gap-4 pl-8 w-full">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="menu-link flex items-center gap-2"
                      onClick={onClose}
                    >
                      <i className={`${sub.icon} text-2xl`}></i>{sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        }
        // Desktop: dropdowns
        // For the last menu (Industries), shift dropdown left
        const isLastMenu = idx === menu.length - 1;
        return (
          <div key={item.label} className={`relative ${item.label === 'Technology Offerings' ? 'offerings-dropdown' : 'galaxies-dropdown'}`}>
            <button
              className="menu-link flex items-center gap-2 focus:outline-none text-sm xl:text-lg"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              aria-haspopup="true"
              aria-expanded={openIdx === idx}
            >
              <i className={`${item.icon} text-sm xl:text-lg`}></i>{item.label} ▾
            </button>
            {openIdx === idx && (
              <div className={`absolute mt-2 min-w-[220px] bg-[#131B3ACF] rounded shadow-lg transition-opacity z-50 ${isLastMenu ? 'left-[-100px]' : 'left-0'}`}>
                <ul className="py-2" style={{ border: '1px solid #add8e66e', borderRadius: '0 0 10px 10px' }}>
                  {item.submenu.map((sub) => (
                    <li key={sub.label}>
                      <Link href={sub.href} className="menu-link block px-6 py-2 flex items-center gap-2 text-sm xl:text-lg">
                        <i className={`${sub.icon} text-sm xl:text-lg`}></i>{sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

import React, { useState } from "react";
import { Avatar } from "antd";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
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

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header (hidden on mobile) */}
  <header className="sticky top-0 z-50 w-full bg-[#0A0F2C] shadow-md py-2 xl:py-4 px-8 items-center justify-between hidden md:flex">
        <div className="flex items-center gap-3">
          <Link href="/datacosmos">
            <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Logo" width={200} height={36} className="w-[140px] xl:w-[200px]" />
          </Link>
        </div>
        <nav className="flex gap-6 items-center">
          <MenuList menu={menuData} />
          {/* User info and logout */}
        {status === "loading" ? null : session && session.user ? (
          <div className="flex items-center gap-3 ml-6">
            <Avatar
              src={typeof session.user.image === "string" && session.user.image ? session.user.image : undefined}
              alt={session.user.name || session.user.email || "User"}
              size={36}
              style={{ border: "1px solid #f15840", background: "#140436ff" }}
            >
              {session.user.name ? session.user.name[0] : (session.user.email ? session.user.email[0] : "U")}
            </Avatar>
            <span className="text-white text-sm font-semibold">{session.user.name || session.user.email}</span>
            <span className="ps-1 text-white">|</span>
            <button
              className="px-1 py-1 rounded text-[#f15840]  font-semibold shadow hover:bg-[#d94c2f] hover:text-white transition text-sm"
              onClick={() => signOut({ callbackUrl: '/signin' })}
            >
              Signout
            </button>
          </div>
        ) : null}
        </nav>
        
      </header>

      {/* Mobile Header (hidden on desktop) */}
  <header className="sticky top-0 z-50 w-full bg-[#0A0F2C] shadow-md py-4 px-4 flex items-center justify-between md:hidden">
        <Link href="/datacosmos">
          <Image src="/logos/galaxies/coforge-cosmos_white.svg" alt="Coforge Logo" width={160} height={32} />
        </Link>
        <button
          className="text-white text-2xl focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <i className="ri-menu-3-line"></i>
        </button>
      </header>

      {/* Mobile full-screen menu panel with expandable menus */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0F2C]/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <i className="ri-close-line"></i>
          </button>
          <nav className="flex flex-col gap-6 items-center text-white text-xl w-full max-w-xs">
            <MenuList menu={menuData} isMobile={true} onClose={() => setMenuOpen(false)} />
          </nav>
          {/* User info and logout at bottom for mobile */}
          {status === "loading" ? null : session && session.user ? (
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-center bg-[#181C2A]/80 py-6 border-t border-[#f15840]">
              <span className="text-white text-base font-semibold mb-2">{session.user.name || session.user.email}</span>
              <button
                className="px-6 py-2 rounded bg-[#f15840] text-white font-semibold shadow hover:bg-[#d94c2f] transition text-base"
                onClick={() => signOut({ callbackUrl: '/signin' })}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
