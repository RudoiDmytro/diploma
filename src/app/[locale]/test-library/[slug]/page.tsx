import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Box, Button } from "@mui/material";
import AddTasks from "@/features/assessments/components/addTasks";
import { options } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getResults, getTasks } from "@/lib/serverUtils";
import TestDetailsPage from "@/features/assessments/components/TestDetailsPage";
import Styles from "./page.styles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getAssessment = cache(async (slug: string) => {
  const assessment = await db.assessment.findUnique({
    where: { slug },
  });

  if (!assessment) notFound();
  return assessment;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const assessment = await getAssessment(slug);

  return {
    title: `${assessment.title} — Assessment`,
  };
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const assessment = await getAssessment(slug);
  const session = await getServerSession(options);
  const results = await getResults(session?.user.id as string, slug);
  const tasks = await getTasks(slug);
  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box sx={Styles.layout}>
        <TestDetailsPage task={assessment} />
        <Box component="aside" sx={Styles.aside}>
          {!results && tasks.length > 0 && (
            <Button
              variant="contained"
              component={Link}
              href={`/test-library/${slug}/take-assessment`}
              sx={Styles.takeButton}
            >
              Take assingment
            </Button>
          )}
          {session?.user.id === assessment.userId && <AddTasks slug={slug} />}
        </Box>
      </Box>
    </Box>
  );
}
