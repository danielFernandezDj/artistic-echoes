import { prisma } from "@/lib/prisma";

export interface ImageStock {
  id: string;
  objectID: number;
  museumID: number;
  accessionNumber: string;
  accessionYear: string;
  isPublicDomain: boolean;
  objectType: string;
  objectTitle: string;
  medium: string;
  primaryImage: string;
  primaryImageSmall: string;
  constituentULAN_URL: string;
  constituentWikidata_URL: string;
  dimensions: string;
  objectDate: string;
  artistName: string;
  artistDisplayBio: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistWikidata_URL: string;
  artistULAN_URL: string;
  culture: string;
  creditLine: string;
  repository: string;
  objectURL: string;
  GalleryNumber: string;
  metadataDate: Date;
}

export async function GetAllImages() {
  try {
    console.log("Starting to fetch images...");

    const images = await prisma.imageStock.findMany({
      select: {
        id: true,
        primaryImage: true,
        primaryImageSmall: true,
        objectTitle: true,
      },
    });

    console.log("Query result:", images);

    if (!images) {
      throw new Error("No images returned from database");
    }

    return images;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause,
      });
    } else {
      console.error("Unknown error type:", error);
    }

    throw error;
  }
}
