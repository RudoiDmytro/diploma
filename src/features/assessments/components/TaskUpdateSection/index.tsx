"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Styles from "./styles";

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
    <Box component="section" sx={Styles.wrapper}>
      {tasksToUpdate.length > 0 ? (
        <Accordion sx={Styles.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={Styles.accordionSummary}
          >
            <Typography variant="h2" component="h2" sx={Styles.tasksHeading}>
              Tasks
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={Styles.toolbar}>
              <Button
                variant="contained"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel Update" : "Update"}
              </Button>
              {editMode && (
                <Button variant="contained" onClick={handleUpdateTasks}>
                  Save Updates
                </Button>
              )}
            </Box>
            {tasksToUpdate &&
              tasksToUpdate.map((taskWithAnswers, taskIndex) => (
                <Box
                  component="article"
                  key={taskWithAnswers.taskToken}
                  sx={[
                    Styles.taskSection,
                    editMode && Styles.taskSectionEditing,
                  ]}
                >
                  <Box sx={Styles.taskHeader}>
                    <Box>
                      <Typography component="p" sx={Styles.taskTypeText}>
                        {taskWithAnswers.type === "problem"
                          ? "Problem"
                          : "Test"}{" "}
                        question №{taskIndex + 1}
                      </Typography>
                      <Box sx={Styles.taskMeta}>
                        <Typography component="p" sx={Styles.metaRow}>
                          Ponderation is {taskWithAnswers.ponderation}
                        </Typography>
                        <Box component="p" sx={Styles.questionRow}>
                          <Typography component="span">
                            The question is:
                          </Typography>
                          {editMode ? (
                            <TextField
                              type="text"
                              label="Question"
                              value={taskWithAnswers.question}
                              onChange={(e) =>
                                handleInputChange(
                                  taskIndex,
                                  "question",
                                  e.target.value
                                )
                              }
                              sx={Styles.questionInput}
                            />
                          ) : (
                            <Typography
                              component="span"
                              sx={Styles.questionText}
                            >
                              {taskWithAnswers.question}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {taskWithAnswers.taskFileUrl &&
                  /\.(png|jpe?g)$/i.test(taskWithAnswers.taskFileUrl) ? (
                    <Box sx={Styles.imageWrap}>
                      <Image
                        src={taskWithAnswers.taskFileUrl}
                        alt={`Image for question: ${taskWithAnswers.question}`}
                        style={{
                          borderRadius: "0.5rem",
                          objectFit: "contain",
                          backgroundColor: "var(--background)",
                          padding: "0.25rem",
                        }}
                        fill
                      />
                    </Box>
                  ) : (
                    taskWithAnswers.taskFileUrl && (
                      <Box sx={Styles.noImageBox}>
                        <Typography component="span">
                          There is no image for this question added or there is a
                          problem with the image
                        </Typography>
                      </Box>
                    )
                  )}
                  <Box sx={Styles.answersWrap}>
                    <Box sx={Styles.answersHeaderRow}>
                      <Typography component="p" sx={Styles.answersHeaderLabel}>
                        Answers
                      </Typography>
                      <Typography component="p" sx={Styles.answersHeaderLabel}>
                        Correctness
                      </Typography>
                    </Box>
                    {taskWithAnswers.answers.map((answer, answerIndex) => (
                      <Box key={answer.answerId} sx={Styles.answerRow}>
                        {editMode ? (
                          <TextField
                            type="text"
                            label={`Answer ${answerIndex + 1}`}
                            value={answer.description}
                            onChange={(e) =>
                              handleInputChange(
                                taskIndex,
                                "description",
                                e.target.value
                              )
                            }
                            sx={Styles.answerInput}
                          />
                        ) : (
                          <Typography component="p" sx={Styles.answerText}>
                            {answer.description}
                          </Typography>
                        )}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={answer.correct}
                              disabled={!editMode}
                              onChange={
                                editMode
                                  ? () =>
                                      handleCheckboxChange(taskIndex, answerIndex)
                                  : undefined
                              }
                            />
                          }
                          label={`${answer.description} is correct`}
                          slotProps={{
                            typography: {
                              sx: {
                                clip: "rect(0 0 0 0)",
                                clipPath: "inset(50%)",
                                height: "1px",
                                overflow: "hidden",
                                position: "absolute",
                                whiteSpace: "nowrap",
                                width: "1px",
                              },
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <Typography variant="h2" component="h2" sx={Styles.emptyHeading}>
          There will be your tasks
        </Typography>
      )}
    </Box>
  );
};

export default TaskUpdateSection;
