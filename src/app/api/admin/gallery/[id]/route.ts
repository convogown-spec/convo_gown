import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import db from "@/lib/db";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin_session")?.value;

  if (!sessionId) return false;

  const session = db
    .prepare("SELECT * FROM admin_sessions WHERE session_id = ? AND expires_at > ?")
    .get(sessionId, Date.now());

  return !!session;
}

// PATCH /api/admin/gallery/[id] - Edit category
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { category } = body;

    if (!category || (category !== "Asset" && category !== "Happy Customer")) {
      return NextResponse.json({ error: "Invalid category. Must be 'Asset' or 'Happy Customer'." }, { status: 400 });
    }

    const image = db
      .prepare("SELECT * FROM gallery_images WHERE id = ?")
      .get(id) as { id: number; image_url: string; category: string; created_at: string } | undefined;

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    db.prepare("UPDATE gallery_images SET category = ? WHERE id = ?").run(category, id);

    return NextResponse.json({
      success: true,
      image: {
        ...image,
        category,
      },
    });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/gallery/[id] - Delete image
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const image = db
      .prepare("SELECT * FROM gallery_images WHERE id = ?")
      .get(id) as { id: number; image_url: string; category: string; created_at: string } | undefined;

    if (!image) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    // 1. Delete physical file
    const physicalPath = path.join(process.cwd(), "public", image.image_url);
    if (fs.existsSync(physicalPath)) {
      try {
        fs.unlinkSync(physicalPath);
      } catch (err) {
        console.error(`Failed to delete physical file at ${physicalPath}:`, err);
        // Continue database deletion even if physical file delete fails to avoid orphan records in DB
      }
    }

    // 2. Delete database record
    db.prepare("DELETE FROM gallery_images WHERE id = ?").run(id);

    return NextResponse.json({ success: true, message: "Image deleted successfully." });
  } catch (error) {
    console.error("Delete image error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
