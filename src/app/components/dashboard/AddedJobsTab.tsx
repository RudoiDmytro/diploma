import React from 'react';
import { Job } from '@prisma/client'; // Припускаючи, що у вас є Prisma клієнт

interface AddedJobsTabProps {
  jobs: Job[];
}

const AddedJobsTab: React.FC<AddedJobsTabProps> = ({ jobs }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h1>Added Jobs</h1>
      <div className='flex flex-col gap-4 border p-2'></div>
      {jobs.map((job) => (
        <div key={job.slug}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AddedJobsTab;
