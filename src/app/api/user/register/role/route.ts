import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  
  try {
    const body = await req.json();
    const { role, session } = body;

    const user = await db.user.update({
      where: {
        email: session.user?.email as string,
      },
      data: {
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
