import React from 'react';
import { Result } from '@prisma/client';

interface PassedAssessmentsTabProps {
  results: Result[];
}

const PassedAssessmentsTab: React.FC<PassedAssessmentsTabProps> = ({ results }) => {
  return (
    <div>
      <h2>Passed Assessments</h2>
      {results.map((result) => (
        <div key={result.resultId}>
          <p>Assessment: {result.assessmentSlug}</p>
          <p>Score: {result.score}</p>
        </div>
      ))}
    </div>
  );
};

export default PassedAssessmentsTab;
