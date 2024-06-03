"use server";

import { db } from "@/lib/db";
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";

export async function getJobsAddedData(timeFrame: string) {
  const jobsAdded = await db.job.groupBy({
    by: ["createdAt"],
    _count: true,
    orderBy: {
      createdAt: "asc",
    },
  });

  const data = {
    labels: jobsAdded.map((job) => job.createdAt.toLocaleDateString()),
    datasets: [
      {
        label: "Jobs Added",
        data: jobsAdded.map((job) => job._count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return data;
}

export async function getAssessmentsAddedData(timeFrame: string) {
  const assessmentsAdded = await db.assessment.findMany({
    distinct: ["createdAt"],
    orderBy: {
      createdAt: "asc",
    },
  });

  const data = {
    labels: assessmentsAdded.map((assessment) =>
      assessment.createdAt.toLocaleDateString()
    ),
    datasets: [
      {
        label: "Assessments Added",
        data: assessmentsAdded.map((assessment) => assessment.duration),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return data;
}

export async function getAssessmentsCompletedData(timeFrame: string) {
  const assessmentsCompleted = await db.result.groupBy({
    by: ["assessmentDate"],
    _count: true,
    orderBy: {
      assessmentDate: "asc",
    },
  });

  const data = {
    labels: assessmentsCompleted.map((result) =>
      result.assessmentDate.toLocaleDateString()
    ),
    datasets: [
      {
        label: "Assessments Completed",
        data: assessmentsCompleted.map((result) => result._count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return data;
}

export async function getJobAnalysisData() {
  const salaryRanges = await db.job.groupBy({
    by: ["salary", "createdAt"],
    _count: true,
    orderBy: {
      createdAt: "asc",
    },
  });

  const salaryData = {
    labels: salaryRanges.map((range) => range.createdAt.toLocaleDateString()),
    datasets: [
      {
        label: "Jobs",
        data: salaryRanges.map((range) => range.salary),
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
        color:"white",
      },
    ],
  };

  return salaryData;
}
