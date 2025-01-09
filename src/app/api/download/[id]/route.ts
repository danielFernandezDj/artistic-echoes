import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ImageStock {
  primaryImage: string | null;
  objectTitle: string | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { error: "No image ID provided" },
      { status: 400 }
    );
  }

  try {
    const image: ImageStock | null = await prisma.imageStock.findUnique({
      where: { id: params.id },
      select: {
        primaryImage: true,
        objectTitle: true,
      },
    });

    if (!image?.primaryImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const response = await fetch(image.primaryImage);
    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Content-Disposition": `attachment; filename="${
          image.objectTitle || "image"
        }.jpg"`,
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
