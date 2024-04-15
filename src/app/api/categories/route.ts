import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await db.category.findMany({
      select: {
        categoryId: true,
        naming: true,
      },
      orderBy: {
        naming: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}