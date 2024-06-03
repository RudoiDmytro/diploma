import { Assessment } from "@prisma/client";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Badge from "../Badge";
import { cache } from "react";
import { db } from "@/lib/db";
import companyLogoPlaceholder from "@/assets/building-2.svg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("TestLibrary");

  return (
    <article className="gradient1 rounded-3xl p-4 md:h-full">
      <section className="bg-background flex md:h-full rounded-xl p-2 hover:bg-card hover:transition-colors duration-500 ease-in-out">
      <Image
          src={(`/assets/${slug}.jpg` || companyLogoPlaceholder) ? `/assets/${slug}.jpg` : companyLogoPlaceholder}
          alt={`${title} logo`}
          className="rounded-lg self-center dark:bg-foreground mr-2"
          height={50}
          width={50}
        />
        <div className="flex-grow space-y-3 bg-card text-card-foreground rounded-lg p-2">
          <div>
            <h2 className="text-xl font-medium">{title}</h2>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-2">
              <Clock size={16} />
              {formatDate(endTime!)}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-2">
              <Clock size={16} className="shrink-0" />
              {duration} {t("min")}
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col m-1 text-center shrink-0 justify-between space-y-3">
          <div className="flex flex-col space-y-2 bg-card p-1 rounded-lg">
            <Badge>{categoryName}</Badge>
          </div>
          <div className="bg-card rounded-lg">
            {skillNames?.map((skillName) => (
              <div
                key={skillName}
                className="bg-card-foreground text-background text-xs font-medium px-2.5 py-0.5 rounded border border-foreground m-1"
              >
                {skillName}
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
