import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // 1️⃣ Extract and validate request body
    const body = await request.json();
    const { userEmail, objectID } = body;

    if (!userEmail || !objectID) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2️⃣ Find the user
    const user = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true }, // Only fetch imagesID field
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 3️⃣ Remove the `GalleryNumber` from `imagesID` array
    const updatedImages = user.imagesID.filter((img) => img !== objectID);

    if (updatedImages.length === user.imagesID.length) {
      return NextResponse.json(
        { message: "Image not found in favorites" },
        { status: 400 }
      );
    }

    // 4️⃣ Update the user's `imagesID`
    const updatedUser = await prisma.userAuth.update({
      where: { email: userEmail },
      data: { imagesID: { set: updatedImages } },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Delete failed", error: errorMessage },
      { status: 500 }
    );
  }
}
