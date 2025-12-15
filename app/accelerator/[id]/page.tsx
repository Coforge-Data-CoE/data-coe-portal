"use client";
import { use, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Tabs, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { apiUrl } from "@/app/lib/constants";

import "react-quill-new/dist/quill.snow.css";

import "../../accelerators/accelerators.scss";
import TryOutButton from "@/app/toolkit/TryOutButton";

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

message.config({
  top: 80, // distance from top in px
  duration: 3, // seconds
  maxCount: 3,
});

export default function AcceleratorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: session } = useSession();

  const [accelerator, setAccelerator] = useState<any>({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Add comment via API
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/comments`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session?.user?.name,
          comment: newComment,
          createdAt: new Date(),
          accelerator: id,
        }),
      });
      const data = await res.json();
      setComments(data.comments); // assuming API returns updated comments
      setNewName("");
      setNewComment("");
      message.success("Comment added successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit comment handler
  const handleEditComment = async (commentId: string) => {
    // Call your API to update the comment
    try {
      const res = await fetch(apiUrl(`/api/comments?id=${commentId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: editText }),
      });
      if (res.ok) {
        // Refresh comments
        const data = await res.json();
        setComments(data.comments);
        setEditingIdx(null);
        setEditText("");
        message.success("Comment updated successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId: string) => {
    try {
      Modal.confirm({
        title: "Delete Comment",
        content: "Are you sure you want to delete?",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: async () => {
          try {
            const res = await fetch(apiUrl(`/api/comments?id=${commentId}`), {
              method: "DELETE",
            });
            if (res.ok) {
              const data = await res.json();
              setComments(data.comments);
              message.success("Comment deleted successfully!");
            }
          } catch (err) {
            console.error(err);
          }
        },
      });
    } catch (err) {
      console.error(err);
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

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(apiUrl(`/api/comments?accelerator=${id}`));
        const data = await res.json();
        setComments(data.comments || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchComments();
  }, [id]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Banner */}
      <div className="w-full xs:h-auto sm:h-64 md:h-80 relative mb-6 md:mb-8">
        <Image
          src={accelerator?.imageUrl || acceleratorData?.banner}
          alt="Accelerator Banner"
          fill
          className="object-cover rounded-xl shadow-lg z-1"
        />
        <div className="absolute inset-0 bg-[#020925]/90 rounded-xl" />
        <div className="inset-0 px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
          {accelerator?.iconUrl && (
            <Image
              src={accelerator?.iconUrl}
              alt="Icon"
              height={75}
              width={300}
              className="z-2 w-auto xs:h-10"
            />
          )}
          <div className="flex flex-col md:ml-2 lg:ml-4 mt-1 md:mt-0 max-w-full">
            <div className="text-white text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg z-2 leading-snug">
              {accelerator?.name ?? ""}
            </div>
            <div className="z-2 text-white text-sm sm:text-base md:text-lg font-medium drop-shadow-lg mt-2 mb-2 w-full md:w-3/5 break-words">
              {accelerator?.description ?? "Please wait..."}
            </div>
            {accelerator.dockerProjectName && accelerator.dockerProjectName.trim() !== "" && (
              <div className="flex items-center mt-2 md:mt-3">
                <TryOutButton
                  toolkitDockerProjectId={accelerator.dockerProjectName}
                  toolkitName={accelerator.name}
                  className="px-4 md:px-6 rounded bg-[#f15840] hover:bg-[#d94c2f] text-white text-sm md:text-base font-semibold transition h-9 md:h-10 flex items-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6">
        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
                  <div className="w-full md:w-3/5 text-base md:text-lg mb-4 md:mb-0">
                    <div className="editor-flex quill-readonly no-border w-full">
                      <ReactQuill
                        theme="snow"
                        value={accelerator?.summary || ""}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/5 flex justify-center">
                    {/* <iframe
                      width="100%"
                      height="315"
                      src={
                        accelerator?.videoUrl || acceleratorData.overview.video
                      }
                      title="Accelerator Overview Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-lg w-full h-[200px] md:h-[315px]"
                    ></iframe> */}
                  </div>
                </div>
              ),
            },
            // {
            //   key: "tech",
            //   label: "Technical Info",
            //   children: (
            //     <div className="text-lg">{acceleratorData.technicalInfo}</div>
            //   ),
            // },
            {
              key: "comments",
              label: "Comments",
              children: (
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="mb-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-300">No comments yet.</p>
                    ) : (
                      <ul className="space-y-3 sm:space-y-4">
                        {comments.map((c: any, idx) => (
                          <li
                            key={idx}
                            className="bg-gray-100 rounded-lg p-4 flex flex-col md:flex-row gap-3 md:gap-4 justify-between break-words"
                          >
                            <div className="flex flex-col sm:flex-row flex-1 items-start">
                              <span className="font-bold text-[#f15840] whitespace-pre-wrap break-words">
                                {c?.name}&nbsp;
                              </span>
                              <span className="flex flex-1 text-[#020925] sm:ml-2 font-semibold whitespace-pre-wrap break-words">
                                {editingIdx === idx ? (
                                  <div className="flex flex-col flex-1 md:mr-5 w-full">
                                    <textarea
                                      placeholder="Edit comment"
                                      value={editText}
                                      onChange={(e) =>
                                        setEditText(e.target.value)
                                      }
                                      className="w-full px-3 py-2 rounded bg-gray-50 text-[#020925] mb-2 border border-gray-300"
                                      rows={3}
                                    />
                                    <div className="flex justify-start">
                                      <button
                                        className="ml-0 md:ml-2 text-blue-600 border border-blue-600 rounded px-2 py-1"
                                        onClick={() => handleEditComment(c._id)}
                                      >
                                        Save
                                      </button>
                                      <button
                                        className="ml-2 text-gray-600 border border-gray-600 rounded px-2 py-1"
                                        onClick={() => {
                                          setEditingIdx(null);
                                          setEditText(c.comment);
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  c?.comment
                                )}
                                &nbsp;
                              </span>
                            </div>
                            <div className="flex items-start gap-2 md:gap-3">
                              <span className="text-xs sm:text-sm text-gray-600">
                                {new Date(c.createdAt).toLocaleString()}
                              </span>
                              {session?.user?.name === c?.name && (
                                <>
                                  <EditOutlined
                                    className="ml-2 cursor-pointer text-md text-blue-600 border border-blue-600 rounded"
                                    style={{
                                      color: "#155dfc",
                                      fontSize: "1.25rem",
                                    }}
                                    onClick={() => {
                                      setEditingIdx(idx);
                                      setEditText(c.comment);
                                    }}
                                  />
                                  <DeleteOutlined
                                    className="ml-2 cursor-pointer text-lg text-red-600"
                                    onClick={() => handleDeleteComment(c._id)}
                                    style={{
                                      color: "#e7000b",
                                      fontSize: "1.25rem",
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <h4 className="text-white font-semibold mb-2">
                      Add a comment
                    </h4>
                    <textarea
                      placeholder="Your comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="px-3 py-2 rounded bg-gray-50 text-[#020925] mb-2 w-full border border-gray-300"
                      rows={3}
                    />
                    <button
                      className="px-3 py-2 rounded bg-[#f15840] text-white font-semibold shadow hover:bg-[#d94c2f] transition cursor-pointer"
                      onClick={handleAddComment}
                    >
                      <PlusOutlined className="mr-2" />
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
