import { db } from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.job.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(res);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

