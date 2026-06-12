import { cache } from "react";
import { Box } from "@mui/material";
import { db } from "@/lib/db";
import Link from "next/link";
import JobListItem from "@/components/JobListItem";
import { Job } from "@prisma/client";
import EmployerModalDialog from "../EmployerModalDialog";
import Styles from "./styles";

const getJobsByCompanyName = cache(async (companyName: string) => {
  const jobs = await db.job.findMany({
    where: { companyName },
  });
  return jobs;
});

type EmployerModalProps = {
  companyName: string;
};

export default async function EmployerModal({
  companyName,
}: EmployerModalProps) {
  const jobs = await getJobsByCompanyName(companyName);

  if (!jobs) {
    return null;
  }

  return (
    <EmployerModalDialog hasMultipleJobs={jobs.length > 1}>
      {jobs.map((job: Job) => (
        <Box
          key={job.slug}
          component={Link}
          href={`/jobs/${job.slug}`}
          sx={Styles.jobLink}
        >
          <JobListItem job={job} />
        </Box>
      ))}
    </EmployerModalDialog>
  );
}
