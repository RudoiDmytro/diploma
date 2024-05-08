import { formatDate, formatMoney } from "@/lib/utils";
import { Assessment, Task } from "@prisma/client";
import { Banknote, Briefcase, Clock2, Globe2 } from "lucide-react";
import Image from "next/image";
import Markdown from "../Markdown";
import { cache } from "react";
import { db } from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getServerSession } from "next-auth";

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
  const data = await getServerSession();

  const answersGroupedByTask = tasksArray.map((task) => ({
    ...task,
    answers: answers.filter((answer) => answer.taskToken === task.taskToken),
  }));

  return (
    <div className="flex flex-col items-center space-y-5">
      <section className="w-fit grow space-y-5 p-8 gradient1 rounded-3xl">
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
      <div className="flex flex-col justify-start items-center gap-8 gradient1 min-w-[800px] p-8 rounded-3xl">
        {answersGroupedByTask.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-background">
                <h1 className="text-5xl bg-card bg-clip-text text-transparent font-bold p-1">
                  Tasks
                </h1>
              </AccordionTrigger>
              <AccordionContent>
                {answersGroupedByTask &&
                  answersGroupedByTask.map((taskWithAnswers, index) => (
                    <section
                      key={taskWithAnswers.taskToken}
                      className="w-full grow space-y-5 p-5 bg-card rounded-3xl mb-5"
                    >
                      <div className="flex items-center justify-between gap-4 bg-background p-5 rounded-xl text-primary">
                        <div>
                          <div>
                            <p className="font-semibold">
                              <span>
                                {taskWithAnswers.type === "problem"
                                  ? "Problem"
                                  : "Test"}{" "}
                                question №{index + 1}
                              </span>
                            </p>
                          </div>
                          <div className="text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <span>
                                Ponderation is {taskWithAnswers.ponderation}
                              </span>
                            </p>
                            <p className="flex flex-col items-start gap-2 w-full">
                              <span>
                                The question is: <br />{" "}
                              </span>
                              <span className="font-semibold text-card-foreground p-2 bg-card rounded-xl ">
                                {taskWithAnswers.question}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      {taskWithAnswers.taskFileUrl &&
                      /\.(png|jpe?g)$/i.test(taskWithAnswers.taskFileUrl) ? (
                        <div className="relative w-[800px] h-[600px]">
                          <Image
                            src={taskWithAnswers.taskFileUrl}
                            alt={`${taskWithAnswers.question} logo`}
                            className="rounded-lg self-center bg-background p-1"
                            fill
                          />
                        </div>
                      ) : taskWithAnswers.taskFileUrl && (
                        <div className="w-full h-full bg-background p-1">
                          <span>
                            There is no image for this question added or there
                            is a problem with the image
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col bg-background rounded-md text-primary">
                        <div className="flex flex-row m-2 justify-between">
                          <p className="font-semibold text-md ml-4">Answers</p>
                          <p className="font-semibold text-md mr-2">
                            Correctness
                          </p>
                        </div>
                        {taskWithAnswers.answers.map((answer) => (
                          <div
                            key={answer.answerId}
                            className="flex gap-2 m-1 bg-background justify-between p-3 rounded-md text-primary border-b-2 last:border-b-0 items-center"
                          >
                            <p className="max-w-2xl">{answer.description}</p>
                            <p>
                              <input
                                type="checkbox"
                                className="pointer-events-none w-6 h-6 accent-card dark:accent-card-foreground bg-card-foreground dark:bg-card border-gray-300 rounded "
                                id="correct"
                                readOnly
                                checked={answer.correct}
                              />
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <h1 className="text-5xl bg-card bg-clip-text text-transparent font-bold p-1">
            There will be your tasks
          </h1>
        )}
      </div>
    </div>
  );
}
