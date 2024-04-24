import { Assessment } from "@prisma/client";
import { Briefcase, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Badge from "../Badge";
import { cache } from "react";
import { db } from "@/lib/db";
import companyLogoPlaceholder from "@/assets/building-2.svg";
import Image from "next/image";

type TestListItemProps = {
  test: Assessment;
};

const getSkills = cache(async (slug: string) => {
  const skills = await db.assessment.findUnique({
    where: { slug },
    select: { skills: true },
  });
  return skills?.skills.slice(0, 3);
});

const getCategoryName = cache(async (categoryId: number) => {
  const categoryName = await db.category.findUnique({
    where: { categoryId },
    select: { naming: true },
  });
  return categoryName?.naming;
});


export default async function TestListItem({
  test: { slug, title, categoryId, duration, logoUrl, endTime },
}: TestListItemProps) {
  const skills = await getSkills(slug);
  const categoryName = await getCategoryName(categoryId);

  const skillNames = skills?.map((skill) => skill.skillName);

  return (
    <article className="flex md:h-full gap-3 rounded-xl border p-4 hover:bg-muted/60">
      <Image
        src={logoUrl || companyLogoPlaceholder}
        alt={`${title} logo`}
        className="rounded-lg self-center"
        height={50}
        width={50}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock size={16} className="shrink-0" />
            {duration} min
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col text-center shrink-0 justify-between space-y-3">
          <Badge>{categoryName}</Badge>
        {skillNames?.map((skillName) => (
          <div
            key={skillName}
            id="badge-red"
            className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
          >
            {skillName}
          </div>
        ))}
        <span className="flex items-center gap-2 text-muted-foreground">
          <Clock size={16} />
          {formatDate(endTime!)}
        </span>
      </div>
    </article>
  );
}
