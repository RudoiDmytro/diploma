"use client";

import { Answer, Assessment } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { evaluateAnswers, submitAssessmentResults } from "./actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface PageProps {
  params: { slug: string };
}

interface Task {
  taskToken: string;
  type: string;
  taskFileUrl: string | null;
  question: string | null;
  ponderation: number;
  assessment_slug: string;
  answers: Answer[];
}

export default function page({ params: { slug } }: PageProps) {
  const form = useForm();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`/api/assessment?slug=${slug}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmitAssessment = async (data) => {
    try {
      console.log(data);
      const userScore = await evaluateAnswers(tasks, data);

      // Example: router.push(`/assessment/${slug}/success`);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      // Show an error message to the user
    }
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <main className="flex flex-col px-4 max-w-7xl m-auto my-10 items-center gap-5 md:items-start">
      <Form {...form}>
        <form onSubmit={handleSubmit(handleSubmitAssessment)}>
          {tasks &&
            tasks.map((taskWithAnswers, index) => (
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
                ) : (
                  taskWithAnswers.taskFileUrl && (
                    <div className="w-full h-full bg-background p-1">
                      <span>There is a problem with the image</span>
                    </div>
                  )
                )}
                <div className="flex flex-col bg-background rounded-md text-primary">
                  <div className="flex flex-row m-2 justify-between">
                    <p className="font-semibold text-md ml-2">Answers</p>
                  </div>
                  {taskWithAnswers.answers.map((answer) => (
                    <div
                      key={answer.answerId}
                      className="flex gap-2 m-1 bg-background justify-between p-3 rounded-md text-primary border-b-2 last:border-b-0 items-center"
                    >
                      <p className="max-w-2xl">{answer.description}</p>
                      <FormField
                        control={control}
                        defaultValue={false}
                        name={`task-${taskWithAnswers.taskToken}.${answer.answerId}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="checkbox"
                                className="h-6 w-6"
                                checked={field.value}
                                onChange={(checked) => {
                                  field.onChange(checked);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
