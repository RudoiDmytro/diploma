import { formatDate } from "@/lib/utils";
import {
  getAnswers,
  getAssessment,
  getResults,
  getTasks,
} from "@/lib/serverUtils";
import { Assessment } from "@prisma/client";
import { Box, Stack, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Image from "next/image";
import Markdown from "@/components/Markdown";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth";
import TaskUpdateSection from "../TaskUpdateSection";
import BackButton from "@/components/BackButton";
import Styles from "./styles";

interface TestDetailsPageProps {
  task: Assessment;
}

export default async function TestDetailsPage({
  task: { slug, title, duration, logoUrl, endTime, description, companyName },
}: TestDetailsPageProps) {
  const tasks = await getTasks(slug);
  const tasksArray = tasks.map((task) => task.tasks).flat();
  const taskTokens = tasksArray.map((task) => task.taskToken);
  const answers = await getAnswers(taskTokens);
  const assessment = await getAssessment(slug);
  const session = await getServerSession(options);
  const result = await getResults(session?.user.id as string, slug);

  const answersGroupedByTask = tasksArray.map((task) => ({
    ...task,
    answers: answers.filter((answer) => answer.taskToken === task.taskToken),
  }));

  return (
    <Box sx={Styles.root}>
      <BackButton />
      <Box component="section" sx={Styles.section}>
        <Box sx={Styles.headerCard}>
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={100}
              height={100}
              style={Styles.logo}
            />
          )}
          <Box>
            <Box>
              <Typography variant="h1" component="h1" sx={Styles.title}>
                {title}
              </Typography>
              <Typography component="p" sx={Styles.companyName}>
                <span>{companyName}</span>
              </Typography>
            </Box>
            <Box sx={Styles.meta}>
              <Typography component="p" sx={Styles.metaRow}>
                <WorkIcon aria-hidden sx={Styles.metaIcon} />
                {formatDate(endTime!)}
              </Typography>
              <Typography component="p" sx={Styles.metaRow}>
                <ScheduleIcon aria-hidden sx={Styles.metaIcon} />
                {duration}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={Styles.descriptionCard}>
          {description && <Markdown>{description}</Markdown>}
        </Box>
      </Box>
      {session?.user.id === assessment?.userId && (
        <TaskUpdateSection tasks={answersGroupedByTask} />
      )}
      {result && (
        <Box sx={Styles.resultCard}>
          <Box key={result.resultId} sx={Styles.resultRow}>
            <Typography variant="h2" component="h2" sx={Styles.resultHeading}>
              Your result is {result.score} %
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
