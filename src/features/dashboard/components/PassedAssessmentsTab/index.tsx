import React from 'react';
import { Result } from '@prisma/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Styles from './styles';

interface PassedAssessmentsTabProps {
  results: Result[];
}

const PassedAssessmentsTab: React.FC<PassedAssessmentsTabProps> = ({ results }) => {
  return (
    <Box component="section" sx={Styles.container}>
      <Typography variant="h2" component="h2" sx={Styles.heading}>
        Passed Assessments
      </Typography>
      {results.map((result) => (
        <Box key={result.resultId}>
          <Typography component="p" sx={Styles.itemBody}>
            Assessment: {result.assessmentSlug}
          </Typography>
          <Typography component="p" sx={Styles.itemBody}>
            Score: {result.score}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PassedAssessmentsTab;
