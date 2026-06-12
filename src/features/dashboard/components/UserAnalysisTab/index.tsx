import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AnalysisComponent from "../analysis/AnalysisCharts";
import Styles from "./styles";

const AnalysisTab: React.FC = () => {
  return (
    <Box component="section">
      <Typography variant="h2" component="h2" sx={Styles.heading}>
        Analysis
      </Typography>
      <AnalysisComponent />
    </Box>
  );
};

export default AnalysisTab;
