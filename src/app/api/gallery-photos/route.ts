import { NextResponse } from "next/server";
import registry from "@/data/gallery-images.json";

export async function GET() {
  try {
    return NextResponse.json(registry);
  } catch (error: any) {
    console.error("Error reading gallery photos:", error);
    return NextResponse.json(
      { error: "Failed to list gallery photos." },
      { status: 500 }
    );
  }
}

