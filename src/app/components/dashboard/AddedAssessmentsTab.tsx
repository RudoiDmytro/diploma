import React from "react";
import { Assessment } from "@prisma/client";

interface AddedAssessmentsTabProps {
  assessments: Assessment[];
}

const AddedAssessmentsTab: React.FC<AddedAssessmentsTabProps> = ({
  assessments,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2>Added Assessments</h2>
      <div className="flex flex-col gap-4 border p-2">
        {assessments.map((assessment) => (
          <div key={assessment.slug}>
            <h3>{assessment.title}</h3>
            <p>{assessment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedAssessmentsTab;
