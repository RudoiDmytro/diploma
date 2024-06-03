"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Loading from "@/app/[locale]/loading";
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
  Colors,
} from "chart.js/auto";
import { useTheme } from "next-themes";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend,
  Colors
);

const AnalysisComponent = () => {
  const [selectedTab, setSelectedTab] = useState("jobsAdded");
  const [chartData, setChartData] = useState<any>();
  const [timeFrame, setTimeFrame] = useState("day");
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const chartRef = useRef<any>(null);

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
  }, [selectedTab]);

  useEffect(() => {
    if (theme === "dark") {
      Chart.defaults.color = "white";
    } else {
      Chart.defaults.color = "black";
    }
  }, [theme]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [selectedTab]);

  return (
    <div className="flex flex-col items-center max-md:w-screen w-full m-auto gradient1 rounded-lg p-5">
      <div className="w-full bg-background rounded-t-md justify-center text-foreground items-center">
        <button
          className={`border-r border-foreground px-2 rounded-ss-md py-1 ${
            selectedTab === "jobsAdded" && "bg-card "
          }`}
          onClick={() => setSelectedTab("jobsAdded")}
        >
          Jobs Added
        </button>
        <button
          className={`border-r border-foreground px-2 py-1 ${
            selectedTab === "assessmentsAdded" && "bg-card"
          }`}
          onClick={() => setSelectedTab("assessmentsAdded")}
        >
          Assessments Added
        </button>
        <button
          className={`border-r border-foreground px-2 py-1 ${
            selectedTab === "assessmentsCompleted" && "bg-card"
          }`}
          onClick={() => setSelectedTab("assessmentsCompleted")}
        >
          Assessments Completed
        </button>
        <button
          className={`px-2 py-1 rounded-se-md ${
            selectedTab === "jobAnalysis" && "bg-card"
          }`}
          onClick={() => setSelectedTab("jobAnalysis")}
        >
          Job Analysis
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full min-w-screen justify-center bg-card rounded-b-md">
          {selectedTab === "jobsAdded" && (
            <Line
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
          {selectedTab === "assessmentsAdded" && (
            <Line
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
          {selectedTab === "assessmentsCompleted" && (
            <Line
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
          {selectedTab === "jobAnalysis" && (
            <Bar
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisComponent;
