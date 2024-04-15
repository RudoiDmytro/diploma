import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const skills = await db.skill.findMany({
      select: {
        skillId: true,
        skillName: true,
      },
      orderBy: {
        skillName: "asc",
      },
    });

    return NextResponse.json(skills);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { skillName } = await request.json();
    const newSkill = await db.skill.create({
      data: {
        skillName,
      },
    });

    return NextResponse.json(newSkill);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
