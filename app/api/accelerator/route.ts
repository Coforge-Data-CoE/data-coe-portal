// app/api/accelerator/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Accelerator from "@/app/models/accelerator";
import { uploadBufferToBlob } from "@/app/lib/azure";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

// Basic validation helpers
function assertImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Invalid image type");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image too large (max 10MB)");
  }
}
function assertVideo(file: File) {
  if (!file.type.startsWith("video/")) {
    throw new Error("Invalid video type");
  }
  if (file.size > 100 * 1024 * 1024) {
    throw new Error("Video too large (max 100MB)");
  }
}

export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const dataOffering = searchParams.get("dataOffering")?.trim() || "";
    const q = searchParams.get("q")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));

    const filter: any = {};
    if (dataOffering) filter.dataOffering = dataOffering;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      Accelerator.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Accelerator.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        items,
        total,
        page,
        pageSize,
        hasMore: skip + items.length < total,
        dataOffering: dataOffering || null,
        q: q || null,
      },
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

export async function POST(req: Request) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "";

    const form = await req.formData();
    const name = (form.get("name") as string)?.trim();
    const summary = (form.get("summary") as string)?.trim() || "";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const bannerFile = form.get("image") as File | null;
    const iconFile = form.get("icon") as File | null;
    const videoFile = form.get("video") as File | null;
    const dataOffering = (form.get("dataOffering") as string) || "";

    let iconUrl = "";
    let imageUrl = "";
    let videoUrl = "";

    if (iconFile && iconFile.size > 0) {
      try {
        assertImage(iconFile);
        const buffer = Buffer.from(await iconFile.arrayBuffer());
        const { url } = await uploadBufferToBlob(
          "data-coe-portal",
          buffer,
          iconFile.type,
          iconFile.name
        );
        iconUrl = url;
      } catch (e: any) {
        return NextResponse.json(
          { error: `Icon upload failed: ${e.message}` },
          { status: 400 }
        );
      }
    }

    if (bannerFile && bannerFile.size > 0) {
      try {
        assertImage(bannerFile);
        const buffer = Buffer.from(await bannerFile.arrayBuffer());
        const { url } = await uploadBufferToBlob(
          "data-coe-portal",
          buffer,
          bannerFile.type,
          bannerFile.name
        );
        imageUrl = url;
      } catch (e: any) {
        return NextResponse.json(
          { error: `Banner upload failed: ${e.message}` },
          { status: 400 }
        );
      }
    }

    if (videoFile && videoFile.size > 0) {
      try {
        assertVideo(videoFile);
        const buffer = Buffer.from(await videoFile.arrayBuffer());
        const { url } = await uploadBufferToBlob(
          "data-coe-portal",
          buffer,
          videoFile.type,
          videoFile.name
        );
        videoUrl = url;
      } catch (e: any) {
        return NextResponse.json(
          { error: `Video upload failed: ${e.message}` },
          { status: 400 }
        );
      }
    }

    const doc = await Accelerator.create({
      name,
      summary,
      iconUrl,
      imageUrl,
      videoUrl,
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
