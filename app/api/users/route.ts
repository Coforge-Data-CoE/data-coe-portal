import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET() {
  await connectToDB();
  const users = await User.find({});
  return NextResponse.json(users);
}
