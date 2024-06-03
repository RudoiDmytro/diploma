"use server";

import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function addTasksToAssessment(formData) {
  const assessmentSlug = formData.get("assessmentSlug");
  const questions = formData.get("questions");
  const taskFilesData = formData.getAll("taskFile");

  try {
    const assessment = await db.assessment.findUnique({
      where: { slug: assessmentSlug.replace(/['"]+/g, "") },
    });

    if (!assessment) {
      console.error("Assessment not found");
      return;
    }

    if (!Array.isArray(JSON.parse(questions))) {
      console.error("Questions must be an array");
      return;
    }

    for (const [index, questionData] of JSON.parse(questions).entries()) {
      const { question, answers, ponderation, type } = questionData;
      let taskFileUrl;
      const taskToken = nanoid(10);

      if (taskFilesData) {
        const testFile = taskFilesData[index];

        // Add a check to ensure that testFile is defined before accessing its properties
        if (testFile && testFile.name) {
          const blob = await put(
            `taskFiles/${taskToken}${path.extname(testFile.name)}`,
            testFile,
            {
              access: "public",
              addRandomSuffix: false,
            }
          );

          taskFileUrl = blob.url;
        }
      }

      const task = await db.task.create({
        data: {
          taskToken,
          type,
          taskFileUrl,
          question: question.blocks[0].text,
          ponderation,
          assessment: { connect: { slug: assessmentSlug } },
        },
      });

      for (const answer of answers) {
        await db.answer.create({
          data: {
            description: answer.text,
            correct: answer.isCorrect,
            taskToken: task.taskToken,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error adding tasks to assessment:", error);
  }
  redirect(`/test-library/${assessmentSlug}`);
}
