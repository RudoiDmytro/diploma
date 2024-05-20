import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ message: "invalid inputs" });
  }
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    if (await compare(password, user!.password!)) {
      return NextResponse.json(exclude(user, ["password"]));
    } else {
      return NextResponse.error();
    }
  } catch (e) {
    throw new Error(e as string);
  }
}
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
