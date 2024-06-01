"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "../ui/button";

interface TaskUpdateSectionProps {
  tasks: any[];
}

const TaskUpdateSection: React.FC<TaskUpdateSectionProps> = ({ tasks }) => {
  const [editMode, setEditMode] = useState(false);
  const [tasksToUpdate, setTasksToUpdate] = useState(tasks);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedTasks = [...tasksToUpdate];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    };
    setTasksToUpdate(updatedTasks);
  };

  const handleCheckboxChange = (taskIndex: number, answerIndex: number) => {
    const updatedTasks = [...tasksToUpdate];
    const updatedAnswers = [...updatedTasks[taskIndex].answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      correct: !updatedAnswers[answerIndex].correct,
    };
    updatedTasks[taskIndex].answers = updatedAnswers;
    setTasksToUpdate(updatedTasks);
  };

  const handleUpdateTasks = async () => {
    const response = await fetch("/api/assessment/tasks/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasksToUpdate),
    });

    if (response.ok) {
      setEditMode(false);
      alert("Tasks updated successfully");
    } else {
      alert("Failed to update tasks");
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-8 gradient1 w-full md:min-w-[800px] p-8 rounded-3xl">
      {tasksToUpdate.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-background">
              <h1 className="md:text-5xl text-3xl bg-card bg-clip-text text-transparent font-bold p-1">
                Tasks
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row sticky justify-end z-50 top-20 gap-4 m-2 ml-auto bg-muted p-2 rounded-xl w-fit">
                <Button onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel Update" : "Update"}
                </Button>
                {editMode && (
                  <Button onClick={handleUpdateTasks}>Save Updates</Button>
                )}
              </div>
              {tasksToUpdate &&
                tasksToUpdate.map((taskWithAnswers, taskIndex) => (
                  <section
                    key={taskWithAnswers.taskToken}
                    className={`w-full grow space-y-5 p-5 bg-card rounded-3xl mb-5 ${
                      editMode ? "border-4 border-red-500" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 bg-background p-5 rounded-xl text-primary">
                      <div>
                        <div>
                          <p className="font-semibold">
                            <span>
                              {taskWithAnswers.type === "problem"
                                ? "Problem"
                                : "Test"}{" "}
                              question №{taskIndex + 1}
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
                            {editMode ? (
                              <input
                                type="text"
                                value={taskWithAnswers.question}
                                onChange={(e) =>
                                  handleInputChange(
                                    taskIndex,
                                    "question",
                                    e.target.value
                                  )
                                }
                                className="font-semibold text-card-foreground p-2 bg-card rounded-xl border border-gray-300"
                              />
                            ) : (
                              <span className="font-semibold text-card-foreground p-2 bg-card rounded-xl ">
                                {taskWithAnswers.question}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
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
                          <span>
                            There is no image for this question added or there
                            is a problem with the image
                          </span>
                        </div>
                      )
                    )}
                    <div className="flex flex-col bg-background rounded-md text-primary">
                      <div className="flex flex-row m-2 justify-between">
                        <p className="font-semibold text-md ml-4">Answers</p>
                        <p className="font-semibold text-md mr-2">
                          Correctness
                        </p>
                      </div>
                      {taskWithAnswers.answers.map((answer, answerIndex) => (
                        <div
                          key={answer.answerId}
                          className="flex gap-2 m-1 bg-background justify-between p-3 rounded-md text-primary border-b-2 last:border-b-0 items-center"
                        >
                          {editMode ? (
                            <input
                              type="text"
                              value={answer.description}
                              onChange={(e) =>
                                handleInputChange(
                                  taskIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                              className="max-w-2xl p-2 bg-card rounded-xl border border-gray-300"
                            />
                          ) : (
                            <p className="max-w-2xl">{answer.description}</p>
                          )}
                          <p>
                            <input
                              type="checkbox"
                              className="pointer-events-auto w-6 h-6 accent-card dark:accent-card-foreground bg-card-foreground dark:bg-card border-gray-300 rounded"
                              checked={answer.correct}
                              onChange={() =>
                                handleCheckboxChange(taskIndex, answerIndex)
                              }
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
  );
};

export default TaskUpdateSection;
