/**
 * GET /api/get-user-liked-img
 *
 * Method: GET
 * Description:
 * - Retrieves the IDs of images the current logged-in user has liked.
 *
 * Response:
 * {
 *   imageID: string[]
 * }
 *
 * Auth: Yes (requires user session)
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authProviders"

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized because user is not Signin!" },
      { status: 401 }
    );
  }

  const userEmail = session.user?.email;

  try {
    const userImagesID = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true },
    });

    console.log(userImagesID);

    if (!userImagesID) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { imageID: userImagesID.imagesID },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error", error },
      { status: 500 }
    );
  }
}
