"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addTaskValues, addTaskSchema } from "../../lib/validation";
import { addTasksToAssessment } from "./addTasksAction";

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
    watch,
    control,
    setFocus,
    formState: { isSubmitting },
  } = form;

  return (
    <div>
      <Transition appear show={isTestDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeTestDialog}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-fit max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-background shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-foreground"
                >
                  Add Test or Problem
                </Dialog.Title>
                <div className="mt-4 space-y-4 flex flex-col w-fit">
                  <Input
                    type="number"
                    placeholder="Number of tests/problems"
                    value={numberOfTests}
                    onChange={(e) => setNumberOfTests(parseInt(e.target.value))}
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddTest("test", numberOfTests)}
                  >
                    Add Test
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleAddTest("problem", numberOfTests)}
                  >
                    Add Problem
                  </Button>
                  <Button type="button" onClick={closeTestDialog}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Button
        className="focus:ring-4 focus:outline-none focus:ring-gradient1 font-medium rounded-lg text-sm px-2 py-1.5 text-center mt-2 me-2 mb-2 "
        type="button"
        onClick={addTestDialog}
      >
        Add Tests or Problems
      </Button>
      {tests.length > 0 && (
        <Button type="button" onClick={openSecondDialog}>
          Update
        </Button>
      )}
      <Transition appear show={isSecondDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeSecondDialog}
        >
          <div className="min-h-screen px-4 text-center">
            <Form {...form}>
              <form
                className="space-y-4"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>
                <FormField
                  control={control}
                  name="tasks"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="inline-block w-fit max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-background shadow-xl rounded-2xl">
                          {tests.map((test, testIndex) => (
                            <div key={testIndex}>
                              <div className="flex flex-col my-3">
                                <div className="flex flex-row justify-between items-center mb-2">
                                  <Label
                                    htmlFor={`question${testIndex}`}
                                    className="font-bold text-lg space-x-4"
                                  >
                                    Add a{" "}
                                    {test.type === "problem"
                                      ? "problem"
                                      : "test"}{" "}
                                    question №{testIndex + 1}
                                  </Label>
                                  <Button
                                    className="w-fit"
                                    type="button"
                                    onClick={closeSecondDialog}
                                  >
                                    Close
                                  </Button>
                                </div>

                                <Button
                                  className="gradient1"
                                  type="button"
                                  onClick={() => {
                                    deleteTest(testIndex);
                                    if (tests.length == 1) closeSecondDialog();
                                  }}
                                >
                                  Delete
                                </Button>
                                <div
                                  id={`question${testIndex}`}
                                  className="grid grid-flow-row auto-rows-min gap-2 my-2"
                                >
                                  <div>
                                    <FormField
                                      control={control}
                                      name={`tasks.${testIndex}.question`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <RichTextEditor
                                              onChange={(draft) => (
                                                field.onChange(
                                                  draftToMarkdown(draft)
                                                ),
                                                updateTest(
                                                  testIndex,
                                                  "question",
                                                  draft
                                                )
                                              )}
                                              ref={field.ref}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <div className="flex flex-row justify-between">
                                      <Label className="font-semibold text-md">
                                        Multiple Answers
                                      </Label>
                                      <Label className="font-semibold text-md">
                                        Correct
                                      </Label>
                                    </div>
                                    {test.type === "problem" && (
                                      <FormField
                                        control={control}
                                        name={`tasks.${testIndex}.taskFile`}
                                        render={({
                                          field: { value, ...fieldValues },
                                        }) => (
                                          <FormItem>
                                            <FormControl>
                                              <Input
                                                {...fieldValues}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                  const file =
                                                    e.target.files?.[0];
                                                  fieldValues.onChange(file);
                                                  updateTest(
                                                    testIndex,
                                                    "taskFile",
                                                    file
                                                  );
                                                }}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    )}
                                    {test.answers.map((answer, answerIndex) => (
                                      <div key={answerIndex}>
                                        <FormField
                                          control={control}
                                          name={`tasks.${testIndex}.answers.${answerIndex}`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <div className="flex items-center mt-1 space-x-5 w-full ps-4 pe-4 border gradient1 border-gray-200 rounded dark:border-gray-700">
                                                  <FormItem>
                                                    <FormControl>
                                                      <Input
                                                        type="text"
                                                        className=" mt-2 mb-2"
                                                        name={`tasks.${testIndex}.question.answers.${answerIndex}.text`}
                                                        placeholder={`Answer ${
                                                          answerIndex + 1
                                                        }`}
                                                        value={answer.text}
                                                        onChange={(e) =>
                                                          updateAnswer(
                                                            testIndex,
                                                            answerIndex,
                                                            "text",
                                                            e.target.value
                                                          )
                                                        }
                                                      />
                                                    </FormControl>
                                                  </FormItem>
                                                  <Button
                                                    key={answerIndex}
                                                    type="button"
                                                    variant="destructive"
                                                    className=""
                                                    onClick={() =>
                                                      deleteAnswer(
                                                        testIndex,
                                                        answerIndex
                                                      )
                                                    }
                                                  >
                                                    Delete
                                                  </Button>
                                                  <input
                                                    type="checkbox"
                                                    className="w-6 h-6 accent-red-500  bg-gray-100 border-gray-300 rounded dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                    id="correct"
                                                    name={`tasks.${testIndex}.answers.${answerIndex}.isCorrect`}
                                                    onChange={() =>
                                                      handleCorrectAnswer(
                                                        testIndex,
                                                        answerIndex
                                                      )
                                                    }
                                                    checked={answer.isCorrect}
                                                  />
                                                </div>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <div className="flex items-center justify-between mt-2">
                                      <Button
                                        type="button"
                                        onClick={() => addAnswer(testIndex)}
                                      >
                                        Add Answer
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2 text-start">
                                    <Label className="font-semibold text-md">
                                      Ponderation
                                    </Label>
                                    <Input
                                      type="number"
                                      placeholder="Ponderation"
                                      name={`tasks.${testIndex}.ponderation`}
                                      value={test.ponderation}
                                      onChange={(e) =>
                                        updateTest(
                                          testIndex,
                                          "ponderation",
                                          parseInt(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {tests.length > 0 && (
                            <LoadingButton type="submit" loading={isSubmitting}>
                              Submit
                            </LoadingButton>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
