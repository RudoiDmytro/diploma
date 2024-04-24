import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import { formatMoney, formatDate } from "@/lib/utils";
import Badge from "../Badge";
import companyLogoPlaceholder from "@/assets/building-2.svg";
import { db } from "@/lib/db";
import { cache } from "react";

type JobListItemProps = {
  job: Job;
};

const getSkills = cache(async (slug: string) => {
  const skills = await db.job.findUnique({
    where: { slug },
    select: { requiredSkills: true },
  });
  return skills?.requiredSkills.slice(0, 3);;
});

const getCategoryName = cache(async (categoryId: number) => {
  const categoryName = await db.category.findUnique({
    where: { categoryId },
    select: { naming: true },
  });
  return categoryName?.naming;
});

export default async function JobListItem({
  job: {
    slug,
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    categoryId,
  },
}: JobListItemProps) {
  const skills = await getSkills(slug);
  const categoryName = await getCategoryName(categoryId);

  const skillNames = skills?.map((skill) => skill.skillName);

  return (
    <article className="flex md:min-h-full gap-3 rounded-xl border p-4 hover:bg-muted/50 ">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        className="rounded-lg self-center"
        height={50}
        width={50}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-2 md:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-2">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-2">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-2 md:hidden">
            <Clock size={16} className="shrink-0" />
            {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col shrink-0 items-end justify-between">
        <div className="grid-cols-2 space-x-1">
          <Badge>{type}</Badge>
          <Badge>{categoryName}</Badge>
        </div>
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
          {formatDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
