import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await prisma.imageStock.findMany({
      select: {
        id: true,
        primaryImage: true,
        primaryImageSmall: true,
        objectTitle: true,
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
