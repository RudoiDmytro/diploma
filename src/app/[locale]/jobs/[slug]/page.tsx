import { cache } from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import JobDetailsPage from "@/features/jobs/components/JobDetailsPage";
import Styles from "./page.styles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getJob = cache(async (slug: string) => {
  const job = await db.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();
  return job;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <JobDetailsPage job={job} />
      <Box component="aside">
        <Button
          variant="contained"
          component="a"
          href={applicationLink}
          sx={Styles.applyButton}
        >
          Apply now
        </Button>
      </Box>
    </Box>
  );
}
