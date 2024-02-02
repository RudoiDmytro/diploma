import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.job.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
  }
}
