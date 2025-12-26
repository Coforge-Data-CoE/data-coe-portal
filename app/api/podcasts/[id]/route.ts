import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/app/lib/mongodb";
import Podcast from "@/app/models/podcast";
import { uploadBufferToBlob } from "@/app/lib/azure";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/models/user";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const { id } = await params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid podcast id" }, { status: 400 });
  }
  const doc = await Podcast.findById(id);
  if (!doc)
    return NextResponse.json(
      { error: "Podcast not found", id },
      { status: 404 }
    );
  return NextResponse.json(doc);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  try {
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid podcast id" },
        { status: 400 }
      );
    }
    const contentType = request.headers.get("content-type") || "";

    const updates: any = {};

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const episode_name = form.get("episode_name");
      const description = form.get("description");
      const authorNameInput = form.get("author_name");
      const release = form.get("release");
      const podcastUrlFromForm = form.get("podcast_url");
      const coverUrlFromForm = form.get("cover_image");

      if (typeof episode_name === "string" && episode_name.trim() !== "") {
        updates.episode_name = episode_name.trim();
      }
      if (typeof description === "string") {
        updates.description = description.trim();
      }
      if (typeof release === "string") {
        updates.release = release.toLowerCase() === "true";
      }

      const audio = form.get("audio") as File | null;
      const cover = form.get("cover") as File | null;

      if (audio?.type && !audio.type.startsWith("audio/")) {
        return NextResponse.json(
          { error: "audio must be an audio file" },
          { status: 400 }
        );
      }
      if (cover?.type && !cover.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "cover must be an image file" },
          { status: 400 }
        );
      }

      if (typeof podcastUrlFromForm === "string" && podcastUrlFromForm) {
        if (!/^https?:\/\//i.test(podcastUrlFromForm))
          return NextResponse.json(
            { error: "podcast_url must be http(s) URL" },
            { status: 400 }
          );
        updates.podcast_url = podcastUrlFromForm;
      }
      if (typeof coverUrlFromForm === "string" && coverUrlFromForm) {
        if (!/^https?:\/\//i.test(coverUrlFromForm))
          return NextResponse.json(
            { error: "cover_image must be http(s) URL" },
            { status: 400 }
          );
        updates.cover_image = coverUrlFromForm;
      }

      if (audio) {
        const audioBuf = Buffer.from(await audio.arrayBuffer());
        const uploaded = await uploadBufferToBlob(
          "data-coe-portal",
          audioBuf,
          audio.type || "audio/mpeg",
          audio.name
        );
        updates.podcast_url = uploaded.url;
      }

      if (cover) {
        const coverBuf = Buffer.from(await cover.arrayBuffer());
        const uploaded = await uploadBufferToBlob(
          "data-coe-portal",
          coverBuf,
          cover.type || "image/jpeg",
          cover.name
        );
        updates.cover_image = uploaded.url;
      }

      if (
        typeof authorNameInput === "string" &&
        authorNameInput.trim() !== ""
      ) {
        updates["author.name"] = authorNameInput.trim();
      }

      // Always try to refresh avatar from session if available
      const session = await getServerSession(authOptions);
      const sessionEmail = (session?.user as any)?.email;
      if (sessionEmail) {
        const userDoc = await User.findOne({ email: sessionEmail });
        if (userDoc?.image) updates["author.avatar"] = userDoc.image;
      }
    } else {
      const body = await request.json();
      if (body.incrementViews === true) {
        // Only increment views
        const updated = await Podcast.findByIdAndUpdate(
          id,
          { $inc: { views: 1 } },
          { new: true }
        );
        if (!updated)
          return NextResponse.json(
            { error: "Podcast not found", id },
            { status: 404 }
          );
        return NextResponse.json(updated);
      }
      if (
        typeof body.episode_name === "string" &&
        body.episode_name.trim() !== ""
      ) {
        updates.episode_name = body.episode_name.trim();
      }
      if (typeof body.description === "string") {
        updates.description = body.description.trim();
      }
      if (typeof body.release === "boolean") {
        updates.release = body.release;
      }
      if (typeof body.podcast_url === "string") {
        if (body.podcast_url && !/^https?:\/\//i.test(body.podcast_url))
          return NextResponse.json(
            { error: "podcast_url must be http(s) URL" },
            { status: 400 }
          );
        updates.podcast_url = body.podcast_url;
      }
      if (typeof body.cover_image === "string") {
        if (body.cover_image && !/^https?:\/\//i.test(body.cover_image))
          return NextResponse.json(
            { error: "cover_image must be http(s) URL" },
            { status: 400 }
          );
        updates.cover_image = body.cover_image;
      }
      if (
        typeof body.author?.name === "string" &&
        body.author.name.trim() !== ""
      ) {
        updates["author.name"] = body.author.name.trim();
      }
      // Avatar: refresh from session
      const session = await getServerSession(authOptions);
      const sessionEmail = (session?.user as any)?.email;
      if (sessionEmail) {
        const userDoc = await User.findOne({ email: sessionEmail });
        if (userDoc?.image) updates["author.avatar"] = userDoc.image;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await Podcast.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
    if (!updated)
      return NextResponse.json(
        { error: "Podcast not found", id },
        { status: 404 }
      );
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update podcast" },
      { status: 500 }
    );
  }
}
