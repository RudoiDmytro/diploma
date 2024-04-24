"use server";

import { nanoid } from 'nanoid';
import { put } from '@vercel/blob';
import path from 'path';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function addTasksToAssessment(formData) {
  const values = Object.fromEntries(formData.entries());
  const {
    assessmentSlug,
    questions,
    testFiles,
  } = values;

  try {
    console.log(JSON.parse(questions));
    const assessment = await db.assessment.findUnique({
      where: { slug: assessmentSlug.replace(/['"]+/g, '') },
    });

    if (!assessment) {
      console.error('Assessment not found');
      return;
    }

    if (!Array.isArray(JSON.parse(questions))) {
        
      console.error('Questions must be an array');
      return;
    }

    for (const [index, questionData] of JSON.parse(questions).entries()) {
      const { question, answers, ponderation, type } = questionData;
      let taskFileUrl;
      console.log(question.blocks[index].text)
      const taskToken = nanoid(10);

      if (testFiles) {
        const testFile = testFiles[index];
        const blob = await put(
          `taskFiles/${taskToken}${path.extname(testFile.name)}`,
          testFile,
          {
            access: 'public',
            addRandomSuffix: false,
          }
        );

        taskFileUrl = blob.url;
      }

      const task = await db.task.create({
        data: {
          taskToken,
          type,
          taskFileUrl,
          question:question.blocks[index].text,
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

    redirect(`/test-library`);
  } catch (error) {
    console.error('Error adding tasks to assessment:', error);
  }
}
