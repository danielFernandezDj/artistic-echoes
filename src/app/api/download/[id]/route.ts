import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


interface Context {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  context: unknown,
) {
  const { params } = context as Context;
  try {
    const image = await prisma.imageStock.findUnique({
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
