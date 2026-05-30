import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/cloudinary-signature
 * Generates a secure signature for uploading straight to Cloudinary from the client.
 */
export async function POST(req: NextRequest) {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { category } = body;

    if (!category || (category !== "Asset" && category !== "Happy Customer")) {
      return NextResponse.json(
        { error: "Category is required and must be either 'Asset' or 'Happy Customer'." },
        { status: 400 }
      );
    }

    // 2. Generate the exact custom filename schema
    const prefix = category === "Asset" ? "asset" : "customer";
    const timestamp = Math.floor(Date.now() / 1000);
    const uniquePublicId = `${prefix}_${timestamp}`;
    const folder = "convo_gown_gallery";

    // 3. Create Cloudinary cryptographic signature
    const signature = cloudinary.utils.api_sign_request(
      {
        public_id: uniquePublicId,
        folder: folder,
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      public_id: uniquePublicId,
      folder,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error: any) {
    console.error("Failed to generate Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
