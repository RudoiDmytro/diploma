import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.category.findMany({
      select: { name: true },
      distinct: ["name"],
    });
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
  }
}
