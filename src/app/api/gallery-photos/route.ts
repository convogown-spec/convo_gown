import { NextResponse } from "next/server";
import path from "path";
import registry from "@/data/gallery-images.json";
import db from "@/lib/db";

export async function GET() {
  try {
    // 1. Fetch dynamic database-backed images
    const dbImages = db
      .prepare("SELECT * FROM gallery_images ORDER BY id DESC")
      .all() as Array<{ id: number; image_url: string; category: string; created_at: string }>;

    // 2. Map database images to the structure expected by the frontend
    const dynamicItems = dbImages.map((img) => {
      const filename = path.basename(img.image_url);
      const ext = path.extname(filename);
      const title = path.basename(filename, ext)
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        title,
        category: img.category === "Asset" ? "Our Assets" : "Happy Customers",
        image: img.image_url,
      };
    });

    // 3. Combine static registry items with dynamic items (dynamic items first for newest visibility)
    const combined = [...dynamicItems, ...registry];

    return NextResponse.json(combined);
  } catch (error) {
    console.error("Error reading gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to list gallery photos." },
      { status: 500 }
    );
  }
}


