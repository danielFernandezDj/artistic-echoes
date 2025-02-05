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

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    // Create new user

    const newUser = await prisma.userAuth.create({
      data: {
        email: session.user.email,
        createdAt: new Date(),
        password: "",
        imagesID: "",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error ", error },
      { status: 500 }
    );
  }
}
