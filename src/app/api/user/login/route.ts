import { db } from "@/lib/db";
import { hashPassword } from "@/app/api/user/register/route";
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
      select: {
        id: true,
        username: true,
        email: true,
        profileImageUrl: true,
        role: true,
        password: true,
      },
    });
    if (await compare(password, user!.password!)) {
      return NextResponse.json(user);
    } else {
      return NextResponse.error();
    }
  } catch (e) {
    throw new Error(e as string);
  }
}
// Function to exclude user password returned from prisma
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
