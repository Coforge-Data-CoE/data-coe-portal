"use client";
import { useState } from "react";
import { Tabs } from "antd";
import Image from "next/image";

const acceleratorData = {
  banner: "/banner-01.png", // Example banner
  overview: {
    text: "This accelerator helps you modernize your data workflows and leverage AI-driven automation for rapid transformation.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example video
  },
  technicalInfo: "Technical details and documentation about the accelerator will be shown here.",
};

// Dummy comments data
const initialComments = [
  { name: "Alice", comment: "This accelerator saved us weeks of work!" },
  { name: "Bob", comment: "Great integration with our cloud stack." },
];

export default function AcceleratorPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="min-h-screen  p-0 md:p-8">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 relative mb-8">
        <Image src={acceleratorData.banner} alt="Accelerator Banner" fill className="object-cover rounded-xl shadow-lg" />
        <div className="absolute inset-0 bg-black/30 rounded-xl" />
        <div className="absolute left-8 bottom-8 text-white text-2xl md:text-4xl font-bold drop-shadow-lg">Accelerator: {params.id}</div>
      </div>
      {/* Tabs */}
      <div className="rounded-xl shadow-lg p-6">
        <Tabs defaultActiveKey="overview" items={[
          {
            key: "overview",
            label: "Overview",
            children: (
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="md:w-1/2 text-white text-lg mb-6 md:mb-0">{acceleratorData.overview.text}</div>
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
              <div className="text-white text-lg">{acceleratorData.technicalInfo}</div>
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
                        <li key={idx} className="bg-slate-700/60 rounded-lg p-4">
                          <span className="font-bold text-[#f15840]">{c.name}</span>
                          <span className="text-white ml-2">{c.comment}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-2">Add a comment</h4>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="px-4 py-2 rounded bg-slate-900 text-white mb-2 w-full"
                  />
                  <textarea
                    placeholder="Your comment"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
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
        ]} />
      </div>
    </div>
  );
}
