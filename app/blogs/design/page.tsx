"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const BlogDesignPage = () => {
  const [content, setContent] = useState("");

  const handleSaveDraft = () => {
    console.log("Draft saved:", content);
    alert("Blog saved as draft!");
  };

  const handleRelease = () => {
    console.log("Blog released:", content);
    alert("Blog released successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Design Your Blog</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          className="h-64 mb-6"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Save as Draft
          </button>
          <button
            onClick={handleRelease}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Release
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDesignPage;