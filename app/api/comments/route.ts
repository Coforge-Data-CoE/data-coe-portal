import { connectToDB } from "@/app/lib/mongodb";
import Comment from "@/app/models/comment";
import { NextRequest, NextResponse } from "next/server";

// GET: Return all comments from MongoDB
export async function GET(req: NextRequest) {
  await connectToDB();
  const accelerator = req.nextUrl.searchParams.get("accelerator");
  const comments = await Comment.find({ accelerator }).sort({ createdAt: -1 });
  return NextResponse.json({ comments });
}

// POST: Add a new comment to MongoDB
export async function POST(req: NextRequest) {
  await connectToDB();
  try {
    const { name, comment, createdAt, accelerator } = await req.json();
    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required." },
        { status: 400 }
      );
    }
    const newComment = await Comment.create({
      name,
      comment,
      createdAt,
      accelerator,
    });
    // Return updated list for this accelerator
    const comments = await Comment.find({ accelerator }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ comments });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
