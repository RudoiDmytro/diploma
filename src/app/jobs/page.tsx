import JobFilterSidebar from "@/components/job/JobFilterSidebar";
import JobResults from "@/components/job/JobResults";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Link from "next/link";

type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    skills?: string;
    category?: string;
  };
};

const getTitle = ({
  q,
  type,
  location,
  remote,
  skills,
  category,
}: JobFilterValues) => {
  const titlePrefix = q
    ? `${q} jobs`
    : type
    ? `${type} jobs`
    : remote
    ? `Remote jobs`
    : skills
    ? `${skills} jobs`
    : category
    ? `${category} jobs`
    : "All jobs";
  const titelSuffix = location ? ` in ${location}` : "";
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}${titelSuffix}`;
};

export const generateMetadata = ({
  searchParams: { q, type, location, remote, skills, category },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      skills,
      category,
      remote: remote === "true",
    })}`,
  };
};

export default function Jobs({
  searchParams: { q, type, location, remote, skills, category },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    skills,
    category,
    remote: remote == "true",
  };

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="relative space-y-5 text-center flex flex-row max-md:flex-col px-4 m-auto items-center justify-center">
        <div>
          <H1>{getTitle(filterValues)}</H1>
          <p className="text-muted-foreground"> Find your dream job</p>
        </div>
        <aside className="md:absolute md:right-0">
          <Button asChild>
            <Link href="/jobs/new" className="w-40 md:w-fit">
              Add new job
            </Link>
          </Button>
        </aside>
      </div>
      <section className="grid grid-flow-col auto-cols-auto gap-3 lg:flex-row ">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
