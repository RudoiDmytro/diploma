import TestFilterSidebar from "@/components/test/TestFilterSidebar";
import TestResults from "@/components/test/TestResults";
import H1 from "@/components/ui/h1";
import { TestFilterValues } from "@/lib/validation";
import { Metadata } from "next";

type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    category?: string;
  };
};

const getTitle = ({ q, type, category }: TestFilterValues) => {
  const titlePrefix = q
    ? `${q} tasks`
    : type
    ? `${type} tasks`
    : "All tasks";
  const titelSuffix = category ? ` in ${category}` : "";

  return `${titlePrefix}${titelSuffix}`;
};

export const generateMetadata = ({
  searchParams: { q, type, category },
}: PageProps): Metadata => {
  return {
    title: `${getTitle({
      q,
      type,
      category,
    })} | Skills&Work`,
  };
};

export default function TestLibrary({
  searchParams: { q, type, category },
}: PageProps) {
  const filterValues: TestFilterValues = {
    q,
    type,
    category,
  };

  return (
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground"> Complete your assessment</p>
      </div>
      <section className="flex flex-col lg:flex-row gap-3">
        <TestFilterSidebar defaultValues={filterValues} />
        <TestResults filterValues={filterValues} />
      </section>
    </main>
  );
}