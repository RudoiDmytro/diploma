import { Job, Prisma } from "@prisma/client";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { db } from "@/lib/db";
import Link from "next/link";

type JobResultsProps = {
  filterValues: JobFilterValues;
};

export default async function JobResults({
  filterValues: { q, type, location, remote, skills, category },
}: JobResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const skillsFilter: Prisma.JobWhereInput = skills
    ? {
        requiredSkills: {
          some: {
            skillName: {
              in: skills.split(","),
            },
          },
        },
      }
    : {};
  const categoryFilter: Prisma.JobWhereInput = category
    ? {
        category: {
          naming: {
            equals: category,
          },
        },
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      skillsFilter,
      categoryFilter,
      { approved: false },
    ],
  };

  const jobs = await db.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 place-content-start col-span-2">
      {jobs.map((job: Job) => (
        <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto">
          There is no jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
