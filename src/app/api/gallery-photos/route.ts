import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.resolve(process.cwd(), "public", "assets", "gallery");
    const categories = ["Our Assets", "Happy Customers"];
    const items: Array<{ title: string; category: string; image: string }> = [];

    for (const category of categories) {
      const categoryDir = path.join(galleryPath, category);
      
      try {
        const files = await fs.readdir(categoryDir);
        for (const file of files) {
          // Filter out hidden files and verify valid image extensions
          const ext = path.extname(file).toLowerCase();
          if ([".png", ".jpg", ".jpeg", ".webp", ".svg"].includes(ext)) {
            // Form a user-friendly title from the filename
            const title = path.basename(file, ext)
              .replace(/[_-]/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            items.push({
              title,
              category,
              image: `/assets/gallery/${category}/${file}`,
            });
          }
        }
      } catch (err: any) {
        console.warn(`Could not read gallery directory for category: ${category}`, err.message);
      }
    }

    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Error reading gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to list gallery photos." },
      { status: 500 }
    );
  }
}
