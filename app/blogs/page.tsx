"use client";

import React from "react";
import Link from "next/link";

const blogData = {
	"1": {
		title: "Data Governance Best Practices",
		description:
			"Data governance ensures that data is consistent, trustworthy, and doesn’t get misused. Explore strategies for effective governance.",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsHlNSmjfuAbXtIGgmkzReujwxG9MMXNsPQ&s",
		author: "Team Data Cosmos",
		createdAt: "Dec 10, 2025",
		tags: ["Governance", "Compliance"],
		readTimeMinutes: 6,
	},
	"2": {
		title: "Data Migration Strategies",
		description:
			"Data migration involves transferring data between storage types, formats, or systems. Learn how to plan and execute migrations effectively.",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5tgiJD9-M5zGgm67finctChlaKybTeZs31Q&s",
		author: "Jane Smith",
		createdAt: "Dec 12, 2025",
		tags: ["Migration", "Strategy"],
		readTimeMinutes: 5,
	},
	"3": {
		title: "The Importance of Data Quality",
		description:
			"High-quality data is essential for making informed business decisions. Understand the principles of data quality management.",
		image: "https://cdn.prod.website-files.com/64fef88ee8b22d3d21b715a2/65853ce39121c9cd00d066f0_What%20is%20Data%20Quality%20Control.webp",
		author: "Anil Kumar",
		createdAt: "Dec 14, 2025",
		tags: ["Data Quality", "Management"],
		readTimeMinutes: 4,
	},
	"4": {
		title: "Big Data Analytics",
		description:
			"Big data analytics examines large and varied data sets to uncover hidden patterns, correlations, and insights.",
		image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
		author: "Data COE Editorial",
		createdAt: "Dec 18, 2025",
		tags: ["Analytics", "Big Data"],
		readTimeMinutes: 7,
	},
	"5": {
		title: "Data Security in the Cloud",
		description:
			"Securing data in the cloud involves protecting it from unauthorized access and breaches. Learn best practices for cloud security.",
		image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
		author: "Priya Shah",
		createdAt: "Dec 20, 2025",
		tags: ["Security", "Cloud"],
		readTimeMinutes: 6,
	},
};

const blogs = Object.entries(blogData).map(([id, blog]) => ({ id, ...blog }));

const BlogsPage = () => {
	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<div className="relative bg-gray-900 text-white py-6 mb-8">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-50"
					style={{
						backgroundImage:
							"url('https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2023/07/632-01.jpg?resize=1000%2C750&ssl=1')",
					}}
				></div>
				<div className="relative z-10 text-center">
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Data Cosmos Blogs
					</h1>
					<p className="text-lg text-gray-300">
						Dive into the world of data governance, migration, analytics, and
						more.
					</p>
				</div>
			</div>

			<div className="space-y-6">
				{blogs.map((blog) => (
					<article
						key={blog.id}
						className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4"
					>
						<div className="flex flex-col md:flex-row gap-6">
							<div className="md:w-64 w-full shrink-0">
								<img
									src={(blog as any).image}
									alt={(blog as any).title}
									className="w-full h-40 md:h-36 object-cover rounded-md"
								/>
							</div>
							<div className="flex-1">
								{Array.isArray((blog as any).tags) && (
									<div className="mb-2 flex flex-wrap gap-2">
										{((blog as any).tags as string[]).map((tag) => (
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
								<h2 className="text-2xl font-semibold mb-1">
									<Link
										href={`/blogs/${blog.id}`}
										className="text-blue-600 hover:underline"
									>
										{(blog as any).title}
									</Link>
								</h2>
								<p className="text-sm text-gray-500 mb-3">
									By {(blog as any).author} • {(blog as any).createdAt}
									{typeof (blog as any).readTimeMinutes === "number" && (
										<span> • {(blog as any).readTimeMinutes} min read</span>
									)}
								</p>
								<p className="text-gray-700 mb-3">{(blog as any).description}</p>
								<Link
									href={`/blogs/${blog.id}`}
									className="text-blue-600 hover:text-blue-700 font-medium"
								>
									Read more →
								</Link>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
};

export default BlogsPage;