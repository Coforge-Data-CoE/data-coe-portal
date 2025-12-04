import { NextResponse } from "next/server";
import axios from "axios";

const TOOLKIT_API_URL = process.env.TOOLKIT_API_URL;
const TOOLKIT_API_KEY = process.env.TOOLKIT_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const toolName = searchParams.get("name");
  if (!toolName) {
    return NextResponse.json({ error: "Missing tool name" }, { status: 400 });
  }
  if (!TOOLKIT_API_URL || !TOOLKIT_API_KEY) {
    return NextResponse.json({ error: "Toolkit API config missing" }, { status: 500 });
  }
  try {
    const res = await axios.get(
      `${TOOLKIT_API_URL}/status?idOrName=${encodeURIComponent(toolName)}`,
      { headers: { "x-api-key": TOOLKIT_API_KEY } }
    );
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch status" }, { status: 500 });
  }
}
