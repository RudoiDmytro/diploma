import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/app/components/ui/button";
import AddTasks from "@/app/components/test/addTasks";
import { options } from "@/app/components/auth/Options";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getResults, getTasks } from "@/lib/serverUtils";
import TestDetailsPage from "@/app/components/test/TestDetailsPage";

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
  const tasks = await getTasks(slug);
  return (
    <main className="flex flex-col items-center max-lg:w-screen max-w-7xl">
      <div className="flex flex-col px-4 max-w-7xl my-10 w-full lg:flex-row items-center gap-5 lg:items-start">
        <TestDetailsPage task={assessment} />
        <aside className="flex w-fit flex-col gap-5 sticky top-20">
          {!results && tasks.length > 0 && (
            <Button asChild>
              <button className="w-full lg:w-fit">
                <Link href={`/test-library/${slug}/take-assessment`}>
                  Take assingment
                </Link>
              </button>
            </Button>
          )}
          {session?.user.id === assessment.userId && <AddTasks slug={slug} />}
        </aside>
      </div>
    </main>
  );
}
