import { cache } from "react";
import { db } from "@/shared/lib/db";
import dynamic from "next/dynamic";
import Loading from "./loading";
import JobListItem from "@/widgets/job/ui/JobListItem";
import TestListItem from "@/widgets/test/ui/TestListItem";
import { CarouselItem } from "@/shared/ui/carousel";
import { Assessment, Job } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import HomeSearch from "@/widgets/search/ui/HomeSearch";

const MainCarousel = dynamic(() => import("@/shared/ui/MainCarousel"), {
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

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const recentJobs = await getRecentJobs();
  const recentAssessments = await getRecentAssessments();
  const t = await getTranslations("Home");

  return (
    <main className="flex flex-col items-center max-md:w-screen w-full max-w-7xl m-auto">
      <div className="flex flex-col px-5 max-w-7xl my-10 w-full items-center gap-5">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 max-2xl:px-10">
            {t("search")}
          </h2>
          <HomeSearch
            locale={locale}
            placeholder={t("searching")}
            buttonLabel={t("searching")}
          />
        </div>
        <div className="mb-8 justify-between w-full m-auto max-2xl:px-10">
          <h2 className="text-2xl font-semibold mb-4">{t("recent_jobs")}</h2>
          <MainCarousel>
            {recentJobs.map((job: Job) => (
              <CarouselItem key={job.slug} className="lg:basis-1/2">
                <Link key={job.slug} href={`/jobs/${job.slug}`} className="block">
                  <JobListItem job={job} />
                </Link>
              </CarouselItem>
            ))}
          </MainCarousel>
        </div>
        <div className="mb-8 justify-between w-full m-auto max-2xl:px-10">
          <h2 className="text-2xl font-semibold mb-4">
            {t("recent_assessments")}
          </h2>
          <MainCarousel>
            {recentAssessments.map((test: Assessment) => (
              <CarouselItem key={test.slug} className="lg:basis-1/2">
                <Link
                  key={test.slug}
                  href={`/test-library/${test.slug}`}
                  className="block"
                >
                  <TestListItem test={test} />
                </Link>
              </CarouselItem>
            ))}
          </MainCarousel>
        </div>
      </div>
    </main>
  );
}
