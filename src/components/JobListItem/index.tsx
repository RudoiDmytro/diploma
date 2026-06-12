import { Job } from "@prisma/client";
import {
  Payments,
  Work,
  Schedule,
  Public,
  Place,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { formatMoney, formatDate } from "@/lib/utils";
import companyLogoPlaceholder from "@/assets/building-2.svg";
import { db } from "@/lib/db";
import { cache } from "react";
import Styles from "./styles";

type JobListItemProps = {
  job: Job;
};

const getSkills = cache(async (slug: string) => {
  const skills = await db.job.findUnique({
    where: { slug },
    select: { requiredSkills: true },
  });
  return skills?.requiredSkills.slice(0, 3);
});

const getCategoryName = cache(async (categoryId: number) => {
  const categoryName = await db.category.findUnique({
    where: { categoryId },
    select: { naming: true },
  });
  return categoryName?.naming;
});

export default async function JobListItem({
  job: {
    slug,
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    categoryId,
  },
}: JobListItemProps) {
  const skills = await getSkills(slug);
  const categoryName = await getCategoryName(categoryId);
  const skillNames = skills?.map((skill) => skill.skillName);

  return (
    <Box component="article" sx={Styles.card}>
      <Box component="section" sx={Styles.inner}>
        <Box
          component={Image}
          src={companyLogoUrl || companyLogoPlaceholder}
          alt={`${companyName} logo`}
          height={50}
          width={50}
          sx={Styles.logo}
        />
        <Box sx={Styles.body}>
          <Box>
            <Typography component="h2" sx={Styles.jobTitle}>
              {title}
            </Typography>
            <Typography component="p" sx={Styles.companyName}>
              {companyName}
            </Typography>
          </Box>
          <Box sx={Styles.metaList}>
            <Typography component="p" sx={Styles.metaRowMobileOnly}>
              <Work aria-hidden sx={Styles.metaIcon} />
              {type}
            </Typography>
            <Typography component="p" sx={Styles.metaRow}>
              <Place aria-hidden sx={Styles.metaIcon} />
              {locationType}
            </Typography>
            <Typography component="p" sx={Styles.metaRow}>
              <Public aria-hidden sx={Styles.metaIcon} />
              {location || "Worldwide"}
            </Typography>
            <Typography component="p" sx={Styles.metaRow}>
              <Payments aria-hidden sx={Styles.metaIcon} />
              {formatMoney(salary)}
            </Typography>
            <Typography component="p" sx={Styles.metaRowMobileOnly}>
              <Schedule aria-hidden sx={Styles.metaIcon} />
              {formatDate(createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box sx={Styles.aside}>
          <Box sx={Styles.badgeStack}>
            <Typography component="span" sx={Styles.badge}>
              {type}
            </Typography>
            <Typography component="span" sx={Styles.badge}>
              {categoryName}
            </Typography>
          </Box>
          <Box sx={Styles.skillsBox}>
            {skillNames?.map((skillName) => (
              <Box key={skillName} sx={Styles.skillChip}>
                {skillName}
              </Box>
            ))}
          </Box>
          <Stack component="span" sx={Styles.dateRow}>
            <Schedule aria-hidden sx={Styles.metaIcon} />
            {formatDate(createdAt)}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
