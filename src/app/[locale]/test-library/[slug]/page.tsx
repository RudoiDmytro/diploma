import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/app/components/ui/button";
import AddTasks from "@/app/components/test/addTasks";
import { options } from "@/app/components/auth/Options";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getResults } from "@/lib/serverUtils";
import dynamic from "next/dynamic";
import Loading from "@/app/[locale]/loading";

const TestDetailsPage = dynamic(
  () => import("@/app/components/test/TestDetailsPage"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

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
    <main className="flex flex-col items-center max-md:w-screen max-w-7xl m-auto">
      <div className="flex flex-col px-4 max-w-7xl my-10 w-full md:flex-row items-center gap-5 md:items-start">
        <TestDetailsPage task={assessment} />
        <aside className="flex w-full flex-col gap-5 sticky top-20">
          {!results && (
            <Button asChild>
              <button className="w-full md:w-fit">
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
