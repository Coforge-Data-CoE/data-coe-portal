"use client";
import React from "react";
import Image from "next/image";
import type { Podcast } from "./PodcastCard";

export interface PodcastTileProps {
  podcast: Podcast;
  isActive?: boolean;
  durationSec?: number;
  onSelect?: () => void;
}

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const PodcastTile: React.FC<PodcastTileProps> = ({ podcast, isActive, durationSec, onSelect }) => {
  const formatRelative = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formatViews = (v: number) => {
    if (!v || v < 0) return undefined;
    if (v < 1000) return `${v}`;
    if (v < 1_000_000) return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
    return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`;
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl text-left shadow-lg transition-all h-[200px] flex flex-col ${
        isActive ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900" : "hover:-translate-y-0.5 hover:shadow-xl"
      }`}
      style={{ background: "linear-gradient(180deg, #0f172a, #0b1220)" }}
    >
      <div className="relative w-full h-[80px] overflow-hidden">
        <Image
          src={podcast.coverImage}
          alt={podcast.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
        {typeof durationSec === "number" ? (
          <span>{formatTime(durationSec)}</span>
        ) : (
          <span>Episode</span>
        )}
       
      </div>
      <div className="p-3 flex-1 min-h-0 flex flex-col justify-between">
        <div className="mb-2 flex items-center gap-2">
          {podcast.authorAvatar ? (
            <img src={podcast.authorAvatar} alt={podcast.author} className="h-6 w-6 rounded-full object-cover border border-white/20" />
          ) : (
            <div className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-semibold">
              {(podcast.author || "?")
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((s) => s[0]?.toUpperCase())
                .join("") || "?"}
            </div>
          )}
          <span className="text-xs text-slate-300">{podcast.author || "Unknown"}</span>
        </div>
        <div>
          <h3 className={`line-clamp-1 text-sm font-semibold ${isActive ? "text-white" : "text-slate-100"}`}>{podcast.title}</h3>
          {podcast.description && (
            <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-slate-400">
              {podcast.description}
            </p>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span
            role="status"
            title="Release date"
            className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] ring-1 transition-colors ${
              isActive
                ? "bg-indigo-500/20 text-indigo-200 ring-indigo-400/40 hover:bg-indigo-500/30"
                : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M12 1a11 11 0 1011 11A11.012 11.012 0 0012 1zm0 20a9 9 0 119-9 9.01 9.01 0 01-9 9zm.5-14a1 1 0 00-1 1v4.586l-2.207 2.207a1 1 0 101.414 1.414l2.5-2.5A1 1 0 0013 13V8a1 1 0 00-1-1z" />
            </svg>
            <span>{formatRelative(podcast.date)}</span>
          </span>
          {podcast?.views && podcast?.views > 0 && (
          <span className="inline-flex items-center gap-1" title="Views">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/></svg>
            {/* <span>{formatViews(podcast.views)}</span> */}
            <span>{podcast.views}</span>
          </span>
        )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </button>
  );
};

export default PodcastTile;
