"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Podcast } from "./PodcastCard";

export interface AudioPlayerProps {
  playlist: Podcast[];
  currentIndex: number;
  onChangeIndex: (nextIndex: number) => void;
  compact?: boolean;
  onViewsIncrement?: (podcastId: string) => void;
}

const formatTime = (time: number) => {
  if (!isFinite(time) || time < 0) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  playlist,
  currentIndex,
  onChangeIndex,
  compact = false,
  onViewsIncrement,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(1);

  const track = playlist[currentIndex];

  // Set initial collapsed state on small screens and watch scroll for stronger shadow
  useEffect(() => {
    const init = () => {
      try {
        if (window.innerWidth < 640) setCollapsed(true);
        // Restore persisted volume and mute state
        const v = localStorage.getItem("dcPlayerVolume");
        if (v != null && v !== "") {
          const parsed = Math.min(1, Math.max(0, parseFloat(v)));
          if (!Number.isNaN(parsed)) setVolume(parsed);
        }
        const m = localStorage.getItem("dcPlayerMuted");
        if (m === "true") setMuted(true);
      } catch {}
    };
    init();
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Reset on track change
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      // Force re-load by resetting src
      audioRef.current.src = track?.audioUrl || "";
      // Ensure volume is applied on new track
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
      // Autoplay when selection changes
      const play = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch {
          // ignore autoplay failures
        }
      };
      // slight delay to ensure metadata pipeline
      setTimeout(play, 50);
    }
  }, [currentIndex, track?.audioUrl]);

  // Apply volume changes to the audio element and persist
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, Math.max(0, volume));
    }
    try { localStorage.setItem("dcPlayerVolume", String(volume)); } catch {}
  }, [volume]);

  // Apply mute changes and persist
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
    try { localStorage.setItem("dcPlayerMuted", muted ? "true" : "false"); } catch {}
  }, [muted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        // Increment views in DB
        if (track?.id) {
          fetch(`/api/podcasts/${track.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ incrementViews: true })
          })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
              if (data && typeof onViewsIncrement === "function") {
                onViewsIncrement(track.id);
              }
            })
            .catch(() => {});
        }
      } catch {}
    }
  };

  const onPrev = () => {
    if (!playlist.length) return;
    const next = (currentIndex - 1 + playlist.length) % playlist.length;
    onChangeIndex(next);
  };

  const onNext = () => {
    if (!playlist.length) return;
    const next = (currentIndex + 1) % playlist.length;
    onChangeIndex(next);
  };

  return (
    <div className="flex w-full">
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl ${
          scrolled
            ? "bg-slate-900/90 shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
            : "bg-slate-900/80 shadow-2xl"
        }`}
      >
        <div className={`flex ${compact ? "gap-3 p-2 sm:p-3" : "gap-4 p-3 sm:p-4"} flex-col`}>
          {/* Cover */}
          {/* {!collapsed && (
            <div className="h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-xl border border-white/10">
              {track?.coverImage && (
                <img src={track.coverImage} alt={track?.title || ""} className="h-full w-full object-cover" />
              )}
            </div>
          )} */}

          {/* Meta + scrubber */}
          <div className="min-w-0 w-full">
            <div className="flex items-center gap-2">
              <h3 className={compact ? "text-sm font-semibold text-white sm:text-base" : "text-base font-semibold text-white sm:text-lg"}>
                {track?.title || "No Selection"}
              </h3>
              {track?.author && (
                <span className="hidden sm:inline truncate text-xs text-slate-300">
                  by {track.author}
                </span>
              )}
            </div>

            {/* {!collapsed && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs tabular-nums text-slate-400">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = parseFloat(e.target.value);
                    }
                  }}
                  className="w-full accent-indigo-500"
                />
                <span className="text-xs tabular-nums text-slate-400">{formatTime(duration)}</span>
              </div>
            )} */}
          </div>

          {/* Controls */}
          <div className={`flex items-center ${compact ? "gap-2" : "gap-2 sm:gap-3"}`}>
            <button
              onClick={onPrev}
              className={compact ? "rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white" : "rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"}
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={compact ? "h-4 w-4" : "h-6 w-6"}
              >
                <path d="M6 5h2v14H6zM20 6v12l-8-6z" />
              </svg>
            </button>
            <button
              onClick={togglePlay}
              className={compact ? "rounded-full bg-white p-1.5 text-slate-950 shadow-md" : "rounded-full bg-white p-3 text-slate-950 shadow-md transition hover:scale-105 active:scale-95"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={compact ? "h-5 w-5" : "h-7 w-7"}
                >
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={compact ? "h-5 w-5" : "h-7 w-7"}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              onClick={onNext}
              className={compact ? "rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white" : "rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"}
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={compact ? "h-4 w-4" : "h-6 w-6"}
              >
                <path d="M18 19h-2V5h2zM4 6v12l8-6z" />
              </svg>
            </button>

            {/* Volume control */}
            <div className="ml-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (muted || volume === 0) {
                    setMuted(false);
                    setVolume(lastVolume > 0 ? lastVolume : 1);
                  } else {
                    setLastVolume(volume > 0 ? volume : 1);
                    setMuted(true);
                    setVolume(0);
                  }
                }}
                aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
                title={muted || volume === 0 ? "Unmute" : "Mute"}
                className="rounded p-1 text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {(muted || volume === 0) ? (
                  // Volume off icon
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M16.5 12a4.5 4.5 0 01-1.53 3.39l1.41 1.41A6.5 6.5 0 0018.5 12a6.5 6.5 0 00-2.12-4.8l-1.41 1.41A4.5 4.5 0 0116.5 12z"/><path d="M3 10v4h4l5 5V5L7 10H3z"/></svg>
                ) : (
                  // Volume on icon
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M3 10v4h4l5 5V5L7 10H3z"/><path d="M16.5 12a4.5 4.5 0 00-4.5-4.5v9a4.5 4.5 0 004.5-4.5z"/></svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className={compact ? "w-16 sm:w-20 accent-indigo-500" : "w-20 sm:w-24 accent-indigo-500"}
              />
            </div>
            {/* <button
              onClick={() => setCollapsed((c) => !c)}
              className="ml-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label={collapsed ? "Show Seek Track" : "Hide Seek Track"}
              title={collapsed ? "Show Seek Track" : "Hide Seek Track"}
            >
              <span className="hidden text-xs sm:inline">{collapsed ? "Show Seek Track" : "Hide Seek Track"}</span>
              {collapsed ? (
                // Down chevron for expand
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
              ) : (
                // Up chevron for collapse
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
              )}
            </button> */}
          </div>
        </div>

        {/* Thin progress bar across the bottom */}
        {/* <div className="px-4 pb-2">
          <div className={`${collapsed ? "h-1" : "h-1.5"} w-full overflow-hidden rounded bg-white/10`} aria-hidden>
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${duration ? Math.min(100, (currentTime / duration) * 100) : 0}%` }}
            />
          </div>
        </div> */}
        <div className={compact ? "px-3 pb-1" : "px-4 pb-2"}>
          <div className={compact ? "mt-1 flex items-center gap-2" : "mt-2 flex items-center gap-3"}>
            <span className="text-xs tabular-nums text-slate-400">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = parseFloat(e.target.value);
                }
              }}
              className="w-full accent-indigo-500"
            />
            <span className="text-xs tabular-nums text-slate-400">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={track?.audioUrl || ""}
          preload="metadata"
          onTimeUpdate={() =>
            setCurrentTime(audioRef.current?.currentTime || 0)
          }
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={onNext}
        />
      </div>
      {/* Soft gradient below the player for contrast while scrolling */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-full -z-10 h-10 w-[min(100%-1rem,1100px)] -translate-x-1/2 bg-gradient-to-b ${
          scrolled ? "from-black/60" : "from-black/40"
        } to-transparent`}
      />
    </div>
  );
};

export default AudioPlayer;
