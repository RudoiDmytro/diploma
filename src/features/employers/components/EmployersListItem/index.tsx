import { Job } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import Badge from "@/components/Badge";
import { cache } from "react";
import { db } from "@/lib/db";
import Styles from "./styles";

type EmployersListItemProps = {
  job: Job;
};

const getJobsByCompanyName = cache(async (companyName: string) => {
  const jobs = await db.job.findMany({
    where: { companyName },
  });
  return jobs;
});

function getMostFrequentJobType(jobs: Job[]): string {
  const jobTypes: Record<string, number> = {};

  jobs.forEach((job) => {
    const jobType = job.type;
    jobTypes[jobType] = (jobTypes[jobType] || 0) + 1;
  });

  let maxCount = 0;
  let mostFrequentType = "";

  for (const jobType in jobTypes) {
    if (jobTypes[jobType] > maxCount) {
      maxCount = jobTypes[jobType];
      mostFrequentType = jobType;
    }
  }

  return mostFrequentType;
}

function getMostFrequentLocationType(jobs: Job[]): string {
  const locationTypes: Record<string, number> = {};

  jobs.forEach((job) => {
    const locationType = job.locationType;
    locationTypes[locationType] = (locationTypes[locationType] || 0) + 1;
  });

  let maxCount = 0;
  let mostFrequentType = "";

  for (const locationType in locationTypes) {
    if (locationTypes[locationType] > maxCount) {
      maxCount = locationTypes[locationType];
      mostFrequentType = locationType;
    }
  }

  return mostFrequentType;
}

export default async function EmployersListItem({
  job: { companyName },
}: EmployersListItemProps) {
  const jobs = await getJobsByCompanyName(companyName);
  const mostFrequentJobType = getMostFrequentJobType(jobs);
  const mostFrequentLocationType = getMostFrequentLocationType(jobs);

  return (
    <Box component="article" sx={Styles.card}>
      <Box component="section" sx={Styles.inner}>
        <Box sx={Styles.body}>
          <Box sx={Styles.nameColumn}>
            <Typography component="p" sx={Styles.label}>
              Company name
            </Typography>
            <Typography component="h2" sx={Styles.companyName}>
              {companyName}
            </Typography>
          </Box>
          <Box sx={Styles.frequentColumn}>
            <Typography component="p" sx={Styles.label}>
              The most frequent
            </Typography>
            <Box sx={Styles.frequentGrid}>
              <Typography component="p" sx={Styles.label}>
                location type
              </Typography>
              <Typography component="p" sx={Styles.label}>
                job type
              </Typography>
              <Badge>{mostFrequentLocationType}</Badge>
              <Badge>{mostFrequentJobType}</Badge>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
