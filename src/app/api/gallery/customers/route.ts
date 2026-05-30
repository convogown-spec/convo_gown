import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const customers = db
      .prepare("SELECT id, image_url FROM gallery_images WHERE category = 'Happy Customer' ORDER BY id DESC")
      .all();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("GET customers error:", error);
    return NextResponse.json({ error: "Failed to fetch happy customers" }, { status: 500 });
  }
}
