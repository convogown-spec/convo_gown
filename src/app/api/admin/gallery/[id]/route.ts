import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * PATCH /api/admin/gallery/[id]
 * Updates an image's category between 'Asset' and 'Happy Customer'.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const { category } = body;

    // 2. Validate category
    if (!category || (category !== "Asset" && category !== "Happy Customer")) {
      return NextResponse.json(
        { error: "Category must be either 'Asset' or 'Happy Customer'." },
        { status: 400 }
      );
    }

    // 3. Verify existence of record
    const existing = await prisma.galleryImage.findUnique({
      where: { id: numericId },
    });
    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    // 4. Update PostgreSQL metadata
    const updated = await prisma.galleryImage.update({
      where: { id: numericId },
      data: { category },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/gallery/[id]
 * Deletes an image from Cloudinary and removes its record from PostgreSQL.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
    }

    // 2. Retrieve the existing image to get the Cloudinary Public ID
    const existing = await prisma.galleryImage.findUnique({
      where: { id: numericId },
    });
    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    // 3. Delete the image from Cloudinary
    try {
      await deleteFromCloudinary(existing.cloudinary_public_id);
    } catch (cloudinaryError) {
      console.warn(
        `Cloudinary deletion warning for public_id ${existing.cloudinary_public_id}:`,
        cloudinaryError
      );
      // We continue to delete from DB even if Cloudinary file is already missing
    }

    // 4. Delete the record from PostgreSQL
    await prisma.galleryImage.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ success: true, message: "Gallery image successfully deleted." });
  } catch (error: any) {
    console.error("Failed to delete gallery image:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
