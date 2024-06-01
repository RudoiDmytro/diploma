import React from 'react';
import { Job } from '@prisma/client'; // Припускаючи, що у вас є Prisma клієнт

interface AddedJobsTabProps {
  jobs: Job[];
}

const AddedJobsTab: React.FC<AddedJobsTabProps> = ({ jobs }) => {
  return (
    <div>
      <h2>Added Jobs</h2>
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
