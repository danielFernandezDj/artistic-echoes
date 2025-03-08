import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1️⃣ Extract query parameters from URL
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");
    const imageID = searchParams.get("imageID");

    // 2️⃣ Validate input
    if (!userEmail || !imageID) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    // 3️⃣ Find user in the database
    const user = await prisma.userAuth.findUnique({
      where: { email: userEmail },
      select: { imagesID: true }, // Only fetch the imagesID field
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4️⃣ Check if imageID exists in imagesID array
    const exists = user.imagesID.includes(imageID);

    return NextResponse.json({ exists });
  } catch (error) {
    console.error("❌ Error checking image:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
