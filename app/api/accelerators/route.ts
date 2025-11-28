import { NextResponse } from "next/server";
import Accelerator from "@/app/models/accelerator";
import { connectToDB } from "@/app/lib/mongodb";

export async function GET() {
  await connectToDB();
  try {
    const accelerators = await Accelerator.find({});
    return NextResponse.json(accelerators);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch accelerators" }, { status: 500 });
  }
}
