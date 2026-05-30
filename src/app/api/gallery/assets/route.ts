import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const assets = db
      .prepare("SELECT id, image_url FROM gallery_images WHERE category = 'Asset' ORDER BY id DESC")
      .all();
    return NextResponse.json(assets);
  } catch (error) {
    console.error("GET assets error:", error);
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}
