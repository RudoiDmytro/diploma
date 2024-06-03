import { cache } from "react";
import { db } from "@/lib/db";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import JobListItem from "@/app/components/job/JobListItem";
import TestListItem from "@/app/components/test/TestListItem";
import { CarouselItem } from "@/app/components/ui/carousel";
import { Assessment, Job } from "@prisma/client";
import { getJobAnalysisData } from "../components/dashboard/analysis/actions";
import { Line } from "react-chartjs-2";

const MainCarousel = dynamic(() => import("../components/MainCarousel"), {
  ssr: false,
  loading: () => <Loading />,
});

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
  const chartData = await getJobAnalysisData();

  return (
    <main className="flex flex-col items-center max-md:w-screen w-full max-w-7xl m-auto">
      <div className="flex flex-col px-5 max-w-7xl my-10 w-full items-center gap-5">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Website</h1>
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 max-2xl:px-10">
            Search Job or Assessment
          </h2>
          <div className="flex max-2xl:px-10">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-2 py-2 justify-evenly flex flex-row gradient1 text-background rounded-r-lg hover:gradient2 focus:outline-none">
              <Search />
              Search
            </button>
          </div>
        </div>
        <div className="mb-8 justify-between w-full m-auto max-2xl:px-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Jobs</h2>
          <MainCarousel>
            {recentJobs.map((job: Job) => (
              <CarouselItem
                key={job.slug}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <JobListItem job={job} />
              </CarouselItem>
            ))}
          </MainCarousel>
        </div>
        <div className="mb-8 justify-between w-full m-auto max-2xl:px-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Assessments</h2>
          <MainCarousel>
            {recentAssessments.map((test: Assessment) => (
              <CarouselItem
                key={test.slug}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <TestListItem test={test} />
              </CarouselItem>
            ))}
          </MainCarousel>
        </div>
        {/* <Line data={chartData} /> */}
      </div>
    </main>
  );
}
