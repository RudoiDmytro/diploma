import TestFilterSidebar from "@/features/assessments/components/TestFilterSidebar";
import TestResults from "@/features/assessments/components/TestResults";
import { TestFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import Link from "next/link";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddNewPopover from "./AddNewPopover";
import FilterDrawer from "./FilterDrawer";
import Styles from "./page.styles";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    skills?: string;
  }>;
  params: Promise<{ locale: string }>;
};

const getTitle = async ({ q, type, category, skills }: TestFilterValues) => {
  const t = await getTranslations("TestLibrary");

  const titlePrefix = q
    ? `${q} ${t("title")}`
    : type
    ? `${type}  ${t("title")}`
    : skills
    ? `${skills}  ${t("title")}`
    : category
    ? `${category}  ${t("title")}`
    : ` ${t("all")}`;
  const title =
    skills && category ? `${category}, ${titlePrefix}` : titlePrefix;

  return `${title}`;
};

export const generateMetadata = async ({
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { q, type, category, skills } = await searchParams;
  return {
    title: `${await getTitle({
      q,
      type,
      skills,
      category,
    })}`,
  };
};

export default async function TestLibrary({ searchParams, params }: PageProps) {
  const { q, type, category, skills } = await searchParams;
  const { locale } = await params;
  const filterValues: TestFilterValues = {
    q,
    type,
    category,
    skills,
  };
  const session = await getServerSession(options);
  const t = await getTranslations("TestLibrary");

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box component="header" sx={Styles.header}>
        <Box>
          <Typography variant="h1" component="h1" sx={Styles.heading}>
            {await getTitle(filterValues)}
          </Typography>
          <Typography component="p" sx={Styles.subtitle}>
            {t("complete")}
          </Typography>
        </Box>
        <Box component="aside" sx={Styles.headerAside}>
          {session?.user.role === "EMPLOYER" ? (
            <Button
              component={Link}
              href="/test-library/new"
              locale={locale}
              variant="contained"
              sx={Styles.addNewLinkButton}
            >
              {t("add_new")}
            </Button>
          ) : !session ? (
            <AddNewPopover label={t("add_new")} message={t("to_add_new")} />
          ) : (
            <AddNewPopover label={t("add_new")} message={t("to_add_new_emp")} />
          )}
        </Box>
      </Box>
      <Stack component="section" sx={Styles.section}>
        <FilterDrawer label={t("filter")}>
          <TestFilterSidebar defaultValues={filterValues} />
        </FilterDrawer>
        <Box sx={Styles.desktopSidebar}>
          <TestFilterSidebar defaultValues={filterValues} />
        </Box>
        <TestResults filterValues={filterValues} />
      </Stack>
    </Box>
  );
}
