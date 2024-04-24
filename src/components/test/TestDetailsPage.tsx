import { formatDate, formatMoney } from "@/lib/utils";
import { Assessment, Task } from "@prisma/client";
import { Banknote, Briefcase, Clock2, Globe2 } from "lucide-react";
import Image from "next/image";
import Markdown from "../Markdown";
import { cache } from "react";
import { db } from "@/lib/db";

interface TestDetailsPageProps {
  task: Assessment;
}

const getTasks = cache(async (slug: string) => {
  const task = await db.assessment.findMany({
    where: { slug },
    select: { tasks: true },
  });
  return task;
});

const getAnswers = cache(async (taskTokens: string[]) => {
  const answers = await Promise.all(
    taskTokens.map(async (taskToken) => {
      const taskAnswers = await db.answer.findMany({
        where: { taskToken },
      });
      return taskAnswers;
    })
  );
  return answers.flat();
});

export default async function TestDetailsPage({
  task: { slug, title, duration, logoUrl, endTime, description, companyName },
}: TestDetailsPageProps) {
  const tasks = await getTasks(slug);
  const tasksArray = tasks.map((task) => task.tasks).flat();
  const taskTokens = tasksArray.map((task) => task.taskToken);
  const answers = await getAnswers(taskTokens);

  const answersGroupedByTask = tasksArray.map((task) => ({
    ...task,
    answers: answers.filter((answer) => answer.taskToken === task.taskToken),
  }));

  return (
    <div className="flex flex-col items-center space-y-5">
      <section className="w-fit grow space-y-5 p-10 bg-gradient rounded-3xl ">
        <div className="flex items-center gap-4 m-5 bg-background p-5 rounded-xl text-primary">
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
        <div className="flex items-center gap-4 m-5 bg-background p-5 rounded-md text-primary">
          {description && <Markdown>{description}</Markdown>}
        </div>
      </section>
      <h1 className="text-xl font-bold">Tasks</h1>
      {answersGroupedByTask.map((taskWithAnswers, index) => (
        <section key={taskWithAnswers.taskToken} className="w-full grow space-y-5 p-10 bg-gradient rounded-3xl ">
          <div className="flex items-center gap-4 bg-background p-5 rounded-xl text-primary">
            <div>
              <div>
                <p className="font-semibold">
                  <span>
                    {taskWithAnswers.type === "problem" ? "Problem" : "Test"} question №
                    {index + 1}
                  </span>
                </p>
              </div>
              <div className="text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span>Ponderation is {taskWithAnswers.ponderation}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    The question is: <br />{" "}
                    <span className="font-semibold text-base bg-gradient rounded-md p-1 text-background">
                      {taskWithAnswers.question}
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-background rounded-md text-primary">
            <div className="flex flex-row m-2 justify-between">
              <p className="font-semibold text-md ml-2">Multiple Answers</p>
              <p className="font-semibold text-md mr-2">Correct</p>
            </div>
            {taskWithAnswers.answers.map((answer) => (
              <div
                key={answer.answerId}
                className="flex gap-1 m-1 bg-background justify-between p-5 rounded-md text-primary"
              >
                <p>{answer.description}</p>
                <p>
                  <input
                    type="checkbox"
                    className="pointer-events-none w-6 h-6 accent-red-500  bg-gray-100 border-gray-300 rounded dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    id="correct"
                    checked={answer.correct}
                  />
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
