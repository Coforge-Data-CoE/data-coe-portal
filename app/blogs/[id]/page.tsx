"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Blog = {
  title: string;
  content: string;
  image: string;
};

const blogData: Record<string, Blog> = {
  "1": {
    title: "Data Governance Best Practices",
    content:
      "Data governance ensures that data is consistent, trustworthy, and doesn’t get misused. Explore strategies for effective governance.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsHlNSmjfuAbXtIGgmkzReujwxG9MMXNsPQ&s",
  },
  "2": {
    title: "Data Migration Strategies",
    content:
      "Data migration involves transferring data between storage types, formats, or systems. Learn how to plan and execute migrations effectively.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5tgiJD9-M5zGgm67finctChlaKybTeZs31Q&s",
  },
  "3": {
    title: "The Importance of Data Quality",
    content:
      "High-quality data is essential for making informed business decisions. Understand the principles of data quality management.",
    image: "https://cdn.prod.website-files.com/64fef88ee8b22d3d21b715a2/65853ce39121c9cd00d066f0_What%20is%20Data%20Quality%20Control.webp",
  },
  "4": {
    title: "Big Data Analytics",
    content:
      "Big data analytics examines large and varied data sets to uncover hidden patterns, correlations, and insights.",
    image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
  },
  "5": {
    title: "Data Security in the Cloud",
    content:
      "Securing data in the cloud involves protecting it from unauthorized access and breaches. Learn best practices for cloud security.",
    image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
  },
};

const BlogPage = () => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  if (!id) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const blog = blogData[id];

  if (!blog) {
    return <div className="p-8 text-center">Blog not found.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;