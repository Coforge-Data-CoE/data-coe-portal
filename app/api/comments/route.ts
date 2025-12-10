import { connectToDB } from "@/app/lib/mongodb";
import Activity from "@/app/models/activity";
import Accelerator from "@/app/models/accelerator";
import Comment from "@/app/models/comment";
import User from "@/app/models/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

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
    // Find the user document
    const user = await User.findOne({ email: userEmail });

    // Get accelerator name from DB
    const existing = await Accelerator.findById(accelerator);

    // Log activity for comment add
    await Activity.create({
      userId: user?._id,
      email: userEmail,
      type: "add-comment",
      meta: { acceleratorId: accelerator, acceleratorName: existing?.name },
      createdAt: new Date(),
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
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    const { comment } = await req.json();
    if (!_id || !comment) {
      return NextResponse.json(
        { error: "Comment id and new comment text are required." },
        { status: 400 }
      );
    }
    await Comment.findByIdAndUpdate(_id, { comment });

    // Find the user document

    const updated = await Comment.findById(_id);
    const accelerator = updated?.accelerator;

    const user = await User.findOne({ email: userEmail });
    // Find the updated comment to get its accelerator
    // Get accelerator name from DB
    const existing = await Accelerator.findById(accelerator);

    // Log activity for Comment update
    await Activity.create({
      userId: user?._id,
      email: userEmail,
      type: "update-comment",
      meta: { acceleratorId: accelerator, acceleratorName: existing?.name },
      createdAt: new Date(),
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

// DELETE: Delete a comment by _id
export async function DELETE(req: NextRequest) {
  await connectToDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    if (!_id) {
      return NextResponse.json(
        { error: "Comment id is required." },
        { status: 400 }
      );
    }
    // Find the comment to get its accelerator before deleting
    const toDelete = await Comment.findById(_id);
    const accelerator = toDelete?.accelerator;
    const user = await User.findOne({ email: userEmail });
    // Find the updated comment to get its accelerator
    // Get accelerator name from DB
    const existing = await Accelerator.findById(accelerator);

    await Comment.findByIdAndDelete(_id);

    // Log activity for Comment delete
    await Activity.create({
      userId: user?._id,
      email: userEmail,
      type: "delete-comment",
      meta: { acceleratorId: accelerator, acceleratorName: existing?.name },
      createdAt: new Date(),
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
