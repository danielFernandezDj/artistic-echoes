/**
 * GET /api/images
 *
 * Method: GET
 * Description:
 * - Fetches and returns all image entries from the database.
 *
 * Response:
 * [
 *   {
 *     id: string,
 *     objectTitle: string,
 *     primaryImageSmall: string,
 *     ...
 *   },
 *   ...
 * ]
 *
 * Auth: No
 */

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await prisma.imageStock.findMany({
      select: {
        id: true,
        objectID: true,
        museumID: true,
        primaryImage: true,
        primaryImageSmall: true,
        objectTitle: true,
        artistName: true,
        artistWikidata_URL: true,
        artistDisplayBio: true,
        artistNationality: true,
        artistBeginDate: true,
        artistEndDate: true,
        culture: true,
        creditLine: true,
        dimensions: true,
        GalleryNumber: true,
        repository: true,
        medium: true,
        constituentWikidata_URL: true,
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
