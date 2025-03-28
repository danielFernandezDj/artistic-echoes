import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {
    const imagesResponse = await prisma.userAuth.findMany({
      where: { email: "mdanif9728@gmail.com" },
      select: {
        imagesID: true,
      },
    });

    const imageIDsNested = imagesResponse.flatMap((user) => user.imagesID);
    const imageIDs = imageIDsNested.flat();

    const uniqueImageIDs = [...new Set(imageIDs)];

    console.log("uniqueImageIDs:", uniqueImageIDs);

    if (!uniqueImageIDs || uniqueImageIDs.length === 0) {
      return NextResponse.json(
        { message: "Failed to fetch user liked image IDs" },
        { status: 500 }
      );
    }

    const userImages = await prisma.imageStock.findMany({
      where: {
        museumID: { in: uniqueImageIDs },
      },
    });

    console.log("userImages:", userImages.length);

    if (!userImages || userImages.length === 0) {
      return NextResponse.json(
        { message: "No images found for the given IDs" },
        { status: 404 }
      );
    }

    return NextResponse.json(userImages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error", error },
      { status: 500 }
    );
  }
}
