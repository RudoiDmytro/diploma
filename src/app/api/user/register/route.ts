import { db } from "@/lib/db";
import { hash, hashSync } from "bcrypt";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const errors: string[] = [];
  const body = await req.json();
  const { username, email, password } = body;

  if (password.length < 6) {
    errors.push("Password length should be more than 6 characters");
    return NextResponse.json({ errors });
  }
  try {
    const user = await db.user.create({
      data: { username, email, password: hashPassword(password) },
    });
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ message: e });
  }
}
export const hashPassword = (string) => {
  return hash(string, 10).toString();
};
