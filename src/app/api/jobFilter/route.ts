import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.job.findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    });
    const res2 = await db.skill.findMany({
      select: { skillName: true },
      distinct: ["skillName"],
    });
    return NextResponse.json([res, res2], {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err) {
    console.log(err);
  }
}
