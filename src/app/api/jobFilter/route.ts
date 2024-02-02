import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.job
      .findMany({
        where: { approved: true },
        select: { location: true },
        distinct: ["location"],
      })

    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
  }
}
