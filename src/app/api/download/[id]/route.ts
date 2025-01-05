import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma.imageStock.findUnique({
      where: { id: params.id },
      select: {
        primaryImage: true, 
        objectTitle: true, 
      },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (!image.primaryImage) {
      return NextResponse.json(
        { error: "No image URL found" },
        { status: 404 }
      );
    }
    const imageResponse = await fetch(image.primaryImage);
    const imageBlob = await imageResponse.blob();

    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `from-data; filename="${image.objectTitle}.jpg"`
    );
    headers.set("Content-Type", "image/jpeg");

    return new NextResponse(imageBlob, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
