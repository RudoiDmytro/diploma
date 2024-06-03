import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";
import { testTypes } from "./test-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for this application",
      path: ["location"],
    }
  );

const categorySchema = z.object({
  category: requiredString.max(100),
  newCategory: requiredString.max(100).optional(),
});

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type"
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000),
    requiredSkills: z.union([z.array(z.number()), z.string()]),
    salary: numericRequiredString.max(9, "Number longer than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema)
  .and(categorySchema);

export type createJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

const testFileSchema = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file ||
      (file instanceof File &&
        (file.type.startsWith("image/") || file.type === "application/pdf")),
    "Must be an image or PDF file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 5;
  }, "File must be less than 5MB");

const answerSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string(),
  answers: z.array(answerSchema),
  ponderation: z.number(),
});

export const createTestSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => testTypes.includes(value),
      "Invalid test type"
    ),
    companyName: requiredString.max(100),
    logo: companyLogoSchema,
    description: z.string().max(5000),
    skills: z.union([z.array(z.number()), z.string()]),
    duration: z.coerce.string(),
    endDate: z.coerce.date(),
  })
  .and(categorySchema);

export type createTestValues = z.infer<typeof createTestSchema>;

export const testFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
});

export type TestFilterValues = z.infer<typeof testFilterSchema>;

export const addTaskSchema = z.object({
  assessmentSlug: z.string(),
  tasks: z.array(
    z.object({
      type: z.string(),
      taskFile: z.string().optional(),
      question: z.string().max(5000),
      ponderation: z.number(),
      answers: z.array(
        z.object({
          text: z.string(),
          isCorrect: z.boolean(),
        })
      ),
    })
  ),
});

export type addTaskValues = z.infer<typeof addTaskSchema>;

