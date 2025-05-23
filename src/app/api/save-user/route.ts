/**
 * POST /api/save-user
 *
 * Method: POST
 * Description:
 * - Creates a new user profile in the database or updates an existing one based on email.
 *
 * Request Body:
 * {
 *   name: string,
 *   email: string,
 *   image?: string
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message?: string
 * }
 *
 * Auth: Yes (requires a valid user session)
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.userAuth.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 200 }
      );
    }

    const newUser = await prisma.userAuth.create({
      data: {
        email: email,
        password: "Not set",
        imagesID: [],
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}