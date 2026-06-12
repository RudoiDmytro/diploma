import React from "react";
import { Assessment } from "@prisma/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Styles from "./styles";

interface AddedAssessmentsTabProps {
  assessments: Assessment[];
}

const AddedAssessmentsTab: React.FC<AddedAssessmentsTabProps> = ({
  assessments,
}) => {
  return (
    <Box component="section" sx={Styles.container}>
      <Typography variant="h2" component="h2" sx={Styles.heading}>
        Added Assessments
      </Typography>
      <Box sx={Styles.border}>
        {assessments.map((assessment) => (
          <Box key={assessment.slug}>
            <Typography variant="h3" component="h3" sx={Styles.itemTitle}>
              {assessment.title}
            </Typography>
            <Typography component="p" sx={Styles.itemBody}>
              {assessment.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AddedAssessmentsTab;
