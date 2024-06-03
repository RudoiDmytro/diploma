import { db } from "@/lib/db";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const errors: string[] = [];
  const body = await req.json();
  const { username, email, password, role } = body;

  if (password.length < 6) {
    errors.push("Password length should be more than 6 characters");
    return NextResponse.json({ errors });
  }
  try {
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashSync(password, 10),
        role: role === "employer" ? "EMPLOYER" : "SEEKER",
      },
    });
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ message: e });
  }
}

