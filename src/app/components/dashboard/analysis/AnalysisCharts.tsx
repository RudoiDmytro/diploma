"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Loading from "@/app/[locale]/loading";
import {
  getJobsAddedData,
  getAssessmentsAddedData,
  getAssessmentsCompletedData,
  getJobAnalysisData,
  getJobTypesAnalysisData,
  getJobLocationAnalysisData,
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
  console.log(chartData);
  const [timeFrame, setTimeFrame] = useState("day");
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
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
      } else if (selectedTab === "jobTypesAnalysis") {
        const data = await getJobTypesAnalysisData();
        setChartData(data);
      } else if (selectedTab === "jobLocationsAnalysis") {
        const data = await getJobLocationAnalysisData();
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
          className={`border-r border-foreground px-2 py-1 ${
            selectedTab === "jobAnalysis" && "bg-card"
          }`}
          onClick={() => setSelectedTab("jobAnalysis")}
        >
          Job Analysis
        </button>
        <button
          className={`border-r border-foreground px-2 py-1 ${
            selectedTab === "jobTypesAnalysis" && "bg-card"
          }`}
          onClick={() => setSelectedTab("jobTypesAnalysis")}
        >
          Job types
        </button>
        <button
          className={`border-foreground px-2 py-1 rounded-se-md ${
            selectedTab === "jobLocationsAnalysis" && "bg-card"
          }`}
          onClick={() => setSelectedTab("jobLocationsAnalysis")}
        >
          Job locations
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
              options={{
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1,
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
          {selectedTab === "assessmentsAdded" &&
            (chartData.labels.length > 1 && chartData.datasets[0].data.every( (val, i, arr) => val === arr[0] ) === false ? (
              <Line
                ref={chartRef}
                width={"100%"}
                height={"100%"}
                data={chartData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        stepSize: 1,
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <Bar
                ref={chartRef}
                width={"100%"}
                height={"100%"}
                data={chartData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        stepSize: 1,
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ))}
          {selectedTab === "assessmentsCompleted" &&
            (chartData.datasets[0].data.every( (val, i, arr) => val === arr[0] ) === false ? (
              <Line
                ref={chartRef}
                width={"100%"}
                height={"100%"}
                data={chartData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        stepSize: 1,
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <Bar
                ref={chartRef}
                width={"100%"}
                height={"100%"}
                data={chartData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        stepSize: 1,
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ))}
          {selectedTab === "jobAnalysis" && (
            <Bar
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
          {selectedTab === "jobTypesAnalysis" && (
            <Pie
              ref={chartRef}
              width={"100%"}
              height={"100%"}
              data={chartData}
            />
          )}
          {selectedTab === "jobLocationsAnalysis" && (
            <Pie
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
