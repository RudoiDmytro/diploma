import { cache } from "react";
import { db } from "@/lib/db";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, FormLabel, Typography } from "@mui/material";
import JobListItem from "@/components/JobListItem";
import TestListItem from "@/features/assessments/components/TestListItem";
import { Assessment, Job } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import MainCarousel from "@/components/MainCarousel";
import Styles from "./page.styles";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = await getTranslations("Home");
  return {
    title: t("title"),
  };
}

const getRecentJobs = cache(async () => {
  const jobs = await db.job.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return jobs;
});

const getRecentAssessments = cache(async () => {
  const assessments = await db.assessment.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return assessments;
});

export default async function Home() {
  const recentJobs = await getRecentJobs();
  const recentAssessments = await getRecentAssessments();
  const t = await getTranslations("Home");
  const a11y = await getTranslations("A11y");

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box sx={Styles.inner}>
        <Typography variant="h1" component="h1" sx={Styles.title}>
          {t("title")}
        </Typography>

        <Box component="section" sx={Styles.searchSection}>
          <Typography variant="h2" component="h2" sx={Styles.sectionHeading}>
            {t("search")}
          </Typography>
          <Box component="form" role="search" sx={Styles.searchRow} noValidate>
            <FormLabel htmlFor="home-search" sx={Styles.visuallyHidden}>
              {a11y("search")}
            </FormLabel>
            <Box
              component="input"
              id="home-search"
              type="text"
              placeholder={t("searching")}
              sx={Styles.searchInput}
            />
            <Button type="submit" sx={Styles.searchButton}>
              <SearchIcon fontSize="small" aria-hidden="true" />
              {t("searching")}
            </Button>
          </Box>
        </Box>

        <Box component="section" sx={Styles.carouselSection}>
          <Typography variant="h2" component="h2" sx={Styles.sectionHeading}>
            {t("recent_jobs")}
          </Typography>
          <MainCarousel label={t("recent_jobs")}>
            {recentJobs.map((job: Job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}`}
                style={Styles.cardLink}
              >
                <JobListItem job={job} />
              </Link>
            ))}
          </MainCarousel>
        </Box>

        <Box component="section" sx={Styles.carouselSection}>
          <Typography variant="h2" component="h2" sx={Styles.sectionHeading}>
            {t("recent_assessments")}
          </Typography>
          <MainCarousel label={t("recent_assessments")}>
            {recentAssessments.map((test: Assessment) => (
              <Link
                key={test.slug}
                href={`/test-library/${test.slug}`}
                style={Styles.cardLink}
              >
                <TestListItem test={test} />
              </Link>
            ))}
          </MainCarousel>
        </Box>
      </Box>
    </Box>
  );
}
