import { getServerSession } from "next-auth";
import { options } from "@/app/components/auth/Options";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(options);

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email!,
    },
    include: {
      jobs: true,
      assesments: true,
      application: {
        include: {
          job: true,
        },
      },
      Result: {
        include: {
          assessment: true,
        },
      },
    },
  });

  return NextResponse.json({
    jobs: user?.jobs,
    assessments: user?.assesments,
    applications: user?.application,
    results: user?.Result,
  });
}
