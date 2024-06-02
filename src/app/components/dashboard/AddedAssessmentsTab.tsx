import React from 'react';
import { Assessment } from '@prisma/client';

interface AddedAssessmentsTabProps {
  assessments: Assessment[];
}

const AddedAssessmentsTab: React.FC<AddedAssessmentsTabProps> = ({ assessments }) => {
  return (
    <div>
      <h2>Added Assessments</h2>
      {assessments.map((assessment) => (
        <div key={assessment.slug}>
          <h3>{assessment.title}</h3>
          <p>{assessment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AddedAssessmentsTab;
