/**
 * GET /api/get-user-images
 *
 * Method: GET
 * Description:
 * - Fetches the current logged-in user's profile information.
 *
 * Response:
 * {
 *   name: string,
 *   email: string,
 *   ...
 * }
 *
 * Auth: Yes (requires user session)
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true },
    });

    const userImages = await prisma.imageStock.findMany({
      where: {
        museumID: { in: user?.imagesID },
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
