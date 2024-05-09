"use server";

import { db } from "@/lib/db";
import { options } from "@/components/auth/Options";
import { getServerSession } from "next-auth";

export const evaluateAnswers = (tasks, selectedAnswers) => {
  let score = 0;
  const totalPoints = tasks.reduce((sum, task) => sum + task.ponderation, 0);

  console.log("totalPoints", totalPoints);
  console.log("selectedAnswers", selectedAnswers);

  tasks.forEach((task) => {
    const userAnswers: [] = selectedAnswers[`task-${task.taskToken}`];
    console.log("userAnswers", userAnswers);
    const correctAnswers = task.answers.filter((answer) => answer.correct);

    if (task.answers.filter((answer) => answer.correct).length === 1) {
      for (let answer in userAnswers) {
        console.log("correctAnswer", answer);
        if (answer === correctAnswers[0]?.answerId.toString()) {
          score += task.ponderation;
        }
      }
      for (let answer in userAnswers) {
        if (
          answer !== correctAnswers[0]?.answerId.toString() &&
          userAnswers[answer] !== false
        ) {
          console.log("incorrectAnswer", answer);
          score -= task.ponderation / task.answers.length;
        }
      }
    } else {
      const userAnswerIds = Object.keys(userAnswers).filter(
        (key) => userAnswers[key] === true
      );

      console.log("userAnswerIds", userAnswerIds);
      const correctAnswerIds: string[] = correctAnswers.map((answer) =>
        answer.answerId.toString()
      );

      console.log("correctAnswerIds", correctAnswerIds);
      if (JSON.stringify(userAnswerIds) === JSON.stringify(correctAnswerIds)) {
        score += task.ponderation;
      } else if (correctAnswerIds.length < userAnswerIds.length) {
        score +=
          task.ponderation * (correctAnswerIds.length / userAnswerIds.length);
      } else if (correctAnswerIds.length > userAnswerIds.length) {
        score +=
          task.ponderation * (userAnswerIds.length / correctAnswerIds.length);
      } else {
        const correctCount = userAnswerIds.filter((id) =>
          correctAnswerIds.includes(id)
        ).length;
        if (correctCount >= 1) {
          score += task.ponderation / correctAnswers.length;
        } else if (correctCount === 0) {
          score += 0;
        }
      }
    }
  });
  console.log("score", (score / totalPoints) * 100);

  return (score / totalPoints) * 100;
};

export const submitAssessmentResults = async (slug, score) => {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("User not authenticated");
  }

  const assessment = await db.assessment.findUnique({
    where: { slug },
    include: { user: true },
  });

  if (!assessment) {
    throw new Error("Assessment not found");
  }

  const result = await db.result.create({
    data: {
      score,
      assessmentSlug: assessment.slug,
      userId: session.user.id,
    },
  });
  
};
