"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "@/components/RichTextEditor";
import { addTaskValues } from "@/lib/validation";
import { addTasksToAssessment } from "../addTasksAction";
import Styles from "./styles";

type Test = {
  type: string;
  question: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
  taskFile?: File;
  ponderation: number;
};

export default function AddTasks(props) {
  const tA11y = useTranslations("A11y");
  const form = useForm<addTaskValues>();

  const [tests, setTests] = useState<Test[]>([]);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [numberOfTests, setNumberOfTests] = useState(1);

  const updateTest = (index, field, value) => {
    const newTests = [...tests];
    newTests[index][field] = value;
    setTests(newTests);
  };

  const addAnswer = (index) => {
    const newTests = [...tests];
    newTests[index].answers.push({ text: "", isCorrect: false });
    setTests(newTests);
  };

  const updateAnswer = (testIndex, answerIndex, field, value) => {
    const newTests = [...tests];
    newTests[testIndex].answers[answerIndex][field] = value;
    setTests(newTests);
  };

  const deleteTest = (testIndex) => {
    const newTests = [...tests];
    newTests.splice(testIndex, 1);
    setTests(newTests);
  };

  const deleteAnswer = (testIndex, answerIndex) => {
    const newTests = [...tests];
    newTests[testIndex].answers.splice(answerIndex, 1);
    setTests(newTests);
  };

  const handleCorrectAnswer = (testIndex, answerIndex) => {
    const newTests = [...tests];
    const selectedTest = newTests[testIndex];
    const selectedAnswer = selectedTest.answers[answerIndex];

    selectedAnswer.isCorrect = !selectedAnswer.isCorrect;

    setTests(newTests);
  };

  const addTestDialog = () => {
    setIsTestDialogOpen(true);
  };

  const closeTestDialog = () => {
    setIsTestDialogOpen(false);
  };

  const openSecondDialog = () => {
    setIsSecondDialogOpen(true);
  };

  const closeSecondDialog = () => {
    setIsSecondDialogOpen(false);
  };

  const handleAddTest = (type: string, count: number) => {
    closeTestDialog();
    const newTests = [...tests];
    for (let i = 0; i < count; i++) {
      const initialAnswers = [{ text: "", isCorrect: false }];
      newTests.push({
        type,
        question: "",
        answers: initialAnswers,
        ponderation: 0,
      });
    }
    setTests(newTests);
    setIsSecondDialogOpen(true);
  };

  const onSubmit = async (data: addTaskValues) => {
    const formData = new FormData();

    formData.append("assessmentSlug", props.slug);
    formData.append("questions", JSON.stringify(tests));

    data.tasks.forEach((task, index) => {
      if (task.taskFile) {
        formData.append("taskFile", task.taskFile);
      }
    });

    try {
      await addTasksToAssessment(formData);
    } catch (error) {
      alert(error);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <Box>
      <Dialog
        open={isTestDialogOpen}
        onClose={closeTestDialog}
        aria-labelledby="add-test-dialog-title"
      >
        <DialogTitle id="add-test-dialog-title" sx={Styles.dialogTitleCentered}>
          Add Test or Problem
          <IconButton
            aria-label={tA11y("close_dialog")}
            onClick={closeTestDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={Styles.firstDialogContent}>
            <TextField
              type="number"
              label="Number of tests/problems"
              value={numberOfTests}
              onChange={(e) => setNumberOfTests(parseInt(e.target.value))}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => handleAddTest("test", numberOfTests)}
            >
              Add Test
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => handleAddTest("problem", numberOfTests)}
            >
              Add Problem
            </Button>
            <Button type="button" variant="outlined" onClick={closeTestDialog}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={Styles.triggerRow}>
        <Button
          type="button"
          variant="contained"
          onClick={addTestDialog}
          sx={Styles.addButton}
        >
          Add Tests or Problems
        </Button>
        {tests.length > 0 && (
          <Button type="button" variant="contained" onClick={openSecondDialog}>
            Update
          </Button>
        )}
      </Box>

      <Dialog
        open={isSecondDialogOpen}
        onClose={closeSecondDialog}
        aria-labelledby="edit-questions-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="edit-questions-dialog-title" sx={Styles.dialogTitle}>
          Edit questions
          <IconButton
            aria-label={tA11y("close_dialog")}
            onClick={closeSecondDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {tests.map((test, testIndex) => (
              <Box key={testIndex} sx={Styles.questionBlock}>
                <Box sx={Styles.questionHeaderRow}>
                  <Typography
                    component="label"
                    htmlFor={`question-editor-${testIndex}`}
                    sx={Styles.questionLabel}
                  >
                    Add a {test.type === "problem" ? "problem" : "test"} question
                    №{testIndex + 1}
                  </Typography>
                </Box>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    deleteTest(testIndex);
                    if (tests.length == 1) closeSecondDialog();
                  }}
                >
                  Delete
                </Button>

                <Box sx={Styles.fieldGrid}>
                  <Controller
                    control={control}
                    name={`tasks.${testIndex}.question`}
                    render={({ field, fieldState }) => (
                      <FormControl error={!!fieldState.error}>
                        <RichTextEditor
                          id={`question-editor-${testIndex}`}
                          value={test.question || ""}
                          onChange={(value) => {
                            field.onChange(value ?? "");
                            updateTest(testIndex, "question", value ?? "");
                          }}
                        />
                        {fieldState.error && (
                          <Typography
                            role="alert"
                            component="span"
                            sx={{
                              color: "error.main",
                              fontSize: "0.875rem",
                              mt: 0.5,
                            }}
                          >
                            {fieldState.error.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />

                  <Box>
                    <Box sx={Styles.answersHeaderRow}>
                      <Typography component="span" sx={Styles.answersHeaderLabel}>
                        Multiple Answers
                      </Typography>
                      <Typography component="span" sx={Styles.answersHeaderLabel}>
                        Correct
                      </Typography>
                    </Box>
                    {test.type === "problem" && (
                      <Controller
                        control={control}
                        name={`tasks.${testIndex}.taskFile`}
                        render={({
                          field: { value, onChange, ref, ...fieldValues },
                          fieldState,
                        }) => (
                          <FormControl error={!!fieldState.error}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 2,
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              <Button
                                component="label"
                                variant="outlined"
                                sx={Styles.fileButton}
                              >
                                Choose file
                                <Box
                                  component="input"
                                  sx={Styles.visuallyHiddenInput}
                                  {...fieldValues}
                                  ref={ref}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange(file);
                                    updateTest(testIndex, "taskFile", file);
                                  }}
                                />
                              </Button>
                              {test.taskFile instanceof File && (
                                <Typography
                                  component="span"
                                  sx={Styles.fileName}
                                >
                                  {test.taskFile.name}
                                </Typography>
                              )}
                            </Box>
                            {fieldState.error && (
                              <Typography
                                role="alert"
                                component="span"
                                sx={{
                                  color: "error.main",
                                  fontSize: "0.875rem",
                                  mt: 0.5,
                                }}
                              >
                                {fieldState.error.message}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      />
                    )}
                    {test.answers.map((answer, answerIndex) => (
                      <Box key={answerIndex} sx={Styles.answerRow}>
                        <TextField
                          type="text"
                          label={`Answer ${answerIndex + 1}`}
                          placeholder={`Answer ${answerIndex + 1}`}
                          value={answer.text}
                          onChange={(e) =>
                            updateAnswer(
                              testIndex,
                              answerIndex,
                              "text",
                              e.target.value
                            )
                          }
                          fullWidth
                          sx={{ my: 1 }}
                        />
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => deleteAnswer(testIndex, answerIndex)}
                        >
                          Delete
                        </Button>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={answer.isCorrect}
                              onChange={() =>
                                handleCorrectAnswer(testIndex, answerIndex)
                              }
                            />
                          }
                          label={`Answer ${answerIndex + 1} is correct`}
                          slotProps={{
                            typography: {
                              sx: Styles.visuallyHiddenInput,
                            },
                          }}
                        />
                      </Box>
                    ))}
                    <Box sx={Styles.addAnswerRow}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => addAnswer(testIndex)}
                      >
                        Add Answer
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={Styles.ponderationBlock}>
                    <FormLabel
                      component="label"
                      htmlFor={`ponderation-${testIndex}`}
                      sx={Styles.answersHeaderLabel}
                    >
                      Ponderation
                    </FormLabel>
                    <TextField
                      id={`ponderation-${testIndex}`}
                      type="number"
                      placeholder="Ponderation"
                      value={test.ponderation}
                      onChange={(e) =>
                        updateTest(
                          testIndex,
                          "ponderation",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Box>
                </Box>
              </Box>
            ))}
            {tests.length > 0 && (
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={16} color="inherit" aria-hidden />
                  ) : undefined
                }
                sx={Styles.submitButton}
              >
                Submit
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
