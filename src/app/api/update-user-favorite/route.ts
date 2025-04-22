/**
 * PUT /api/update-user-favorite
 *
 * Method: PUT
 * Description:
 * - Adds an image ID to the logged-in user's list of favorites.
 *
 * Request Body:
 * {
 *   userEmail: string,
 *   museumID: string
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message?: string
 * }
 *
 * Auth: Yes (requires user session)
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { userEmail, museumID } = body;

    if (!userEmail || !museumID) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.userAuth.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingFavorites = Array.isArray(user.imagesID) ? user.imagesID : [];

    const objectID = String(museumID);

    if (existingFavorites.includes(objectID)) {
      return NextResponse.json(
        { message: "Image already favorited" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.userAuth.update({
      where: { email: userEmail },
      data: {
        imagesID: {
          set: [...existingFavorites, objectID],
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Update failed", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Update failed", error: "Unknown error" },
      { status: 500 }
    );
  }
}
