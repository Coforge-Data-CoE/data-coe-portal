"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { apiUrl } from "@/app/lib/constants";
import {
  PodcastCard,
  Podcast as UIPodcast,
} from "@/app/components/PodcastCard";

const NewPodcastPage = () => {
  const router = useRouter();
  const [episodeName, setEpisodeName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<UIPodcast | null>(null);
  const [drafts, setDrafts] = useState<UIPodcast[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState<
    (UIPodcast & { _id?: string }) | null
  >(null);
  const searchParams = useSearchParams();
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadDrafts() {
      try {
        setLoadingDrafts(true);
        const res = await fetch(apiUrl("/api/podcasts?release=false"), {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load drafts");
        const data = await res.json();
        const mapped: UIPodcast[] = (data || []).map((p: any) => ({
          id: p?._id?.toString?.() || String(p._id),
          title: p.episode_name || "Untitled Episode",
          author: p.author?.name || "Unknown",
          authorAvatar: p.author?.avatar || "",
          description: p.description || "",
          date: p.createdAt || new Date().toISOString(),
          coverImage: p.cover_image || p.author?.avatar || "",
          audioUrl: p.podcast_url || "",
          transcript: [],
        }));
        if (mounted) setDrafts(mapped);
      } catch (e) {
        // ignore for now
      } finally {
        if (mounted) setLoadingDrafts(false);
      }
    }
    loadDrafts();
    return () => {
      mounted = false;
    };
  }, []);

  // If id is provided in query, load that podcast and prefill for editing
  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) return;
    let mounted = true;
    async function loadById() {
      try {
        setEditLoading(true);
        setEditError(null);
        const res = await fetch(apiUrl(`/api/podcasts/${id}`), {
          cache: "no-store",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || "Failed to load podcast for editing");
        }
        const p = await res.json();
        const ui: UIPodcast = {
          id: p?._id?.toString?.() || String(p._id),
          title: p.episode_name || "Untitled Episode",
          author: p.author?.name || "Unknown",
          authorAvatar: p.author?.avatar || "",
          description: p.description || "",
          date: p.createdAt || new Date().toISOString(),
          coverImage: p.cover_image || p.author?.avatar || "",
          audioUrl: p.podcast_url || "",
          transcript: [],
        };
        if (mounted) {
          setSelectedDraft(ui);
          setEpisodeName(ui.title);
          setDescription(ui.description);
          setAuthorName(ui.author);
          setAudioFile(null);
          setCoverFile(null);
          setPreview({ ...ui });
        }
      } catch (e: any) {
        if (mounted) setEditError(e?.message || "Unable to load podcast");
      } finally {
        if (mounted) setEditLoading(false);
      }
    }
    loadById();
    return () => {
      // no-op
    };
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent, releaseFlag: boolean) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("episode_name", episodeName);
      fd.append("description", description);
      fd.append("release", String(releaseFlag));
      if (authorName) fd.append("author_name", authorName);
      if (audioFile) fd.append("audio", audioFile, audioFile.name);
      else if (selectedDraft?.audioUrl)
        fd.append("podcast_url", selectedDraft.audioUrl);
      if (coverFile) fd.append("cover", coverFile, coverFile.name);
      else if (selectedDraft?.coverImage)
        fd.append("cover_image", selectedDraft.coverImage);

      const url = selectedDraft
        ? apiUrl(`/api/podcasts/${selectedDraft.id}`)
        : apiUrl("/api/podcasts");
      const method = selectedDraft ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to create podcast");
      }
      router.push("/podcast");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function doPreview() {
    const coverUrl = coverFile
      ? URL.createObjectURL(coverFile)
      : selectedDraft?.coverImage || "";
    const audioUrl = audioFile
      ? URL.createObjectURL(audioFile)
      : selectedDraft?.audioUrl || "";
    const ui: UIPodcast = {
      id: "preview",
      title: episodeName || "Untitled Episode",
      author: authorName || "You",
      authorAvatar: undefined,
      description,
      date: new Date().toISOString(),
      coverImage: coverUrl || "",
      audioUrl,
      transcript: [],
    };
    setPreview(ui);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Podcast
          </h1>
          {editLoading && (
            <div className="mb-3 text-sm text-gray-600">
              Loading podcast for editing…
            </div>
          )}
          {editError && (
            <div className="mb-3 text-sm text-red-600">{editError}</div>
          )}
          <form onSubmit={(e) => onSubmit(e, false)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Episode Name *
              </label>
              <input
                type="text"
                value={episodeName}
                onChange={(e) => setEpisodeName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Data Trends — Ep. 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Short description of the episode"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio File *
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {selectedDraft?.audioUrl && !audioFile && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-block px-2 py-1 bg-gray-100 rounded">
                    Using draft audio
                  </span>
                  <a
                    href={selectedDraft.audioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Open
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {selectedDraft?.coverImage && !coverFile && (
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                  <span className="inline-block px-2 py-1 bg-gray-100 rounded">
                    Using draft cover
                  </span>
                  <a
                    href={selectedDraft.coverImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Open
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Jane Doe"
              />
            </div>
            {/* Author avatar is taken from logged-in user automatically */}

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
                title="Save as draft"
              >
                {submitting
                  ? selectedDraft
                    ? "Updating…"
                    : "Saving…"
                  : selectedDraft
                  ? "Update Draft"
                  : "Save Draft"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={(e) => onSubmit(e as any, true)}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                title="Release now"
              >
                {submitting
                  ? "Releasing…"
                  : selectedDraft
                  ? "Release Changes"
                  : "Release"}
              </button>
              <button
                type="button"
                onClick={doPreview}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => router.push("/podcast")}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
          {preview && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Preview
              </h2>
              <PodcastCard podcast={preview} />
            </div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl shadow p-6 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Saved Drafts
            </h2>
            {loadingDrafts ? (
              <p className="text-gray-500 text-sm">Loading drafts…</p>
            ) : drafts.length === 0 ? (
              <p className="text-gray-500 text-sm">No drafts found.</p>
            ) : (
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {drafts.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDraft(d);
                      setEpisodeName(d.title);
                      setDescription(d.description);
                      setAuthorName(d.author);

                      setAudioFile(null);
                      setCoverFile(null);
                      setPreview({ ...d });
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 ${
                      selectedDraft?.id === d.id
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={
                        d.coverImage ||
                        d.authorAvatar ||
                        "https://placehold.co/48x48"
                      }
                      alt={d.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-800 line-clamp-1">
                        {d.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {d.author}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPodcastPage;
