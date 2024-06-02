import { Assessment, Job } from "@prisma/client";
import { cache } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestListItem from "../components/test/TestListItem";
import JobListItem from "../components/job/JobListItem";
import { db } from "@/lib/db";

const getRecentJobs = cache(async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return jobs;
});

const getRecentAssessments = cache(async () => {
  const assessments = await db.assessment.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return assessments;
});

export default async function Home() {
  const recentJobs = await getRecentJobs();
  const recentAssessments = await getRecentAssessments();

  return (
    <main className="flex flex-col items-center max-md:w-screen w-full max-w-7xl m-auto">
      <div className="flex flex-col px-5 max-w-7xl my-10 w-full items-center gap-5">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 px-10">
            Search Job or Assessment
          </h2>
          <div className="flex px-10">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>
        <div className="mb-8 justify-between w-full m-auto px-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>
          <Carousel className="w-full ">
            <CarouselContent>
              {recentJobs.map((job: Job) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <JobListItem key={job.slug} job={job} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mb-8 justify-between w-full m-auto px-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Assessments</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {recentAssessments.map((assessment: Assessment) => (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <TestListItem key={assessment.slug} test={assessment} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </main>
  );
}
