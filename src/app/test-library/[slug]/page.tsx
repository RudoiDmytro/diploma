import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import TestDetailsPage from "@/components/test/TestDetailsPage";
import AddTasks from "@/components/test/addTasks";
import { options } from "@/components/auth/Options";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getResults } from "@/lib/serverUtils";

interface PageProps {
  params: { slug: string };
}

const getAssessment = cache(async (slug: string) => {
  const assessment = await db.assessment.findUnique({
    where: { slug },
  });

  if (!assessment) notFound();
  return assessment;
});

export async function generateStaticParams() {
  const assessments = await db.assessment.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return assessments.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const assessment = await getAssessment(slug);

  return {
    title: assessment.title,
  };
}

export default async function page({ params: { slug } }: PageProps) {
  const assessment = await getAssessment(slug);
  const session = await getServerSession(options);
  const results = await getResults(session?.user.id as string, slug);

  return (
    <div className="flex flex-col items-center  max-w-7xl m-auto">
      <main className="flex flex-col px-4 max-w-7xl m-auto my-10 md:flex-row items-center gap-5 md:items-start">
        <TestDetailsPage task={assessment} />
        <aside className="flex flex-col gap-5 sticky top-20">
          {!results && (
            <Button asChild>
              <button className="w-40 md:w-fit">
                <Link href={`/test-library/${slug}/take-assessment`}>
                  Take assingment
                </Link>
              </button>
            </Button>
          )}
          {session?.user.id === assessment.userId && <AddTasks slug={slug} />}
        </aside>
      </main>
    </div>
  );
}
