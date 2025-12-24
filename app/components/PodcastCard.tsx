"use client";
import React, { useState, useRef, useEffect } from 'react';

export interface TranscriptSegment {
  time: number;
  text: string;
}

export interface Podcast {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  description: string;
  date: string;
  coverImage: string;
  audioUrl: string;
  transcript: TranscriptSegment[];
  views?: number;
}

export enum ViewMode {
  PLAYER = 'PLAYER',
  ADD_PODCAST = 'ADD_PODCAST'
}

export type AddMethod = 'RECORD' | 'UPLOAD';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeSegmentIndex = podcast.transcript.findIndex((seg: TranscriptSegment, idx: number) => {
    const nextSeg = podcast.transcript[idx + 1];
    return currentTime >= seg.time && (!nextSeg || currentTime < nextSeg.time);
  });

  useEffect(() => {
    const activeElement = transcriptRef.current?.children[activeSegmentIndex] as HTMLElement;
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSegmentIndex]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="relative group aspect-video overflow-hidden">
        <img 
          src={podcast.coverImage} 
          alt={podcast.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-top h-[400px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
          <div>
            <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1 block">Now Playing</span>
            <h2 className="text-3xl font-bold text-white leading-tight">{podcast.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              {podcast.authorAvatar ? (
                <img
                  src={podcast.authorAvatar}
                  alt={podcast.author}
                  className="w-7 h-7 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                  {podcast.author
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((s) => s[0]?.toUpperCase())
                    .join("") || "?"}
                </div>
              )}
              <p className="text-slate-300 font-medium">by {podcast.author}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value);
              }
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          />
        </div>

        <div className="flex items-center justify-center gap-8">
           <button className="text-slate-500 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" /></svg>
           </button>
           <button 
             onClick={togglePlay}
             className="w-16 h-16 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all active:scale-95"
           >
             {isPlaying ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                 <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
               </svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                 <path d="M8 5v14l11-7z" />
               </svg>
             )}
           </button>
           <button className="text-slate-500 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" /></svg>
           </button>
        </div>

        <div className="mt-4 flex-1">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Transcription Sync</h3>
          <div 
            ref={transcriptRef}
            className="h-[200px] overflow-y-auto space-y-4 pr-2 scroll-smooth bg-slate-950/50 rounded-xl p-4 border border-slate-800"
          >
            {podcast.transcript.length > 0 ? (
              podcast.transcript.map((seg: TranscriptSegment, idx: number) => (
                <p 
                  key={idx} 
                  className={`text-lg transition-all duration-300 ${idx === activeSegmentIndex ? 'text-indigo-400 font-semibold scale-100' : 'text-slate-600 scale-95 origin-left'}`}
                >
                  {seg.text}
                </p>
              ))
            ) : (
              <p className="text-slate-600 text-sm italic">No transcription available for this episode.</p>
            )}
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={podcast.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};