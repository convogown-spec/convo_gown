import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/gallery
 * Returns all gallery images stored in PostgreSQL.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("Failed to list gallery images:", error);
    return NextResponse.json(
      { error: "Failed to list gallery images." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gallery
 * Saves image metadata in PostgreSQL.
 */
export async function POST(req: NextRequest) {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { image_url, cloudinary_public_id, category } = body;

    // 2. Validate field existence
    if (!image_url || !cloudinary_public_id || !category) {
      return NextResponse.json(
        { error: "Image URL, Cloudinary Public ID, and Category are required." },
        { status: 400 }
      );
    }

    // 3. Validate category values
    if (category !== "Asset" && category !== "Happy Customer") {
      return NextResponse.json(
        { error: "Category must be either 'Asset' or 'Happy Customer'." },
        { status: 400 }
      );
    }

    // 4. Save image metadata in PostgreSQL
    const savedImage = await prisma.galleryImage.create({
      data: {
        image_url,
        cloudinary_public_id,
        category,
      },
    });

    return NextResponse.json(savedImage);
  } catch (error: any) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
