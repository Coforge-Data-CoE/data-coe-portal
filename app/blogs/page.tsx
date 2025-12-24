"use client";

import React from "react";
import Link from "next/link";

const blogData = {
	"1": {
		title: "Data Governance Best Practices",
		description:
			"Data governance ensures that data is consistent, trustworthy, and doesn’t get misused. Explore strategies for effective governance.",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsHlNSmjfuAbXtIGgmkzReujwxG9MMXNsPQ&s",
	},
	"2": {
		title: "Data Migration Strategies",
		description:
			"Data migration involves transferring data between storage types, formats, or systems. Learn how to plan and execute migrations effectively.",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5tgiJD9-M5zGgm67finctChlaKybTeZs31Q&s",
	},
	"3": {
		title: "The Importance of Data Quality",
		description:
			"High-quality data is essential for making informed business decisions. Understand the principles of data quality management.",
		image: "https://cdn.prod.website-files.com/64fef88ee8b22d3d21b715a2/65853ce39121c9cd00d066f0_What%20is%20Data%20Quality%20Control.webp",
	},
	"4": {
		title: "Big Data Analytics",
		description:
			"Big data analytics examines large and varied data sets to uncover hidden patterns, correlations, and insights.",
		image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
	},
	"5": {
		title: "Data Security in the Cloud",
		description:
			"Securing data in the cloud involves protecting it from unauthorized access and breaches. Learn best practices for cloud security.",
		image: "https://s44885.pcdn.co/wp-content/uploads/2019/09/Fotolia_257957753_Subscription_Monthly_M.jpg",
	},
};

const blogs = Object.entries(blogData).map(([id, blog]) => ({ id, ...blog }));

const BlogsPage = () => {
	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<div className="relative bg-gray-900 text-white py-16 mb-12">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-50"
					style={{
						backgroundImage:
							"url('https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2023/07/632-01.jpg?resize=1000%2C750&ssl=1')",
					}}
				></div>
				<div className="relative z-10 text-center">
					<h1 className="text-5xl font-bold mb-4">
						Welcome to Data Cosmos Blogs
					</h1>
					<p className="text-lg text-gray-300">
						Dive into the world of data governance, migration, analytics, and
						more.
					</p>
				</div>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogs.map((blog) => (
					<div
						key={blog.id}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						<img
							src={blog.image}
							alt={blog.title}
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
							<p className="text-gray-600 mb-4">{blog.description}</p>
							<Link
								href={`/blogs/${blog.id}`}
								className="text-blue-500 hover:underline"
							>
								Read More
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogsPage;