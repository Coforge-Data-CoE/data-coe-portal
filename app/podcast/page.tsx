"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiUrl } from "../lib/constants";
import { Podcast as UIPodcast } from "../components/PodcastCard";
import { PodcastTile } from "../components/PodcastTile";
import { AudioPlayer } from "../components/AudioPlayer";

type DbPodcast = {
  _id: string;
  author?: { name?: string; avatar?: string };
  episode_name?: string;
  podcast_url?: string;
  createdAt?: string;
  description?: string;
  cover_image?: string;
};

const DEFAULT_COVER = "";

const PodcastPage = () => {
  const [podcasts, setPodcasts] = useState<UIPodcast[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [durations, setDurations] = useState<Record<string, number>>({});

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(apiUrl("/api/podcasts?release=true"), {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load podcasts");
        const data: DbPodcast[] = await res.json();
        const mapped: UIPodcast[] = (data || []).map((p) => ({
          id: (p as any)._id?.toString?.() || String(p._id),
          title: p.episode_name || "Untitled Episode",
          author: p.author?.name || "Unknown",
          authorAvatar: p.author?.avatar || "",
          coverImage: p.cover_image || p.author?.avatar || DEFAULT_COVER,
          audioUrl: p.podcast_url || "",
          description: p.description || "",
          date: p.createdAt || new Date().toISOString(),
          transcript: [],
          views: (p as any).views ?? 0,
        }));
        if (mounted) {
          setPodcasts(mapped);
          setCurrentIndex(0);
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Error loading podcasts");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Lazily load durations from audio metadata for list items
  useEffect(() => {
    let cancelled = false;
    podcasts.forEach((p) => {
      if (!p.audioUrl) return;
      if (durations[p.id] != null) return;
      try {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.src = p.audioUrl;
        const onLoaded = () => {
          if (!cancelled && isFinite(audio.duration) && audio.duration > 0) {
            setDurations((prev) => ({
              ...prev,
              [p.id]: Math.round(audio.duration),
            }));
          }
          cleanup();
        };
        const onError = () => {
          cleanup();
        };
        const cleanup = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.removeEventListener("error", onError);
        };
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("error", onError);
      } catch {}
    });
    return () => {
      cancelled = true;
    };
  }, [podcasts, durations]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentPodcast = useMemo(
    () => podcasts[currentIndex] || null,
    [podcasts, currentIndex]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-600">
        Loading podcasts…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-600">
        {error}
      </div>
    );
  }

  if (!currentPodcast) {
    return (
      <div className="flex flex-row h-screen bg-gray-200">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute top-4 right-6 z-20">
            <Link
              href="/podcast/new"
              className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Podcast
            </Link>
          </div>
          <div className="flex items-center justify-center h-[70vh] text-gray-600">
            No podcasts found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:pt-5">
        {/* Top section: details (left) + player (right) */}
        <div className="mb-4 grid grid-cols-1 gap-5 lg:grid-cols-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl lg:col-span-4">
            <div className="flex items-start gap-6">
              <div className="relative aspect-square w-full max-w-40 sm:max-w-56 md:max-w-64 lg:max-w-72 flex-none">
                <Image
                  src={currentPodcast.coverImage}
                  alt={currentPodcast.title}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, (min-width: 640px) 14rem, 10rem"
                  className="rounded-2xl object-cover border border-white/10"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 text-xl sm:text-2xl font-semibold text-white">
                  {currentPodcast.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  {durations[currentPodcast.id] != null && (
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-200">
                      {formatTime(durations[currentPodcast.id])}
                    </span>
                  )}
                  {currentPodcast.authorAvatar ? (
                    <img
                      src={currentPodcast.authorAvatar}
                      alt={currentPodcast.author}
                      className="h-5 w-5 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                      {(currentPodcast.author || "?")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((s) => s[0]?.toUpperCase())
                        .join("") || "?"}
                    </span>
                  )}
                  <span>by {currentPodcast.author}</span>
                </div>
                {currentPodcast.description && (
                  <div className="mt-3 max-h-64 md:max-h-72 overflow-y-auto pr-2">
                    <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-300">
                      {currentPodcast.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex fixed z-2">
              {podcasts.length > 0 && (
                <AudioPlayer
                  playlist={podcasts}
                  currentIndex={currentIndex}
                  onChangeIndex={setCurrentIndex}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Podcasts</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/podcast/new"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Add Podcast
            </Link>
            {currentPodcast && (
              <Link
                href={`/podcast/new?id=${currentPodcast.id}`}
                className="rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500"
              >
                Edit Current
              </Link>
            )}
          </div>
        </div>

        {/* Scrollable grid of episode cards */}
        <div className="max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {podcasts.map((p, idx) => (
              <PodcastTile
                key={p.id}
                podcast={p}
                isActive={idx === currentIndex}
                durationSec={durations[p.id]}
                onSelect={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;
