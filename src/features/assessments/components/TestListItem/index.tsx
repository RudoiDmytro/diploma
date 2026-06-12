import { Assessment } from "@prisma/client";
import Schedule from "@mui/icons-material/Schedule";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/Badge";
import { cache } from "react";
import { db } from "@/lib/db";
import companyLogoPlaceholder from "@/assets/building-2.svg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Styles from "./styles";

type TestListItemProps = {
  test: Assessment;
};

const getSkills = cache(async (slug: string) => {
  const skills = await db.assessment.findUnique({
    where: { slug },
    select: { skills: true },
  });
  return skills?.skills.slice(0, 3);
});

const getCategoryName = cache(async (categoryId: number) => {
  const categoryName = await db.category.findUnique({
    where: { categoryId },
    select: { naming: true },
  });
  return categoryName?.naming;
});

export default async function TestListItem({
  test: { slug, title, categoryId, duration, logoUrl, endTime },
}: TestListItemProps) {
  const skills = await getSkills(slug);
  const categoryName = await getCategoryName(categoryId);

  const skillNames = skills?.map((skill) => skill.skillName);
  const t = await getTranslations("TestLibrary");

  return (
    <Box component="article" sx={Styles.card}>
      <Box component="section" sx={Styles.inner}>
        <Box sx={Styles.logo}>
          <Image
            src={logoUrl || companyLogoPlaceholder}
            alt={`${title} logo`}
            height={50}
            width={50}
            style={{ borderRadius: "0.5rem", display: "block" }}
          />
        </Box>
        <Box sx={Styles.details}>
          <Typography component="h2" sx={Styles.title}>
            {title}
          </Typography>
          <Box component="p" sx={Styles.metaRow}>
            <Schedule aria-hidden sx={Styles.metaIcon} />
            {formatDate(endTime!)}
          </Box>
          <Box component="p" sx={Styles.metaRow}>
            <Schedule aria-hidden sx={Styles.metaIcon} />
            {duration} {t("min")}
          </Box>
        </Box>
        <Stack sx={Styles.sideColumn}>
          <Box sx={Styles.categoryBox}>
            <Badge>{categoryName}</Badge>
          </Box>
          <Box sx={Styles.skillsBox}>
            {skillNames?.map((skillName) => (
              <Box key={skillName} sx={Styles.skillChip}>
                {skillName}
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
