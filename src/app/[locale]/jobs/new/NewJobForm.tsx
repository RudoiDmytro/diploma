"use client";
import H1 from "@/app/components/ui/h1";
import { createJobValues } from "@/lib/validation";
import { useForm, Controller, get } from "react-hook-form";
import { createJobSchema } from "../../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import Select from "@/app/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import LocationInput from "@/app/components/job/LocationInput";
import { X } from "lucide-react";
import { Label } from "@/app/components/ui/label";
import RichTextEditor from "@/app/components/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/app/components/LoadingButton";
import { createJobPosting } from "./actions";
import { useState, useEffect } from "react";
import { Category, Skill } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import Spinner from "@/app/components/ui/spinner";

const CheckboxField = ({
  skill,
  label,
  control,
  handleSkillSelect,
  isChecked,
}) => (
  <Controller
    control={control}
    name={`requiredSkills.${skill.skillId}`}
    render={({ field }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => {
            field.onChange(checked);
            handleSkillSelect(skill);
          }}
        />
        <label>{label}</label>
      </div>
    )}
  />
);

export default function NewJobForm() {
  const form = useForm<createJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [newSkillName, setNewSkillName] = useState("");

  useEffect(() => {
    const storedSkills = localStorage.getItem("selectedSkills");
    if (storedSkills) {
      setSelectedSkills(JSON.parse(storedSkills));
    }
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const currentValue = get(form.control, "requiredSkills.value");
    const updatedValue = currentValue?.filter((id) =>
      selectedSkills.includes(id)
    );
    form.setValue("requiredSkills", updatedValue || []);
  }, [selectedSkills, form.control, form.setValue]);

  const handleSkillsDialogOpen = () => {
    setIsSkillsDialogOpen(true);
  };

  const handleSkillsDialogClose = () => {
    setIsSkillsDialogOpen(false);
    setNewSkillName("");
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleSkillSelect = (skill: Skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s.skillId !== skill.skillId)
      : [...selectedSkills, skill];
    if (isMounted) {
      setSelectedSkills(updatedSkills);
      localStorage.setItem("selectedSkills", JSON.stringify(updatedSkills));
    }
  };

  const handleNewSkillSubmit = async () => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillName: newSkillName }),
      });
      if (!response.ok) {
        throw new Error("Failed to create new skill");
      }
      const newSkill = await response.json();
      setSkills([...skills, newSkill]);
      setSelectedSkills([...selectedSkills, newSkill]);
      setNewSkillName("");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  if (error) return <div>Failed to load: {error}</div>;
  if (loading) return <Spinner />;

  const appendToFormData = (formData, key, value) => {
    if (value === null || value === undefined) {
      return;
    }
    if (key === "requiredSkills") {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        formData.append(key, "[]");
      } else {
        value.forEach((item) => {
          formData.append(key, item);
        });
      }
    } else {
      formData.append(key, value);
    }
  };

  const onSubmit = async (values: createJobValues) => {
    const formData = new FormData();
    const skillIds = selectedSkills.map((skill) => skill.skillId);

    formData.append("requiredSkills", JSON.stringify(skillIds));

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "requiredSkills") {
        appendToFormData(formData, key, value);
      }
    });

    try {
      await createJobPosting(formData);
      localStorage.removeItem("selectedSkills");
    } catch (error) {
      alert(error);
    }
  };

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect job applicant</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers
        </p>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and detail
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((jobType) => (
                        <option value={jobType} key={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === "Remote")
                          trigger("location");
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((locationTypes) => (
                        <option value={locationTypes} key={locationTypes}>
                          {locationTypes}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button type="button">
                        <X
                          size={20}
                          onClick={() =>
                            setValue("location", "", { shouldValidate: true })
                          }
                        />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select a category
                      </option>
                      {categories.map((category: Category) => (
                        <option
                          value={category.categoryId}
                          key={category.categoryId}
                        >
                          {category.naming}
                        </option>
                      ))}
                      <option value="new">Add new category</option>
                    </Select>
                  </FormControl>
                  {watch("category") === "new" && (
                    <div className="mt-2">
                      <FormField
                        control={control}
                        name="newCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Enter new category"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <p>Required Skills</p>
                    <button
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center mt-2 me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={handleSkillsDialogOpen}
                    >
                      Select Skills
                    </button>
                  </FormLabel>
                  <FormControl>
                    <div className="selected-skills-container">
                      {selectedSkills &&
                        selectedSkills.map((skill) => (
                          <div
                            key={skill.skillId}
                            id="badge-dismiss-red"
                            className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
                          >
                            {skill.skillName}
                            <button
                              type="button"
                              className="inline-flex items-center p-1 ms-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300"
                              data-dismiss-target="#badge-dismiss-red"
                              aria-label="Remove"
                              onClick={() => {
                                setSelectedSkills(
                                  selectedSkills.filter(
                                    (s) => s.skillId !== skill.skillId
                                  )
                                );
                                localStorage.setItem(
                                  "selectedSkills",
                                  JSON.stringify(
                                    selectedSkills.filter(
                                      (s) => s.skillId !== skill.skillId
                                    )
                                  )
                                );
                              }}
                            >
                              <svg
                                className="w-2 h-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Remove badge</span>
                            </button>
                          </div>
                        ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Transition appear show={isSkillsDialogOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={handleSkillsDialogClose}
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
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select Required Skills
                      </Dialog.Title>
                      <div className="mt-4 space-y-2 grid grid-flow-row auto-rows-min gap-3">
                        {skills.map((skill) => (
                          <div key={skill.skillId}>
                            <CheckboxField
                              skill={skill}
                              label={skill.skillName}
                              control={form.control}
                              handleSkillSelect={handleSkillSelect}
                              isChecked={selectedSkills.some(
                                (s) => s.skillId === skill.skillId
                              )}
                            />
                          </div>
                        ))}
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Add new skill"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            className="border px-2 py-1 rounded"
                          />
                          <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded ml-2"
                            onClick={handleNewSkillSubmit}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={handleSkillsDialogClose}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}
