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
} from "@/app/components/ui/form";
import LoadingButton from "@/app/components/LoadingButton";
import { Input } from "@/app/components/ui/input";
import CountdownTimer from "@/app/components/test/countdown/Countdown";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

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
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/take-assessment")) {
      localStorage.removeItem("remainingTime");
    }
  }, [pathname]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [assessment, setAssessment] = useState<Assessment>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [countdownTimer, setCountdownTimer] = useState(5);

  const [inactivityTimer, setInactivityTimer] = useState(30);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setShowModal2(true);
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      setShowModal2(true);
    };

    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      setInactivityTimer(
        window.setTimeout(() => {
          setShowModal2(true);
        }, 30000)
      );
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('touchstart', handleUserActivity);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('touchstart', handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, [inactivityTimer]);

  useEffect(() => {
    let timeout;

    setCountdownTimer(5);

    if (showModal2) {
      timeout = setTimeout(() => {
        localStorage.removeItem("remainingTime");
        router.push("/test-library");
      }, 5000);

      const interval = setInterval(() => {
        setCountdownTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [showModal2, router]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response1 = await fetch(`/api/assessment/tasks?slug=${slug}`, {
          method: "GET",
        });
        if (!response1.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data1 = await response1.json();
        setTasks(data1);

        const response2 = await fetch(`/api/assessment?slug=${slug}`, {
          method: "GET",
        });

        if (!response2.ok) {
          throw new Error("Failed to fetch assessment");
        }

        const data2 = await response2.json();
        setAssessment(data2);
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

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
    };

    const handleMouseOut = () => {
      timeoutId = setTimeout(() => {
        setShowModal2(true);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmitAssessment = async (data) => {
    try {
      const userScore = evaluateAnswers(tasks, data);
      submitAssessmentResults(slug, userScore);
    } catch (error) {
      console.error("Error submitting assessment:", error);
    } finally {
      setShowModal1(true);
      localStorage.removeItem("remainingTime");
    }
  };

  const handleExpire = () => {
    handleSubmit(handleSubmitAssessment)();
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <main
      className="flex flex-col max-md:w-screen md:max-w-7xl"
      onMouseLeave={() => setShowModal2(true)}
      onTouchCancelCapture={() => setShowModal2(true)}
    >
      {assessment && (
        <aside className="flex flex-col gap-5 fixed top-20 right-0 mr-8">
          <CountdownTimer
            targetDate={
              localStorage.getItem("remainingTime")
                ? Number(localStorage.getItem("remainingTime")) +
                  new Date().getTime()
                : new Date(
                    Date.now() + Number(assessment!.duration) * 1000 * 60
                  ).getTime()
            }
            onExpire={handleExpire}
          />
        </aside>
      )}
      {showModal1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Time's up!</h2>
            <p className="mb-6">Your assessment has been submitted.</p>
            <Button className="w-full">
              <Link href={`/test-library/${slug}`}>
                Return to assessment page
              </Link>
            </Button>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-background p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Mouse leaved</h2>
            <p className="mb-6">Redirecting in {countdownTimer} seconds...</p>
            <Button className="w-full" onClick={() => setShowModal2(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col px-4 m-auto my-10 items-center gap-5 md:items-start">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleSubmitAssessment)}>
            {tasks &&
              tasks.map((taskWithAnswers, index) => (
                <section
                  key={taskWithAnswers.taskToken}
                  className="grow space-y-5 p-5 bg-card rounded-3xl mb-5"
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
                    <div className="relative w-screen-[100px] h-[300px] lg:w-[800px] lg:h-[600px]">
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
      </div>
    </main>
  );
}
