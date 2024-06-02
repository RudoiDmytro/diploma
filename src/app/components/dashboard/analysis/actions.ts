"use server"

import { db } from '@/lib/db';

export async function getJobTypesData() {
  const jobTypes = await db.job.groupBy({
    by: ['type'],
    _count: true,
  });
  const data = {
    labels: jobTypes.map((type) => type.type),
    datasets: [
      {
        data: jobTypes.map((type) => type._count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };
  return data;
}

export async function getApplicationsByJobData() {
  const applicationsByJob = await db.application.groupBy({
    by: ['jobSlug'],
    _count: true,
  });
  const data = {
    labels: applicationsByJob.map((app) => app.jobSlug),
    datasets: [
      {
        label: 'Applications',
        data: applicationsByJob.map((app) => app._count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  return data;
}

export async function getAssessmentResultsData() {
  const assessmentResults = await db.result.findMany({
    select: {
      score: true,
      assessmentDate: true,
    },
    orderBy: {
      assessmentDate: 'asc',
    },
  });
  const data = {
    labels: assessmentResults.map((result) => result.assessmentDate.toLocaleDateString()),
    datasets: [
      {
        label: 'Assessment Scores',
        data: assessmentResults.map((result) => result.score),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  return data;
}