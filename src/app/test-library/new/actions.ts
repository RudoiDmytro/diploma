"use server";

import { toSlug } from "@/lib/utils";
import { createTestSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { options } from "@/components/auth/Options";
import { getServerSession } from "next-auth";

export async function createTestPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const {
    title,
    companyName,
    logo,
    description,
    category,
    newCategory,
    skills,
    endDate,
    duration,
  } = createTestSchema.parse(values);
  console.log(formData);
  const slug = `${toSlug(title)}-${nanoid(10)}`;
  let logoUrl: string | undefined = undefined;
  const session = await getServerSession(options);

  if (logo) {
    const blob = await put(`logos/${slug}${path.extname(logo.name)}`, logo, {
      access: "public",
      addRandomSuffix: false,
    });
    logoUrl = blob.url;
  }

  let categoryId: number;

  if (category === "new") {
    const newCategoryData = await db.category.create({
      data: {
        naming: newCategory!.trim(),
      },
    });
    categoryId = newCategoryData.categoryId;
  } else {
    categoryId = parseInt(category);
  }

  let requiredSkillsArray: number[] = [];

  if (typeof skills === "string") {
    try {
      requiredSkillsArray = JSON.parse(skills);
    } catch (error) {
      console.error("Failed to parse requiredSkills:", error);
    }
  }

  requiredSkillsArray = requiredSkillsArray.filter(
    (skillId) => typeof skillId === "number"
  ) as number[];

  const requiredSkillsConnect = requiredSkillsArray.map((skillId: number) => ({
    skillId,
  }));

  try {
    await db.assessment.create({
      data: {
        slug,
        title: title.trim(),
        companyName: companyName.trim(),
        description: description.trim(),
        categoryId,
        logoUrl,
        skills: {
          connect: requiredSkillsConnect,
        },
        duration,
        endTime: endDate,
        userId: session!.user.id,
      },
    });
  } catch (err) {
    alert(err);
  }

  redirect("/test-library/test-submitted");
}
