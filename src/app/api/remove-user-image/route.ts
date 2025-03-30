import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { userEmail, museumID } = body;

    if (!userEmail || !museumID) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true }, 
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedImages = user.imagesID.filter((img) => img !== museumID);

    if (updatedImages.length === user.imagesID.length) {
      return NextResponse.json(
        { message: "Image not found in favorites" },
        { status: 400 }
      );
    }

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
