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

// GET /api/admin/gallery - List all uploaded images
export async function GET() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = db
      .prepare("SELECT * FROM gallery_images ORDER BY id DESC")
      .all();

    return NextResponse.json(images);
  } catch (error) {
    console.error("Fetch gallery images error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/gallery - Upload image
export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const category = formData.get("category") as string | null;

    // 1. Basic validation
    if (!file || !category) {
      return NextResponse.json({ error: "Missing required fields (image and category)" }, { status: 400 });
    }

    if (category !== "Asset" && category !== "Happy Customer") {
      return NextResponse.json({ error: "Invalid category. Must be 'Asset' or 'Happy Customer'." }, { status: 400 });
    }

    // 2. Validate image type (extension & mime type)
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    const ext = path.extname(file.name).toLowerCase();
    if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed." },
        { status: 400 }
      );
    }

    // 3. Validate size (Max 15MB)
    const maxSizeBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return NextResponse.json({ error: "File too large. Maximum allowed size is 15 MB." }, { status: 400 });
    }

    // 4. Generate unique filename: prefix_timestamp.extension
    const timestamp = Math.floor(Date.now() / 1000);
    const prefix = category === "Asset" ? "asset" : "customer";
    const uniqueFilename = `${prefix}_${timestamp}${ext}`;

    // 5. Ensure directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFilename);

    // Save physical file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // 6. Save in database
    const imageUrl = `/uploads/gallery/${uniqueFilename}`;
    const createdAt = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const result = db
      .prepare("INSERT INTO gallery_images (image_url, category, created_at) VALUES (?, ?, ?)")
      .run(imageUrl, category, createdAt);

    return NextResponse.json({
      success: true,
      image: {
        id: result.lastInsertRowid,
        image_url: imageUrl,
        category,
        created_at: createdAt,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
