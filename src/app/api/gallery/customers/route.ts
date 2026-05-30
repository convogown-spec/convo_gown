import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const customers = await prisma.galleryImage.findMany({
      where: { category: "Happy Customer" },
      orderBy: { created_at: "desc" },
    });

    const response = customers.map((item) => ({
      id: item.id,
      image_url: item.image_url,
    }));

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching customer images:", error);
    return NextResponse.json(
      { error: "Failed to fetch happy customer images." },
      { status: 500 }
    );
  }
}
