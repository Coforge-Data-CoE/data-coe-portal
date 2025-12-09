"use client";
import { use, useState, useEffect } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import dynamic from "next/dynamic";
import { apiUrl } from "@/app/lib/constants";

import "react-quill-new/dist/quill.snow.css";

import "../../accelerators/accelerators.scss";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const acceleratorData = {
  banner: "/banner-01.png", // Example banner
  overview: {
    text: "This accelerator helps you modernize your data workflows and leverage AI-driven automation for rapid transformation.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video
  },
  technicalInfo:
    "Technical details and documentation about the accelerator will be shown here.",
};

// Dummy comments data
const initialComments = [
  { name: "Alice", comment: "This accelerator saved us weeks of work!" },
  { name: "Bob", comment: "Great integration with our cloud stack." },
];

export default function AcceleratorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [accelerator, setAccelerator] = useState<any>({});

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");

  const handleAddComment = () => {
    if (newName.trim() && newComment.trim()) {
      setComments([...comments, { name: newName, comment: newComment }]);
      setNewComment("");
      setNewName("");
    }
  };

  // Fetch accelerator after params are resolved
  useEffect(() => {
    async function fetchAccelerator() {
      try {
        const res = await fetch(apiUrl(`/api/accelerator/${id}`));
        const data = await res.json();
        setAccelerator(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAccelerator();
  }, [id]);

  return (
    <div className="min-h-screen  p-0 md:p-8">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 relative mb-8">
        <Image
          src={accelerator?.imageUrl || acceleratorData?.banner}
          alt="Accelerator Banner"
          fill
          className="object-cover rounded-xl shadow-lg"
        />
        {accelerator?.iconUrl && (
          <Image
            src={accelerator?.iconUrl}
            alt="Icon"
            height={75}
            width={300}
            className="absolute top-10 left-8 z-2"
          />
        )}
        <div className="absolute inset-0 bg-[#020925] rounded-xl" />
        <div className="absolute left-8 bottom-20 text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
          {accelerator?.name ?? ""}
        </div>
        <div className="absolute left-8 bottom-10 text-white text-medium md:text-large font-semibold drop-shadow-lg">
          {accelerator?.description ?? "This is Description"}
        </div>
      </div>
      {/* Tabs */}
      <div className="rounded-xl shadow-lg p-6">
        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="md:w-1/2 text-lg mb-6 md:mb-0">
                    <div className="editor-flex quill-readonly no-border">
                      <ReactQuill
                        theme="snow"
                        value={accelerator?.summary || ""}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-center">
                    <iframe
                      width="100%"
                      height="315"
                      src={acceleratorData.overview.video}
                      title="Accelerator Overview Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-lg w-full h-[200px] md:h-[315px]"
                    ></iframe>
                  </div>
                </div>
              ),
            },
            {
              key: "tech",
              label: "Technical Info",
              children: (
                <div className="text-lg">{acceleratorData.technicalInfo}</div>
              ),
            },
            {
              key: "comments",
              label: "Comments",
              children: (
                <div className="flex flex-col gap-6">
                  <div className="mb-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-300">No comments yet.</p>
                    ) : (
                      <ul className="space-y-4">
                        {comments.map((c, idx) => (
                          <li
                            key={idx}
                            className="bg-slate-700/60 rounded-lg p-4"
                          >
                            <span className="font-bold text-[#f15840]">
                              {c.name}
                            </span>
                            <span className="text-white ml-2">{c.comment}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-2">
                      Add a comment
                    </h4>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-4 py-2 rounded bg-slate-900 text-white mb-2 w-full"
                    />
                    <textarea
                      placeholder="Your comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="px-4 py-2 rounded bg-slate-900 text-white mb-2 w-full"
                      rows={3}
                    />
                    <button
                      className="px-6 py-2 rounded bg-[#f15840] text-white font-semibold shadow hover:bg-[#d94c2f] transition"
                      onClick={handleAddComment}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
