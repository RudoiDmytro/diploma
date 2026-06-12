import React from 'react';
import { Job } from '@prisma/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Styles from './styles';

interface AddedJobsTabProps {
  jobs: Job[];
}

const AddedJobsTab: React.FC<AddedJobsTabProps> = ({ jobs }) => {
  return (
    <Box component="section" sx={Styles.container}>
      <Typography variant="h2" component="h2" sx={Styles.heading}>
        Added Jobs
      </Typography>
      <Box sx={Styles.border} />
      {jobs.map((job) => (
        <Box key={job.slug}>
          <Typography variant="h3" component="h3" sx={Styles.itemTitle}>
            {job.title}
          </Typography>
          <Typography component="p" sx={Styles.itemBody}>
            {job.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AddedJobsTab;
