"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Blog = {
  title: string;
  content: string;
  image: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
  readTimeMinutes?: number;
};

const blogData: Record<string, Blog> = {
  "1": {
    title: "Data Governance Best Practices",
    content: `Data governance ensures that data is consistent, trustworthy, and doesn’t get misused. Explore strategies for effective governance.
      Data governance best practices are a set of proven approaches that successful data teams use to manage data as a strategic asset and scale their data governance efforts effectively.

They include:

Secure executive buy-in
Identify your vision by leading with your “why”
Embrace a product mindset
Develop frameworks and policies
Map roles and responsibilities
Ensure seamless data management and operations
Embed collaboration in daily workflows
Automate wherever possible
Invest in the right technology
Build habit loops for adoption
Foster a sustainable governance community
Build a culture of continuous monitoring and adaptation
      
      
      `,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsHlNSmjfuAbXtIGgmkzReujwxG9MMXNsPQ&s",
    author: "Team Data Cosmos",
    createdAt: "Dec 10, 2025",
    tags: ["Governance", "Compliance"],
    readTimeMinutes: 6,
  },
  "2": {
    title: "Data Migration Strategies",
    content:
      "Data migration involves transferring data between storage types, formats, or systems. Learn how to plan and execute migrations effectively.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5tgiJD9-M5zGgm67finctChlaKybTeZs31Q&s",
    author: "Jane Smith",
    createdAt: "Dec 12, 2025",
    tags: ["Migration", "Strategy"],
    readTimeMinutes: 5,
  },
  "3": {
    title: "The Importance of Data Quality",
    content:
      "High-quality data is essential for making informed business decisions. Understand the principles of data quality management.",
    image:
      "https://cdn.prod.website-files.com/64fef88ee8b22d3d21b715a2/65853ce39121c9cd00d066f0_What%20is%20Data%20Quality%20Control.webp",
    author: "Anil Kumar",
    createdAt: "Dec 14, 2025",
    tags: ["Data Quality", "Management"],
    readTimeMinutes: 4,
  },
  "4": {
    title: "Big Data Analytics",
    content:
      "Big data analytics examines large and varied data sets to uncover hidden patterns, correlations, and insights.",
    image:
      "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
    author: "Data COE Editorial",
    createdAt: "Dec 18, 2025",
    tags: ["Analytics", "Big Data"],
    readTimeMinutes: 7,
  },
  "5": {
    title: "Data Security in the Cloud",
    content:
      "Securing data in the cloud involves protecting it from unauthorized access and breaches. Learn best practices for cloud security.",
    image:
      "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
    author: "Priya Shah",
    createdAt: "Dec 20, 2025",
    tags: ["Security", "Cloud"],
    readTimeMinutes: 6,
  },
};

const BlogPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // const blog = blogData[params.id];
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const deriveParams = async () => {
      const { id } = await params;
      setBlog(blogData[id]);
    };
    deriveParams();
  }, [params]);

  if (blog === null) {
    return <div className="p-8 text-center">Blog not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-sm">
          <div className="w-full h-30 md:h-48 overflow-hidden">
            <img
              src={blog?.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-6 py-5">
            {Array.isArray(blog.tags) && (
              <div className="mb-3 flex flex-wrap gap-2">
                {blog.tags!.map((tag: any) => (
                  <Link
                    key={tag}
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              {blog.author ? `By ${blog.author}` : null}
              {blog.createdAt
                ? (blog.author ? " • " : "") + blog.createdAt
                : null}
              {typeof blog.readTimeMinutes === "number"
                ? ` • ${blog.readTimeMinutes} min read`
                : null}
            </p>
            <hr className="border-gray-200 mb-4" />
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed text-base md:text-lg">
                {blog.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
