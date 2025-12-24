"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const BlogDesignPage = () => {
  const [content, setContent] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Design Your Blog</h1>
        <p className="text-lg text-gray-600 text-center">
          Create and customize your blog with ease. Add content, format text, and publish your ideas.
        </p>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload Banner Image</h2>
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            className="mb-4 border border-gray-300 rounded p-2 w-full max-w-md"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  setBannerImage(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {bannerImage && (
            <div className="relative w-full max-w-md">
              <img
                src={bannerImage}
                alt="Banner Preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => setBannerImage("")}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => document.querySelector('input[type=file]').click()}
                >
                  Replace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Blog Details</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Blog Title"
            className="border border-gray-300 rounded p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter Blog Description"
            className="border border-gray-300 rounded p-2 w-full h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

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