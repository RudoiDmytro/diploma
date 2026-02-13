import React from 'react';
import { Application } from '@prisma/client';

interface AppliedJobsTabProps {
  applications: Application[];
}

const AppliedJobsTab: React.FC<AppliedJobsTabProps> = ({ applications }) => {
  return (
    <div>
      <h2>Applied Jobs</h2>
      {applications.map((application) => (
        <div key={application.applicationId}>
          <p>Job: {application.jobSlug}</p>
          <p>Application Date: {application.feedbackDate.toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobsTab;
