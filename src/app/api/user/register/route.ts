import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["employer", "seeker"]),
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { username, email, password, role } = result.data;

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { errors: { email: ["An account with this email already exists"] } },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: {
        username,
        email,
        password: await hash(password, 10),
        role: role === "employer" ? "EMPLOYER" : "SEEKER",
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
