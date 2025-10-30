"use client";
import Image from "next/image";
import { useState } from "react";

export interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  onLogout?: () => void;
  children?: React.ReactNode;
}

export default function Header({
  logoSrc = "/coforge-logo.svg",
  logoAlt = "Logo",
  searchPlaceholder = "Search...",
  onSearch,
  onLogout,
  children
}: HeaderProps) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header style={{ width: '100%', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image
          className="dark:invert"
          src={logoSrc}
          alt={logoAlt}
          width={150}
          height={40}
          priority
        />
        {children}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={handleSearchChange}
          style={{ width: '300px', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
        />
      </div>
      <div>
        <button
          style={{ background: '#f15840', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1.25rem', fontWeight: 600, cursor: 'pointer' }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
