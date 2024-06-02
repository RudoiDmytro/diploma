import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  getJobTypesData,
  getApplicationsByJobData,
  getAssessmentResultsData,
} from "./actions";

const AnalysisComponent = () => {
  const [selectedTab, setSelectedTab] = useState("assessmentResults");
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTab === "jobTypes") {
        const data = await getJobTypesData();
        setChartData(data);
      } else if (selectedTab === "applicationsByJob") {
        const data = await getApplicationsByJobData();
        setChartData(data);
      } else if (selectedTab === "assessmentResults") {
        const data = await getAssessmentResultsData();
        setChartData(data);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      {/* Render the tabs */}
      <div>
        <button onClick={() => setSelectedTab("jobTypes")}>Job Types</button>
        <button onClick={() => setSelectedTab("applicationsByJob")}>
          Applications by Job
        </button>
        <button onClick={() => setSelectedTab("assessmentResults")}>
          Assessment Results
        </button>
      </div>

      {/* Render the selected chart */}
      <div>
        {selectedTab === "jobTypes" && chartData && <Pie data={chartData} />}
        {selectedTab === "applicationsByJob" && chartData && (
          <Bar data={chartData} />
        )}
        {selectedTab === "assessmentResults" && chartData && (
          <Line data={chartData} />
        )}
      </div>
    </div>
  );
};

export default AnalysisComponent;
