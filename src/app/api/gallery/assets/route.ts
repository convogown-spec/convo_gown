import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const assets = await prisma.galleryImage.findMany({
      where: { category: "Asset" },
      orderBy: { created_at: "desc" },
    });

    const response = assets.map((item) => ({
      id: item.id,
      image_url: item.image_url,
    }));

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Failed to fetch asset images." },
      { status: 500 }
    );
  }
}
