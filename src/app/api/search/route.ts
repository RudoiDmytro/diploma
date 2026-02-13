import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/lib/db";

const MAX_RESULTS = 6;

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ jobs: [], assessments: [] });
  }

  try {
    const [jobs, assessments] = await Promise.all([
      db.job.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { companyName: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          slug: true,
          title: true,
          companyName: true,
        },
        orderBy: { createdAt: "desc" },
        take: MAX_RESULTS,
      }),
      db.assessment.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { companyName: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          slug: true,
          title: true,
          companyName: true,
        },
        orderBy: { createdAt: "desc" },
        take: MAX_RESULTS,
      }),
    ]);

    return NextResponse.json({ jobs, assessments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
