import { connectToDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import ToolkitService from "@/app/models/toolkit";
import RequestSchema from "@/app/models/request";

export async function GET() {
  await connectToDB();
  const services = await ToolkitService.find({});
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    const form = await req.formData();
    const name = (form.get("name") as string)?.trim();
    const query = (form.get("query") as string)?.trim() || "";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    
    const dataOffering = (form.get("dataOffering") as string) || "";

    const doc = await RequestSchema.create({
      name,
      query,
      dataOffering,
      createdBy: userEmail,
      updatedBy: userEmail,
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
