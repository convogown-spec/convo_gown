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
 * Validates, uploads an image to Cloudinary, and saves metadata in PostgreSQL.
 */
export async function POST(req: NextRequest) {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const category = formData.get("category") as string | null;

    // 2. Validate field existence
    if (!image || !category) {
      return NextResponse.json(
        { error: "Image file and category are required." },
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

    // 4. Validate file size (Maximum 15 MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (image.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the 15 MB limit." },
        { status: 400 }
      );
    }

    // 5. Validate file extension and content type
    const originalName = image.name;
    const ext = originalName.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

    if (!ext || !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: "Unsupported file format. Allowed formats: jpg, jpeg, png, webp." },
        { status: 400 }
      );
    }

    const mimeType = image.type;
    if (!mimeType.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image type." },
        { status: 400 }
      );
    }

    // Reject archive/executable formats explicitly to be absolutely safe
    const rejectedExtensions = ["exe", "js", "php", "sh", "bat", "zip"];
    if (rejectedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: "File format is rejected for security reasons." },
        { status: 400 }
      );
    }

    // 6. Convert image to buffer
    const arrayBuffer = await image.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // 7. Generate a unique filename using specifications
    const prefix = category === "Asset" ? "asset" : "customer";
    const timestamp = Math.floor(Date.now() / 1000);
    const uniquePublicId = `${prefix}_${timestamp}`;

    // 8. Stream upload to Cloudinary
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(fileBuffer, uniquePublicId);
    } catch (uploadError: any) {
      console.error("Cloudinary upload failed:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image to Cloudinary storage." },
        { status: 502 }
      );
    }

    // 9. Save image metadata in PostgreSQL
    const savedImage = await prisma.galleryImage.create({
      data: {
        image_url: uploadResult.secure_url,
        cloudinary_public_id: uploadResult.public_id,
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
