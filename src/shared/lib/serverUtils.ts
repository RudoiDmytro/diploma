"use server";
import { cache } from "react";
import { db } from "./db";

export const getAssessment = cache(async (slug: string) => {
  const assessment = await db.assessment.findUnique({
    where: { slug },
  });

  return assessment;
});

export const getTasks = cache(async (slug: string) => {
  const task = await db.assessment.findMany({
    where: { slug },
    select: { tasks: true },
  });
  return task;
});

export const getResults = cache(
  async (userId: string, assessmentSlug: string) => {
    const result = await db.result.findMany({
      where: { userId, assessmentSlug },
    });
    return result[0];
  }
);

export const getAnswers = cache(async (taskTokens: string[]) => {
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
