"use client";
import React, { useEffect, useState } from "react";
import { PodcastCard, Podcast as UIPodcast } from "../components/PodcastCard";
import Link from "next/link";
import { apiUrl } from "../lib/constants";

type DbPodcast = {
  _id: string;
  author?: { name?: string; avatar?: string };
  episode_name?: string;
  podcast_url?: string;
  createdAt?: string;
  description?: string;
  cover_image?: string;
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop";

const PodcastPage = () => {
  const [podcasts, setPodcasts] = useState<UIPodcast[]>([]);
  const [currentPodcast, setCurrentPodcast] = useState<UIPodcast | null>(null);
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
        }));
        if (mounted) {
          setPodcasts(mapped);
          setCurrentPodcast(mapped[0] || null);
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
            setDurations((prev) => ({ ...prev, [p.id]: Math.round(audio.duration) }));
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
    <div className="flex flex-row h-screen bg-gray-100">
      {/* Page Title */}
      {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Podcast</h1> */}
      {/* Main Podcast Player */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute top-4 right-6 z-20 flex gap-2">
          <Link
            href="/podcast/new"
            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Podcast
          </Link>
          {currentPodcast && (
            <Link
              href={`/podcast/new?id=${currentPodcast.id}`}
              className="px-3 py-2 text-sm rounded-md bg-amber-600 text-white hover:bg-amber-700"
            >
              Edit
            </Link>
          )}
        </div>
        <div className="w-3/5 bg-white p-8 rounded-lg shadow-lg">
          {/* <img
            src={currentPodcast.coverImage}
            alt={currentPodcast.title}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          /> */}
          <div className="">
            <PodcastCard podcast={currentPodcast} />
          </div>
        </div>
      </div>

      {/* Other Podcasts Panel */}
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">
          Other Podcasts
        </h2>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              onClick={() => setCurrentPodcast(podcast)}
              className={`bg-white p-4 rounded-lg flex items-center gap-4 hover:bg-gray-100 transition cursor-pointer ${
                podcast.id === currentPodcast.id
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <img
                src={podcast.coverImage}
                alt={podcast.title}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h3 className="text-gray-800 font-medium">{podcast.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-gray-600 text-sm">
                  {podcast.authorAvatar ? (
                    <img
                      src={podcast.authorAvatar}
                      alt={podcast.author}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-[10px] font-semibold">
                      {(podcast.author || "?")
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((s) => s[0]?.toUpperCase())
                        .join("") || "?"}
                    </span>
                  )}
                  <span>{podcast.author}</span>
                  {durations[podcast.id] != null && (
                    <span className="ml-2 text-gray-500">· {formatTime(durations[podcast.id])}</span>
                  )}
                </div>
                
                {podcast.description && (
                  <p className="text-gray-500 text-xs mt-1">
                    {podcast.description.length > 100
                      ? podcast.description.slice(0, 100) + "…"
                      : podcast.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;
