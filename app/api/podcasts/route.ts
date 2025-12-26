import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import Podcast from "@/app/models/podcast";
import { uploadBufferToBlob } from "@/app/lib/azure";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/models/user";

export async function GET(request: Request) {
  await connectToDB();
  try {
    const url = new URL(request.url);
    const releaseParam = url.searchParams.get("release");
    let query: any = {};
    if (releaseParam === null || releaseParam === "true") {
      query.release = true;
    } else if (releaseParam === "false") {
      query.$or = [{ release: { $eq: false } }, { release: { $exists: false } }];
    }
    const podcasts = await Podcast.find(query).sort({ createdAt: -1 });
    return NextResponse.json(podcasts);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch podcasts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectToDB();
  try {
    const contentType = request.headers.get("content-type") || "";

    // Multipart upload path (preferred)
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const episode_name = String(form.get("episode_name") || "").trim();
      const description = String(form.get("description") || "").trim();
      const authorNameInput = String(form.get("author_name") || "").trim();

      if (!episode_name) {
        return NextResponse.json({ error: "episode_name is required" }, { status: 400 });
      }

      const audio = form.get("audio") as File | null;
      const cover = form.get("cover") as File | null;
      const podcastUrlFromForm = String(form.get("podcast_url") || "").trim();
      const coverUrlFromForm = String(form.get("cover_image") || "").trim();

      if (!audio && !podcastUrlFromForm) {
        return NextResponse.json({ error: "audio file or podcast_url is required" }, { status: 400 });
      }

      // Basic content-type checks
      if (audio?.type && !audio.type.startsWith("audio/")) {
        return NextResponse.json({ error: "audio must be an audio file" }, { status: 400 });
      }
      if (cover?.type && !cover.type.startsWith("image/")) {
        return NextResponse.json({ error: "cover must be an image file" }, { status: 400 });
      }

      if (podcastUrlFromForm && !/^https?:\/\//i.test(podcastUrlFromForm)) {
        return NextResponse.json({ error: "podcast_url must be http(s) URL" }, { status: 400 });
      }
      if (coverUrlFromForm && !/^https?:\/\//i.test(coverUrlFromForm)) {
        return NextResponse.json({ error: "cover_image must be http(s) URL" }, { status: 400 });
      }


      // Upload to Azure Blob Storage
      let audioUrl = podcastUrlFromForm;
      if (audio) {
        const audioBuf = Buffer.from(await audio.arrayBuffer());
        const uploaded = await uploadBufferToBlob(
          "data-coe-portal",
          audioBuf,
          audio.type || "audio/mpeg",
          audio.name
        );
        audioUrl = uploaded.url;
      }

      let coverUrl = coverUrlFromForm || "";
      if (cover) {
        const coverBuf = Buffer.from(await cover.arrayBuffer());
        const uploaded = await uploadBufferToBlob(
          "data-coe-portal",
          coverBuf,
          cover.type || "image/jpeg",
          cover.name
        );
        coverUrl = uploaded.url;
      }

      // Resolve author info from session or fallback
      const session = await getServerSession(authOptions);
      const sessionName = (session?.user as any)?.name || (session?.user as any)?.email || "";
      const effectiveAuthorName = authorNameInput || sessionName || "Unknown";
      let authorAvatar = "";
      const sessionEmail = (session?.user as any)?.email;
      if (sessionEmail) {
        const userDoc = await User.findOne({ email: sessionEmail });
        if (userDoc?.image) authorAvatar = userDoc.image;
      }

      const created = await Podcast.create({
        episode_name,
        podcast_url: audioUrl,
        author: { name: effectiveAuthorName || "Unknown", avatar: authorAvatar },
        description,
        cover_image: coverUrl,
        release: String(form.get("release") || "false").toLowerCase() === "true",
      });
      return NextResponse.json(created, { status: 201 });
    }

    // JSON path (backward compatible)
    const body = await request.json();
    const episode_name = (body?.episode_name || "").trim();
    const podcast_url = (body?.podcast_url || "").trim();
    const authorNameInput = (body?.author?.name || "").trim();
    const description = (body?.description || "").trim();
    const cover_image = (body?.cover_image || "").trim();

    if (!episode_name) {
      return NextResponse.json({ error: "episode_name is required" }, { status: 400 });
    }

    if (podcast_url && !/^https?:\/\//i.test(podcast_url)) {
      return NextResponse.json({ error: "podcast_url must be http(s) URL" }, { status: 400 });
    }
    if (cover_image && !/^https?:\/\//i.test(cover_image)) {
      return NextResponse.json({ error: "cover_image must be http(s) URL" }, { status: 400 });
    }

    // Resolve author info from session or fallback
    const session = await getServerSession(authOptions);
    const sessionName = (session?.user as any)?.name || (session?.user as any)?.email || "";
    const effectiveAuthorName = authorNameInput || sessionName || "Unknown";
    let authorAvatar = "";
    const sessionEmail = (session?.user as any)?.email;
    if (sessionEmail) {
      const userDoc = await User.findOne({ email: sessionEmail });
      if (userDoc?.image) authorAvatar = userDoc.image;
    }

    const created = await Podcast.create({
      episode_name,
      podcast_url,
      author: { name: effectiveAuthorName || "Unknown", avatar: authorAvatar },
      description,
      cover_image,
      release: Boolean(body?.release) === true,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create podcast" }, { status: 500 });
  }
}
