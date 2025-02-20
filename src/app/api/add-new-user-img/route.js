import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    const { userID, imageID } = await req.json()

    // Check if favorite already exists
    const existing = await prisma.userAuth.findUnique({ where: { userID, imageID } })

    if (existing) {
        return NextResponse.json(
            { message: "Image already favorite" },
            { status: 400 }
        )
    }

    // Add the image to favorites
    const newFavorite = await prisma.userAuth.create({
        data: {
            userID,
            imageID
        },
    })

    return NextResponse.json(newFavorite)
}