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

  let companyLogoUrl: string | undefined = undefined;
  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    companyLogoUrl = blob.url;
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
  if (typeof requiredSkills === "string") {
    try {
      requiredSkillsArray = JSON.parse(requiredSkills);
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
    await db.job.create({
      data: {
        slug,
        title: title.trim(),
        type,
        companyName: companyName.trim(),
        companyLogoUrl,
        locationType,
        location,
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
