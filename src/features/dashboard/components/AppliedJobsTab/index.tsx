import React from 'react';
import { Application } from '@prisma/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Styles from './styles';

interface AppliedJobsTabProps {
  applications: Application[];
}

const AppliedJobsTab: React.FC<AppliedJobsTabProps> = ({ applications }) => {
  return (
    <Box component="section" sx={Styles.container}>
      <Typography variant="h2" component="h2" sx={Styles.heading}>
        Applied Jobs
      </Typography>
      {applications.map((application) => (
        <Box key={application.applicationId}>
          <Typography component="p" sx={Styles.itemBody}>
            Job: {application.jobSlug}
          </Typography>
          <Typography component="p" sx={Styles.itemBody}>
            Application Date: {application.feedbackDate.toDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AppliedJobsTab;
