import React from "react";
import AnalysisComponent from "./analysis/AnalysisCharts";
import H1 from "@/shared/ui/h1";

const AnalysisTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <H1>Analysis</H1>
      <AnalysisComponent />
    </div>
  );
};

export default AnalysisTab;

