import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectToDB } from "@/app/lib/mongodb";
import mongoose from "mongoose";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const {id} = await context?.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: `Invalid or missing user id: ${id}` }, { status: 400 });
  }
  const user = await User.findByIdAndUpdate(id, { $set: { isAdmin: true } }, { new: true });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ success: true, user });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const {id} = await context?.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: `Invalid or missing user id: ${id}` }, { status: 400 });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body.isAdmin !== "boolean") {
    return NextResponse.json({ error: "Missing or invalid isAdmin field" }, { status: 400 });
  }
  const user = await User.findByIdAndUpdate(id, { $set: { isAdmin: body.isAdmin } }, { new: true });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ success: true, user });
}