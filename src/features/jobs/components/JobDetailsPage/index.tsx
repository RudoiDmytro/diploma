import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import Payments from "@mui/icons-material/Payments";
import Work from "@mui/icons-material/Work";
import Public from "@mui/icons-material/Public";
import Place from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import Markdown from "@/components/Markdown";
import BackButton from "@/components/BackButton";
import Styles from "./styles";

interface JobDetailsPageProps {
  job: Job;
}

export default function JobDetailsPage({
  job: {
    title,
    type,
    companyName,
    companyLogoUrl,
    location,
    locationType,
    applicationUrl,
    description,
    salary,
    slug,
  },
}: JobDetailsPageProps) {
  return (
    <Box component="section" sx={Styles.section}>
      <BackButton />
      <Box component="header" sx={Styles.header}>
        {companyLogoUrl && (
          <Box sx={Styles.logo}>
            <Image
              src={`/assets/${slug}.jpg`}
              alt={`${companyName} logo`}
              width={200}
              height={200}
              style={{ display: "block", borderRadius: "0.5rem" }}
            />
          </Box>
        )}
        <Box>
          <Box>
            <Typography variant="h1" component="h1" sx={Styles.title}>
              {title}
            </Typography>
            <Typography component="p" sx={Styles.companyName}>
              {applicationUrl ? (
                <Box
                  component={Link}
                  href={new URL(applicationUrl).origin}
                  sx={Styles.companyLink}
                >
                  {companyName}
                </Box>
              ) : (
                <Box component="span">{companyName}</Box>
              )}
            </Typography>
          </Box>
          <Box sx={Styles.meta}>
            <Typography component="p" sx={Styles.metaRow}>
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
          </Box>
        </Box>
      </Box>
      <Box>{description && <Markdown>{description}</Markdown>}</Box>
    </Box>
  );
}
