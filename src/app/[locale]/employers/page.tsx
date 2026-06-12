import { Job } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import { db } from "@/lib/db";
import Link from "next/link";
import { cache } from "react";
import { Metadata } from "next";
import EmployersListItem from "@/features/employers/components/EmployersListItem";
import EmployerModal from "@/features/employers/components/EmployerModal";
import Styles from "./page.styles";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All employers that have added jobs",
};

const getJobs = cache(async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      companyName: "asc",
    },
    distinct: ["companyName"],
  });
  return jobs;
});

type SearchParamProps = {
  searchParams: Promise<{ companyName?: string }>;
};

export default async function Page({ searchParams }: SearchParamProps) {
  const jobs = await getJobs();
  const { companyName } = await searchParams;

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Typography variant="h1" component="h1" sx={Styles.h1}>
        All employers that have added jobs
      </Typography>
      <Box sx={Styles.grid}>
        {jobs.map((job: Job) => (
          <Link
            key={job.slug}
            href={`/employers/?companyName=${job.companyName}`}
          >
            <EmployersListItem job={job} />
          </Link>
        ))}
        {jobs.length === 0 && (
          <Typography component="p" sx={Styles.empty}>
            There are no employers yet.
          </Typography>
        )}

        {companyName && <EmployerModal companyName={companyName} />}
      </Box>
    </Box>
  );
}
