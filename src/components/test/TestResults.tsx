import { Assessment, Prisma } from "@prisma/client";
import TestListItem from "./TestListItem";
import { TestFilterValues } from "@/lib/validation";
import { db } from "@/lib/db";
import Link from "next/link";

type TestResultsProps = {
  filterValues: TestFilterValues;
};

export default async function TestResults({
  filterValues: { q, type, skills, category },
}: TestResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.AssessmentWhereInput = searchString
    ? {
        OR: [{ title: { search: searchString } }],
      }
    : {};

  const skillsFilter: Prisma.AssessmentWhereInput = skills
    ? {
        skills: {
          some: {
            skillName: {
              in: skills.split(","),
            },
          },
        },
      }
    : {};
  const categoryFilter: Prisma.AssessmentWhereInput = category
    ? {
        category: {
          naming: {
            equals: category,
          },
        },
      }
    : {};

  const where: Prisma.AssessmentWhereInput = {
    AND: [searchFilter, skillsFilter, categoryFilter, { approved: false }],
  };

  const assessment = await db.assessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid grid-cols-2 auto-cols-auto h-fit gap-2 max-md:grid-cols-1 col-span-2">
      {assessment.map((test: Assessment) => (
        <Link
          key={test.slug}
          href={`/test-library/${test.slug}`}
          className="block"
        >
          <TestListItem test={test} />
        </Link>
      ))}
      {assessment.length === 0 && (
        <p className="text-center m-auto">
          There is no assessment found.
        </p>
      )}
    </div>
  );
}
