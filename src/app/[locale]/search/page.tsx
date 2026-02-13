import { cache } from "react";
import Link from "next/link";
import { db } from "@/shared/lib/db";

type SearchPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

const searchJobs = cache(async (q: string) =>
  db.job.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { slug: true, title: true, companyName: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  })
);

const searchAssessments = cache(async (q: string) =>
  db.assessment.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { slug: true, title: true, companyName: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  })
);

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const { q = "" } = await searchParams;
  const query = q.trim();

  if (!query) {
    return (
      <main className="max-w-5xl w-full mx-auto px-4 py-10 min-h-screen">
        <h1 className="text-3xl font-bold">Search</h1>
        <p className="text-muted-foreground mt-2">Enter a query to search jobs and assessments.</p>
      </main>
    );
  }

  const [jobs, assessments] = await Promise.all([
    searchJobs(query),
    searchAssessments(query),
  ]);

  return (
    <main className="max-w-5xl w-full mx-auto px-4 py-10 space-y-8 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Search results</h1>
        <p className="text-muted-foreground mt-2">for "{query}"</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Jobs ({jobs.length})</h2>
        {jobs.length === 0 ? (
          <p className="text-muted-foreground">No jobs found.</p>
        ) : (
          <div className="space-y-2">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                href={`/${locale}/jobs/${job.slug}`}
                className="block border rounded-md p-3 hover:bg-muted"
              >
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.companyName}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Assessments ({assessments.length})</h2>
        {assessments.length === 0 ? (
          <p className="text-muted-foreground">No assessments found.</p>
        ) : (
          <div className="space-y-2">
            {assessments.map((assessment) => (
              <Link
                key={assessment.slug}
                href={`/${locale}/test-library/${assessment.slug}`}
                className="block border rounded-md p-3 hover:bg-muted"
              >
                <p className="font-medium">{assessment.title}</p>
                <p className="text-sm text-muted-foreground">{assessment.companyName}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
