// app/api/accelerator/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Accelerator from "@/app/models/accelerator";
import { getServerSession } from "next-auth";
import { uploadBufferToBlob } from "@/app/lib/azure";
import User from "@/app/models/user";
import Activity from "@/app/models/activity";
import { authOptions } from "../../auth/[...nextauth]/route";

export const runtime = "nodejs";

function assertImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Invalid image type");
  if (file.size > 10 * 1024 * 1024)
    throw new Error("Image too large (max 10MB)");
}
function assertVideo(file: File) {
  if (!file.type.startsWith("video/")) throw new Error("Invalid video type");
  if (file.size > 100 * 1024 * 1024)
    throw new Error("Video too large (max 100MB)");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;
    const doc = await Accelerator.findById(id);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await context.params;
    const existing = await Accelerator.findById(id);
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    if (!existing)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const form = await req.formData();
    const name = (form.get("name") as string)?.trim() || existing.name;
    const description =
      (form.get("description") as string)?.trim() || existing.description;
    const summary = (form.get("summary") as string)?.trim() || existing.summary;
    const dataOffering =
      (form.get("dataOffering") as string)?.trim() || existing.dataOffering;
    const dockerProjectName =
      (form.get("dockerProjectName") as string)?.trim() ||
      existing.dockerProjectName;
    const userId = req.headers.get("user_id") || existing.updatedBy || "";

    const bannerFile = form.get("image") as File | null;
    const iconFile = form.get("icon") as File | null;
    const videoFile = form.get("video") as File | null;

    let iconUrl = existing.iconUrl;
    let imageUrl = existing.imageUrl;
    let videoUrl = existing.videoUrl;

    if (iconFile && iconFile.size > 0) {
      assertImage(iconFile);
      const buffer = Buffer.from(await iconFile.arrayBuffer());
      const { url } = await uploadBufferToBlob(
        "data-coe-portal",
        buffer,
        iconFile.type,
        iconFile.name
      );
      iconUrl = url;
    }
    if (bannerFile && bannerFile.size > 0) {
      assertImage(bannerFile);
      const buffer = Buffer.from(await bannerFile.arrayBuffer());
      const { url } = await uploadBufferToBlob(
        "data-coe-portal",
        buffer,
        bannerFile.type,
        bannerFile.name
      );
      imageUrl = url;
    }
    if (videoFile && videoFile.size > 0) {
      assertVideo(videoFile);
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      const { url } = await uploadBufferToBlob(
        "data-coe-portal",
        buffer,
        videoFile.type,
        videoFile.name
      );
      videoUrl = url;
    }

    existing.name = name;
    existing.description = description;
    existing.summary = summary;
    existing.dataOffering = dataOffering;
    existing.dockerProjectName = dockerProjectName;
    existing.iconUrl = iconUrl;
    existing.imageUrl = imageUrl;
    existing.videoUrl = videoUrl;
    existing.updatedBy = userId;
    await existing.save();

    // Find the user document
    const user = await User.findOne({ email: userEmail });
    // Log activity for accelerator update
    await Activity.create({
      userId: user?._id,
      email: userEmail,
      type: "update-accelerator",
      meta: { acceleratorId: existing._id, acceleratorName: existing.name },
      createdAt: new Date(),
    });

    return NextResponse.json(existing, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await context.params;
    const existing = await Accelerator.findById(id);
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    if (!existing)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    await existing.deleteOne();

    // Find the user document
    const user = await User.findOne({ email: userEmail });
    // Log activity for accelerator update
    await Activity.create({
      userId: user?._id,
      email: userEmail,
      type: "delete-accelerator",
      meta: { acceleratorId: existing._id, acceleratorName: existing.name },
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
