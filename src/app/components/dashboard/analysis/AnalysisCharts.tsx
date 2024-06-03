"use client";

import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  getJobsAddedData,
  getAssessmentsAddedData,
  getAssessmentsCompletedData,
  getJobAnalysisData,
} from "./actions";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js/auto";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend
);

const AnalysisComponent = () => {
  const [selectedTab, setSelectedTab] = useState("jobsAdded");
  const [chartData, setChartData] = useState<any>();
  const [timeFrame, setTimeFrame] = useState("day");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (selectedTab === "jobsAdded") {
        const data = await getJobsAddedData(timeFrame);
        setChartData(data);
      } else if (selectedTab === "assessmentsAdded") {
        const data = await getAssessmentsAddedData(timeFrame);
        setChartData(data);
      } else if (selectedTab === "assessmentsCompleted") {
        const data = await getAssessmentsCompletedData(timeFrame);
        setChartData(data);
      } else if (selectedTab === "jobAnalysis") {
        const data = await getJobAnalysisData();
        setChartData(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedTab, timeFrame]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-7xl">
      {/* Render the tabs */}
      <div>
        <button onClick={() => setSelectedTab("jobsAdded")}>Jobs Added</button>
        <button onClick={() => setSelectedTab("assessmentsAdded")}>
          Assessments Added
        </button>
        <button onClick={() => setSelectedTab("assessmentsCompleted")}>
          Assessments Completed
        </button>
        <button onClick={() => setSelectedTab("jobAnalysis")}>
          Job Analysis
        </button>
      </div>

      {/* Render the selected chart */}
      <div className="w-full justify-center">
        {selectedTab === "jobsAdded" && <Line data={chartData} />}
        {selectedTab === "assessmentsAdded" && <Line data={chartData} />}
        {selectedTab === "assessmentsCompleted" && <Line data={chartData} />}
        {selectedTab === "jobAnalysis" && <Line data={chartData} />}
      </div>
    </div>
  );
};

export default AnalysisComponent;
