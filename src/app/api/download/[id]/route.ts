// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";
// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

export async function GET(
  
) {
  return NextResponse.json({ message: 'Hello' })
}

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   const { id } = params;

//   try {
//     const image = await prisma.imageStock.findUnique({
//       where: { id },
//       select: {
//         primaryImage: true,
//         objectTitle: true,
//       },
//     });

//     if (!image?.primaryImage) {
//       return NextResponse.json({ error: "Image not found" }, { status: 404 });
//     }

//     const response = await fetch(image.primaryImage);
//     const blob = await response.blob();

//     return new NextResponse(blob, {
//       headers: {
//         "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
//         "Content-Disposition": `attachment; filename="${
//           image.objectTitle || "image"
//         }.jpg"`,
//       },
//     });
//   } catch (error) {
//     console.error("Download error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
