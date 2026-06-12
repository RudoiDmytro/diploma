"use server";

import { db } from "@/lib/db";

export async function getJobsAddedData(timeFrame: string) {
  const jobsAdded = await db.job.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedByDate = jobsAdded.reduce((acc, curr) => {
    const date = curr.createdAt.toLocaleDateString();
    if (acc[date]) {
      acc[date] += curr._count._all;
    } else {
      acc[date] = curr._count._all;
    }
    return acc;
  }, {} as { [key: string]: number });

  const data = {
    labels: Object.keys(groupedByDate),
    datasets: [
      {
        label: "Jobs Added",
        data: Object.values(groupedByDate),
        fill: false,
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };
  return data;
}

export async function getUserJobsAddedData(userId: string) {
  const jobsAdded = await db.job.groupBy({
    by: ["userId", "createdAt"],
    where: { userId },
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
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };
  return data;
}

export async function getAssessmentsAddedData(timeFrame: string) {
  const assessmentsAdded = await db.assessment.groupBy({
    by: ["createdAt"],
    _count: true,
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedByDate = assessmentsAdded.reduce((acc, curr) => {
    const date = curr.createdAt.toLocaleDateString();
    if (acc[date]) {
      acc[date] += curr._count;
    } else {
      acc[date] = curr._count;
    }
    return acc;
  }, {} as { [key: string]: number });

  const data = {
    labels: Object.keys(groupedByDate),
    datasets: [
      {
        label: "Assessments Added",
        data: Object.values(groupedByDate),
        fill: false,
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };
  return data;
}
export async function getUserAssessmentsAddedData(userId: string) {
  const assessmentsAdded = await db.assessment.groupBy({
    by: ["userId", "createdAt"],
    where: { userId },
    _count: true,
    orderBy: {
      createdAt: "asc",
    },
  });

  const data = {
    labels: assessmentsAdded.map((assessment) => assessment._count),
    datasets: [
      {
        label: "Assessments Added",
        data: assessmentsAdded.map((assessment) =>
          assessment.createdAt.toLocaleDateString()
        ),
        fill: false,
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
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
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };
  return data;
}

export async function getUserAssessmentsCompletedData(userId: string) {
  const assessmentsCompleted = await db.result.groupBy({
    by: ["userId", "assessmentDate"],
    where: { userId },
    _count: true,
    orderBy: {
      assessmentDate: "asc",
    },
  });

  const groupedByDate = assessmentsCompleted.reduce((acc, curr) => {
    const date = curr.assessmentDate.toLocaleDateString();
    if (acc[date]) {
      acc[date] += curr._count;
    } else {
      acc[date] = curr._count;
    }
    return acc;
  }, {} as { [key: string]: number });

  const data = {
    labels: Object.keys(groupedByDate),
    datasets: [
      {
        label: "Assessments Completed",
        data: Object.values(groupedByDate),
        fill: false,
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };
  return data;
}

export async function getJobAnalysisData() {
  const jobsWithSalaries = await db.job.findMany({
    select: {
      salary: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedByDate = jobsWithSalaries.reduce((acc, curr) => {
    const date = curr.createdAt.toLocaleDateString();
    if (acc[date]) {
      acc[date].push(curr.salary);
    } else {
      acc[date] = [curr.salary];
    }
    return acc;
  }, {} as { [key: string]: number[] });

  const data = {
    labels: Object.keys(groupedByDate),
    datasets: [
      {
        label: "Average Salary",
        data: Object.values(groupedByDate).map((salaries) =>
          Math.round(
            salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length
          )
        ),
        borderColor: "#E01B4C",
        backgroundColor: "#fe9043",
      },
    ],
  };

  return data;
}

export async function getJobLocationAnalysisData() {
  const locationTypes = await db.job.groupBy({
    by: ["locationType"],
    _count: true,
  });

  const locationTypeData = {
    labels: locationTypes.map((type) => type.locationType),
    datasets: [
      {
        data: locationTypes.map((type) => type._count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return locationTypeData;
}

export async function getJobTypesAnalysisData() {
  const jobTypes = await db.job.groupBy({
    by: ["type"],
    _count: true,
  });

  const jobTypeData = {
    labels: jobTypes.map((type) => type.type),
    datasets: [
      {
        data: jobTypes.map((type) => type._count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return jobTypeData;
}

export async function getUserJobAnalysisData(userId: string) {
  const salaryRanges = await db.job.groupBy({
    by: ["userId", "salary", "createdAt"],
    where: { userId },
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
      },
    ],
  };

  return salaryData;
}
