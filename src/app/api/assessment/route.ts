import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const slug = new URL(request.url).searchParams.get("slug") as string;
  try {
    const res = await db.assessment.findUnique({
      where: { slug },
    });

    if (!res) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
