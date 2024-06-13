import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cache } from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "../ui/button";
import JobListItem from "../job/JobListItem";
import { Job } from "@prisma/client";

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
    <Dialog open={true}>
      <DialogContent className="w-fit flex flex-col max-w-3xl">
        <DialogHeader>
          <DialogTitle>All jobs from this employer</DialogTitle>
        </DialogHeader>
        {jobs.length > 1 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {jobs.map((job: Job) => (
              <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
                <JobListItem job={job} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1">
            {jobs.map((job: Job) => (
              <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
                <JobListItem job={job} />
              </Link>
            ))}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Link href="/employers">Close</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
