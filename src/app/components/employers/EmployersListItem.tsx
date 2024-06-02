import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Badge from "../Badge";
import { cache } from "react";
import { db } from "@/lib/db";

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
}: EmployersListItemProps) {
  const jobs = await getJobsByCompanyName(companyName);
  const mostFrequentJobType = getMostFrequentJobType(jobs);
  const mostFrequentLocationType = getMostFrequentLocationType(jobs);

  return (
    <article className="gradient1 rounded-3xl p-4 md:h-full">
      <section className="bg-background flex md:h-full rounded-xl p-4 hover:bg-card hover:transition-colors duration-500 ease-in-out">
        <div className="flex flex-row w-full justify-between items-center bg-card text-card-foreground rounded-lg p-3 gap-2">
          <div className="flex flex-col">
            <p className="text-muted-foreground">Company name</p>
            <h2 className="text-xl font-medium">{companyName}</h2>
          </div>
          <div className="flex flex-col text-center border-l border-foreground pl-2">
            <p className="text-muted-foreground text-clip">The most frequent</p>
            <div className="grid grid-cols-2 text-center">
              <p className="text-muted-foreground text-clip">location type</p>
              <p className="text-muted-foreground">job type</p>
              <Badge>{mostFrequentLocationType}</Badge>
              <Badge>{mostFrequentJobType}</Badge>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
