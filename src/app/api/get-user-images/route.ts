import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Get User Email
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user?.email;

  try {
    // Search for the User Liked imagesID
    const userImagesID = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true },
    });
    console.log(userImagesID)

    if (!userImagesID) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ imageID: userImagesID.imagesID }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error", error },
      { status: 500 }
    );
  }
}
