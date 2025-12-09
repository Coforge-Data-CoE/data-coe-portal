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

// PUT: Edit a comment by _id
export async function PUT(req: NextRequest) {
  await connectToDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");
    const { comment } = await req.json();
    if (!_id || !comment) {
      return NextResponse.json(
        { error: "Comment id and new comment text are required." },
        { status: 400 }
      );
    }
    await Comment.findByIdAndUpdate(_id, { comment });
    // Find the updated comment to get its accelerator
    const updated = await Comment.findById(_id);
    const accelerator = updated?.accelerator;
    // Return updated list for this accelerator
    const comments = await Comment.find({ accelerator }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ comments });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

// DELETE: Delete a comment by _id
export async function DELETE(req: NextRequest) {
  await connectToDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");
    if (!_id) {
      return NextResponse.json(
        { error: "Comment id is required." },
        { status: 400 }
      );
    }
    // Find the comment to get its accelerator before deleting
    const toDelete = await Comment.findById(_id);
    const accelerator = toDelete?.accelerator;
    await Comment.findByIdAndDelete(_id);
    // Return updated list for this accelerator
    const comments = await Comment.find({ accelerator }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ comments });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
