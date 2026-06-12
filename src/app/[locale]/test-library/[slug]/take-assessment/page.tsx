"use client";

import { Answer, Assessment } from "@prisma/client";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { evaluateAnswers, submitAssessmentResults } from "./actions";
import LoadingButton from "@/components/LoadingButton";
import CountdownTimer from "@/features/assessments/components/countdown/Countdown";
import Styles from "./page.styles";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export default function Page({ params }: PageProps) {
  const { slug } = use(params);
  const form = useForm();
  const router = useRouter();
  const t = useTranslations("A11y");
  const tAssessment = useTranslations("TakeAssessment");

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

  // Target date for the countdown. Computed after mount so we never read
  // localStorage during render (which would break SSR / hydration).
  const [targetDate, setTargetDate] = useState<number | null>(null);

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setShowModal2(true);
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      setShowModal2(true);
    };

    const handleUserActivity = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        setShowModal2(true);
      }, 30000);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("touchstart", handleUserActivity);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("touchstart", handleUserActivity);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

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
  }, [slug]);

  // Once the assessment is loaded, resolve the countdown target date,
  // reading any persisted remaining time from localStorage safely on the client.
  useEffect(() => {
    if (!assessment) {
      return;
    }
    const stored = localStorage.getItem("remainingTime");
    const resolved = stored
      ? Number(stored) + new Date().getTime()
      : new Date(Date.now() + Number(assessment.duration) * 1000 * 60).getTime();
    setTargetDate(resolved);
  }, [assessment]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleSubmitAssessment = async (data: Record<string, unknown>) => {
    try {
      const userScore = await evaluateAnswers(tasks, data);
      await submitAssessmentResults(slug, userScore);
    } catch (submitError) {
      console.error("Error submitting assessment:", submitError);
    } finally {
      setShowModal1(true);
      localStorage.removeItem("remainingTime");
    }
  };

  const handleExpire = () => {
    handleSubmit(handleSubmitAssessment)();
  };

  return (
    <Box
      component="main"
      id="main-content"
      sx={Styles.main}
      onMouseLeave={() => setShowModal2(true)}
      onTouchCancelCapture={() => setShowModal2(true)}
    >
      {assessment && targetDate !== null && (
        <Box component="aside" sx={Styles.countdownAside}>
          <CountdownTimer targetDate={targetDate} onExpire={handleExpire} />
        </Box>
      )}

      <Dialog
        open={showModal1}
        aria-labelledby="assessment-submitted-title"
      >
        <DialogTitle id="assessment-submitted-title">
          Time&apos;s up!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your assessment has been submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={Styles.dialogActions}>
          <Button
            variant="contained"
            component={Link}
            href={`/test-library/${slug}`}
            sx={Styles.dialogLink}
          >
            Return to assessment page
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showModal2}
        onClose={() => setShowModal2(false)}
        role="alertdialog"
        aria-labelledby="redirect-warning-title"
        aria-describedby="redirect-warning-description"
      >
        <DialogTitle id="redirect-warning-title">Mouse leaved</DialogTitle>
        <DialogContent>
          <DialogContentText id="redirect-warning-description" role="alert">
            {t("leave_assessment_warning")}
          </DialogContentText>
          <DialogContentText aria-hidden="true">
            Redirecting in {countdownTimer} seconds...
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={Styles.dialogActions}>
          <Button
            variant="contained"
            onClick={() => setShowModal2(false)}
            sx={Styles.dialogButton}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={Styles.formWrapper}>
        <Typography variant="h1" component="h1" sx={Styles.pageTitle}>
          {assessment?.title ?? tAssessment("title")}
        </Typography>
        {loading && (
          <Box
            role="status"
            aria-label={t("loading")}
            sx={Styles.statusWrapper}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography component="p" role="alert" color="error">
            {error}
          </Typography>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitAssessment)}>
          {tasks &&
            tasks.map((taskWithAnswers, index) => (
              <Box
                component="section"
                key={taskWithAnswers.taskToken}
                sx={Styles.taskSection}
              >
                <Box sx={Styles.taskHeader}>
                  <Box>
                    <Typography
                      variant="h2"
                      component="h2"
                      sx={Styles.taskType}
                    >
                      <Box component="span">
                        {taskWithAnswers.type === "problem"
                          ? "Problem"
                          : "Test"}{" "}
                        question №{index + 1}
                      </Box>
                    </Typography>
                    <Box sx={Styles.taskMeta}>
                      <Typography component="p" sx={Styles.taskMetaRow}>
                        <Box component="span">
                          Ponderation is {taskWithAnswers.ponderation}
                        </Box>
                      </Typography>
                      <Typography component="p" sx={Styles.questionRow}>
                        <Box component="span">
                          The question is: <br />{" "}
                        </Box>
                        <Box component="span" sx={Styles.questionText}>
                          {taskWithAnswers.question}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {taskWithAnswers.taskFileUrl &&
                /\.(png|jpe?g)$/i.test(taskWithAnswers.taskFileUrl) ? (
                  <Box sx={Styles.imageWrapper}>
                    <Image
                      src={taskWithAnswers.taskFileUrl}
                      alt={`Illustration for question: ${
                        taskWithAnswers.question ?? `№${index + 1}`
                      }`}
                      fill
                    />
                  </Box>
                ) : (
                  taskWithAnswers.taskFileUrl && (
                    <Box sx={Styles.imageError}>
                      <Box component="span">There is a problem with the image</Box>
                    </Box>
                  )
                )}
                <Box sx={Styles.answersBlock}>
                  <Box sx={Styles.answersHeaderRow}>
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={Styles.answersHeading}
                    >
                      Answers
                    </Typography>
                  </Box>
                  {taskWithAnswers.answers.map((answer) => (
                    <Box key={answer.answerId} sx={Styles.answerRow}>
                      <Controller
                        control={control}
                        defaultValue={false}
                        name={`task-${taskWithAnswers.taskToken}.${answer.answerId}`}
                        render={({ field }) => (
                          <FormControlLabel
                            sx={Styles.answerLabel}
                            label={answer.description}
                            labelPlacement="start"
                            control={
                              <Checkbox
                                checked={!!field.value}
                                onChange={(event) =>
                                  field.onChange(event.target.checked)
                                }
                                onBlur={field.onBlur}
                                name={field.name}
                              />
                            }
                          />
                        )}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          <LoadingButton type="submit" loading={isSubmitting} sx={Styles.submitButton}>
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}
