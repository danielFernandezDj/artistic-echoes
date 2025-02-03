import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
// import { UserType } from "@/lib/UserType";

export async function POST() {
  try {
    // Get the user's session.
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    // Check if user already exists in DB
    const existingUser = await prisma.userAuth.findUnique({
      where: { email: session.user.email },
    });

    if (!existingUser) {
      // Insert new user
      await prisma.userAuth.create({
        data: {
            email: session.user.email,
            createdAt: new Date(),
            password: "", 
            imagesID: "", 
          },
      });
    }

    return NextResponse.json(
      { message: "User saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error ", error},
      { status: 500 }
    );
  }
}
