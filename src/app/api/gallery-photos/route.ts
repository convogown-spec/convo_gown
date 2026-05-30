import { NextResponse } from "next/server";
import registry from "@/data/gallery-images.json";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let dbImages: any[] = [];
    try {
      dbImages = await prisma.galleryImage.findMany({
        orderBy: { created_at: "desc" },
      });
    } catch (dbError) {
      console.error("PostgreSQL fetch failed, falling back to static registry:", dbError);
    }

    // Map DB images to match existing frontend categories ('Our Assets' & 'Happy Customers')
    const mappedDbImages = dbImages.map((item) => {
      // Build friendly title
      const friendlyTitle = item.cloudinary_public_id
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      return {
        title: friendlyTitle,
        category: item.category === "Asset" ? "Our Assets" : "Happy Customers",
        image: item.image_url,
      };
    });

    // Merge database uploads at the top so new items appear first
    const mergedList = [...mappedDbImages, ...registry];

    return NextResponse.json(mergedList);
  } catch (error: any) {
    console.error("Error reading gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to list gallery photos." },
      { status: 500 }
    );
  }
}
