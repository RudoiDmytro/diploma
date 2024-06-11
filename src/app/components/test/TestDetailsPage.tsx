import { formatDate } from "@/lib/utils";
import {
  getAnswers,
  getAssessment,
  getResults,
  getTasks,
} from "@/lib/serverUtils";
import { Assessment } from "@prisma/client";
import { Briefcase, Clock2 } from "lucide-react";
import Image from "next/image";
import Markdown from "../Markdown";
import { getServerSession } from "next-auth";
import { options } from "@/app/components/auth/Options";
import TaskUpdateSection from "./TaskUpdateSection";

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
    <div className="flex flex-col items-center w-full space-y-5">
      <section className="md:w-fit w-full grow space-y-5 p-8 gradient1 rounded-3xl">
        <div className="flex items-center gap-4 bg-background p-5 rounded-xl text-primary">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Company logo"
              width={100}
              height={100}
              className="rounded-xl"
            />
          )}
          <div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="font-semibold">
                <span>{companyName}</span>
              </p>
            </div>
            <div className="text-muted-foreground">
              <p className="flex items-center gap-2">
                <Briefcase size={16} className="shrink-0" />
                {formatDate(endTime!)}
              </p>
              <p className="flex items-center gap-2">
                <Clock2 size={16} className="shrink-0" />
                {duration}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full gap-4 bg-background p-5 rounded-md text-primary">
          {description && <Markdown>{description}</Markdown>}
        </div>
      </section>
      {session?.user.id === assessment?.userId && (
        <TaskUpdateSection tasks={answersGroupedByTask} />
      )}
      {result && (
        <div className="flex flex-col justify-start items-center gap-8 gradient1 w-full md:min-w-[800px] p-8 rounded-3xl">
          <div
            key={result.resultId}
            className="flex flex-row justify-center items-center w-full"
          >
            <h1 className="md:text-5xl text-4xl bg-card bg-clip-text text-transparent font-bold p-1">
              Your result is {result.score} %
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
