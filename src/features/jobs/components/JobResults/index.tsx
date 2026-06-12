import { Job, Prisma } from "@prisma/client";
import JobListItem from "@/components/JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Styles from "./styles";

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
  const t = await getTranslations("JobLibrary");

  return (
    <Box sx={Styles.grid}>
      {jobs.map((job: Job) => (
        <Box
          key={job.slug}
          component={Link}
          href={`/jobs/${job.slug}`}
          sx={Styles.link}
        >
          <JobListItem job={job} />
        </Box>
      ))}
      {jobs.length === 0 && (
        <Typography component="p" sx={Styles.empty}>
          {t("no_jobs")}
        </Typography>
      )}
    </Box>
  );
}
