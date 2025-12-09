import { NextResponse } from "next/server";
import axios from "axios";

const TOOLKIT_API_URL = process.env.TOOLKIT_API_URL;
const TOOLKIT_API_KEY = process.env.TOOLKIT_API_KEY;

export async function POST(req: Request) {
  if (!TOOLKIT_API_URL || !TOOLKIT_API_KEY) {
    return NextResponse.json({ error: "Toolkit API config missing" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const project = body.project;
    if (!project) {
      return NextResponse.json({ error: "Missing project name" }, { status: 400 });
    }
    const res = await axios.post(
      `${TOOLKIT_API_URL}/start-project`,
      { project },
      { headers: { "x-api-key": TOOLKIT_API_KEY } }
    );
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to start project" }, { status: 500 });
  }
}
