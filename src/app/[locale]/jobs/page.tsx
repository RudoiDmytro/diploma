import JobFilterSidebar from "@/features/jobs/components/JobFilterSidebar";
import JobResults from "@/features/jobs/components/JobResults";
import { Box, Button, Typography } from "@mui/material";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Link from "next/link";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Styles from "./page.styles";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    skills?: string;
    category?: string;
  }>;
  params: Promise<{ locale: string }>;
};

const getTitle = async ({
  q,
  type,
  location,
  remote,
  skills,
  category,
}: JobFilterValues) => {
  const t = await getTranslations("JobLibrary");
  const titlePrefix = q
    ? `${q} ${t("title")}`
    : type
    ? `${type} ${t("title")}`
    : remote
    ? `${t("remote")}`
    : skills
    ? `${skills} ${t("title")}`
    : category
    ? `${category} ${t("title")}`
    : `${t("all")}`;
  const titelSuffix = location ? ` in ${location}` : "";
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}${titelSuffix}`;
};

export const generateMetadata = async ({
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { q, type, location, remote, skills, category } = await searchParams;
  return {
    title: `${await getTitle({
      q,
      type,
      location,
      skills,
      category,
      remote: remote === "true",
    })}`,
  };
};

export default async function Jobs({ searchParams, params }: PageProps) {
  const { q, type, location, remote, skills, category } = await searchParams;
  const { locale } = await params;
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    skills,
    category,
    remote: remote == "true",
  };

  const session = await getServerSession(options);
  const t = await getTranslations("JobLibrary");

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box component="header" sx={Styles.header}>
        <Box>
          <Typography variant="h1" component="h1" sx={Styles.h1}>
            {await getTitle(filterValues)}
          </Typography>
          <Typography component="p" sx={Styles.subtitle}>
            {t("find")}
          </Typography>
        </Box>
        <Box component="aside" sx={Styles.headerAside}>
          {session?.user.role === "EMPLOYER" ? (
            <Button
              variant="contained"
              component={Link}
              href="/jobs/new"
              locale={locale}
              sx={Styles.addLink}
            >
              {t("add_new")}
            </Button>
          ) : !session ? (
            <Box component="details" sx={Styles.infoDisclosure}>
              <Box component="summary" sx={Styles.triggerButton}>
                {t("add_new")}
              </Box>
              <Typography component="p" sx={Styles.infoPopover}>
                {t("to_add_new")}
              </Typography>
            </Box>
          ) : (
            <Box component="details" sx={Styles.infoDisclosure}>
              <Box component="summary" sx={Styles.triggerButton}>
                {t("add_new")}
              </Box>
              <Typography component="p" sx={Styles.infoPopover}>
                {t("to_add_new_emp")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box component="section" sx={Styles.resultsSection}>
        <Box sx={Styles.mobileFilterWrap}>
          <Box component="details" sx={Styles.filterDisclosure}>
            <Box component="summary" sx={Styles.filterSummary}>
              {t("filter")}
            </Box>
            <JobFilterSidebar defaultValues={filterValues} />
          </Box>
        </Box>
        <Box sx={Styles.desktopFilterWrap}>
          <JobFilterSidebar defaultValues={filterValues} />
        </Box>
        <JobResults filterValues={filterValues} />
      </Box>
    </Box>
  );
}
