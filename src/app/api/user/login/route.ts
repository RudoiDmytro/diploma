import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
