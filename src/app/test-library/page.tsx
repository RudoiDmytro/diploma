import TestFilterSidebar from "@/components/test/TestFilterSidebar";
import TestResults from "@/components/test/TestResults";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { TestFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Link from "next/link";

type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    category?: string;
    skills?: string;
  };
};

const getTitle = ({ q, type, category, skills }: TestFilterValues) => {
  const titlePrefix = q
    ? `${q} tasks`
    : type
    ? `${type} tasks`
    : skills
    ? `${skills} tasks`
    : category
    ? `${category} tasks`
    : "All tasks";
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}`;
};

export const generateMetadata = ({
  searchParams: { q, type, category, skills },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      skills,
      category,
    })} | Skills&Work`,
  };
};

export default function TestLibrary({
  searchParams: { q, type, category, skills },
}: PageProps) {
  const filterValues: TestFilterValues = {
    q,
    type,
    category,
    skills,
  };

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="relative space-y-5 text-center flex flex-row max-md:flex-col px-4 m-auto items-center justify-center">
        <div>
          <H1>{getTitle(filterValues)}</H1>
          <p className="text-muted-foreground"> Complete your assessment</p>
        </div>
        <aside className="md:absolute md:right-0">
          <Button asChild>
            <Link href="/test-library/new" className="w-40 md:w-fit">
              Add new task
            </Link>
          </Button>
        </aside>
      </div>
      <section className="flex flex-col space-y-3 lg:flex-row-reverse gap-3">
        <TestFilterSidebar defaultValues={filterValues} />
        <TestResults filterValues={filterValues} />
      </section>
    </main>
  );
}
