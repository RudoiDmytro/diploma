import { Job, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import Link from "next/link";
import { cache } from "react";
import EmployersListItem from "../../components/employers/EmployersListItem";
import dynamic from "next/dynamic";
import Loading from "../loading";
import H1 from "@/app/components/ui/h1";

const EmployerModal = dynamic(
  () => import("../../components/employers/EmployerModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

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
  searchParams: Record<string, string> | null | undefined;
};

export default async function page({ searchParams }: SearchParamProps) {
  const jobs = await getJobs();
  const companyName = searchParams?.companyName;

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen text-center">
      <H1>All employers that have added jobs</H1>
      <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1 text-start place-content-start col-span-2">
        {jobs.map((job: Job) => (
          <Link
            key={job.slug}
            href={`/employers/?companyName=${job.companyName}`}
          >
            <EmployersListItem job={job} />
          </Link>
        ))}
        {jobs.length === 0 && (
          <p className="text-center m-auto">There are no employers yet.</p>
        )}

        {companyName && <EmployerModal companyName={companyName} />}
      </div>
    </main>
  );
}
