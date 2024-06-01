"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/components/auth/Options";
import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  console.log(values);
  const {
    title,
    type,
    companyName,
    companyLogo,
    location,
    locationType,
    applicationEmail,
    applicationUrl,
    description,
    salary,
    category,
    newCategory,
    requiredSkills,
  } = createJobSchema.parse(values);

  const session = await getServerSession(options);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

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
  if (typeof requiredSkills === "string") {
    try {
      console.log(requiredSkills);
      requiredSkillsArray = JSON.parse(requiredSkills.toString());
      console.log(requiredSkillsArray);
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

  const file = companyLogo;
  if (!file) {
    return
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileExtension = path.extname(file.name);
  const filename = `${slug}${fileExtension}`;

  try {
    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer
    );
    await db.job.create({
      data: {
        slug,
        title: title.trim(),
        type,
        companyName: companyName.trim(),
        locationType,
        location,
        companyLogoUrl: process.cwd() + "public/assets/" + filename,
        applicationEmail: applicationEmail?.trim(),
        applicationUrl: applicationUrl?.trim(),
        description: description.trim(),
        salary: parseInt(salary),
        categoryId,
        userId: session?.user?.id,
        requiredSkills: {
          connect: requiredSkillsConnect,
        },
      },
    });
  } catch (e) {
    console.log(requiredSkills);
  }
  redirect("/jobs/job-submitted");
}
