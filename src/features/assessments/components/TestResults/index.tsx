import { Assessment, Prisma } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import TestListItem from "../TestListItem";
import { TestFilterValues } from "@/lib/validation";
import { db } from "@/lib/db";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Styles from "./styles";

type TestResultsProps = {
  filterValues: TestFilterValues;
};

export default async function TestResults({
  filterValues: { q, type, skills, category },
}: TestResultsProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.AssessmentWhereInput = searchString
    ? {
        OR: [{ title: { search: searchString } }],
      }
    : {};

  const skillsFilter: Prisma.AssessmentWhereInput = skills
    ? {
        skills: {
          some: {
            skillName: {
              in: skills.split(","),
            },
          },
        },
      }
    : {};
  const categoryFilter: Prisma.AssessmentWhereInput = category
    ? {
        category: {
          naming: {
            equals: category,
          },
        },
      }
    : {};

  const where: Prisma.AssessmentWhereInput = {
    AND: [searchFilter, skillsFilter, categoryFilter, { approved: false }],
  };

  const assessment = await db.assessment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  
  const t = await getTranslations("TestLibrary");

  return (
    <Box sx={Styles.grid}>
      {assessment.map((test: Assessment) => (
        <Box
          key={test.slug}
          component={Link}
          href={`/test-library/${test.slug}`}
          sx={Styles.link}
        >
          <TestListItem test={test} />
        </Box>
      ))}
      {assessment.length === 0 && (
        <Typography component="p" sx={Styles.empty}>
          {t("no_assessment")}
        </Typography>
      )}
    </Box>
  );
}
