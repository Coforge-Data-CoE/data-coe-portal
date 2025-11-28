import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Activity from "@/app/models/activity"; // ensure this model exists
import { connectToDB } from "@/app/lib/mongodb";

// GET /api/users?email=... or ?id=...
// Returns user and recent activities
export async function GET(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email && !id) {
      return NextResponse.json({ error: "Provide email or id" }, { status: 400 });
    }

    const user = await User.find(email ? { email } : { _id: id });
    const found = user?.[0];
    if (!found) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const activities = await Activity.find({ userId: found._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ user: found, activities });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

// POST /api/users
// Body: { email, name, provider, event } -> creates user if not exists and logs activity
export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const { email, name, provider = "local", event = "login" } = body || {};
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    // Upsert user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: name || email,
        provider,
        // ...existing code...
        // add any default fields your User schema requires
      });
    } else {
      // Optional: update fields on login
      await User.updateOne({ _id: user._id }, { name: name ?? user.name, provider });
      user = await User.findById(user._id);
    }

    // Log activity
    await Activity.create({
      userId: user?._id,
      type: event, // e.g., "login"
      meta: { provider },
      createdAt: new Date(),
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}