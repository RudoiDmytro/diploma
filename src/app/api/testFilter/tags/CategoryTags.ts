"use server";

import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export async function GetCategoryTags(category: Category) {
  try {
    return await db.tag.findMany({
      where: { category: category },
      select: { tag: { select: { naming: true } } },
      distinct: ["naming"],
    });
  } catch (err) {
    console.log(err);
  }
}
