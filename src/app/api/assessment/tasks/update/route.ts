import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const tasksToUpdate = await req.json();

  try {
    for (const task of tasksToUpdate) {
      await db.task.update({
        where: { taskToken: task.taskToken },
        data: {
          question: task.question,
          ponderation: task.ponderation,
          taskFileUrl: task.taskFileUrl,
          answers: {
            updateMany: task.answers.map((answer) => ({
              where: { answerId: answer.answerId },
              data: {
                description: answer.description,
                correct: answer.correct,
              },
            })),
          },
        },
      });
    }
  } catch (error) {
    console.error("Failed to update tasks:", error);
  }
}
