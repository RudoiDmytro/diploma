import JobFilterSidebar from "@/components/job/JobFilterSidebar";
import JobResults from "@/components/job/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
};

const getTitle = ({ q, type, location, remote }: JobFilterValues) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} jobs`
    : remote
    ? `Remote jobs`
    : "All jobs";
  const titelSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titelSuffix}`;
};

export const generateMetadata = ({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Skills&Work`,
  };
};

export default function TestLibrary({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote == "true",
  };

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground"> Find your dream job</p>
      </div>
      <section className="flex flex-col lg:flex-row gap-3">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}