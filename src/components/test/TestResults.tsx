import { Assessment, Prisma } from "@prisma/client";
import TestListItem from "./TestListItem";
import { TestFilterValues } from "@/lib/validation";
import { db } from "@/lib/db";
import Link from "next/link";

type TestResultsProps = {
  filterValues: TestFilterValues;
};

export default async function TestResults({
  filterValues: { q, type, tags },
}: TestResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.AssessmentWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { categoryName: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.AssessmentWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      tags ? { type } : {},
      { approved: true },
    ],
  };

  const assessment = await db.assessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 place-content-start">
      {assessment.map((test: Assessment) => (
        <Link key={test.id} href={`/assessment/${test.slug}`} className="block">
          <TestListItem test={test} />
        </Link>
      ))}
      {assessment.length === 0 && (
        <p className="text-center m-auto">
          There is no assessment found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
