import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    // 1️⃣ Extract & Validate Request Body
    const 

    // 2️⃣ Find the User in `userAuth`
   

    // 3️⃣ Ensure `imagesID` is Always an Array
    

    // 4️⃣ Update `imagesID` Safely
   

    return NextResponse.json("?");
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
