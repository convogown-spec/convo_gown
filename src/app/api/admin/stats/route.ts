import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  // 1. Authenticate request
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // 2. Fetch statistics dynamically from database
    const [totalAssets, totalCustomers, totalImages] = await Promise.all([
      prisma.galleryImage.count({ where: { category: "Asset" } }),
      prisma.galleryImage.count({ where: { category: "Happy Customer" } }),
      prisma.galleryImage.count(),
    ]);

    return NextResponse.json({
      totalAssets,
      totalCustomers: totalCustomers, // maps to totalCustomers as expected by the dashboard stats
      totalImages,
    });
  } catch (error: any) {
    console.error("Failed to compile dashboard statistics:", error);
    return NextResponse.json(
      { error: "Failed to compile stats." },
      { status: 500 }
    );
  }
}
