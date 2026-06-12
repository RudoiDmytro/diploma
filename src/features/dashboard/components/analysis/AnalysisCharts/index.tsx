"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import {
  getJobsAddedData,
  getAssessmentsAddedData,
  getAssessmentsCompletedData,
  getJobAnalysisData,
  getJobTypesAnalysisData,
  getJobLocationAnalysisData,
} from "../actions";

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
import Styles from "./styles";

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

const TABS = [
  { value: "jobsAdded", label: "Jobs Added" },
  { value: "assessmentsAdded", label: "Assessments Added" },
  { value: "assessmentsCompleted", label: "Assessments Completed" },
  { value: "jobAnalysis", label: "Job Analysis" },
  { value: "jobTypesAnalysis", label: "Job types" },
  { value: "jobLocationsAnalysis", label: "Job locations" },
];

const AnalysisComponent = () => {
  const [selectedTab, setSelectedTab] = useState("jobsAdded");
  const [chartData, setChartData] = useState<any>();
  console.log(chartData);
  const [timeFrame, setTimeFrame] = useState("day");
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);
  const t = useTranslations("A11y");
  const tDashboard = useTranslations("Dashboard");

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

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={Styles.container}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label={tDashboard("analysis_charts")}
        sx={Styles.tabs}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            id={`analysis-tab-${tab.value}`}
            aria-controls={`analysis-tabpanel-${tab.value}`}
            sx={Styles.tab}
          />
        ))}
      </Tabs>
      {isLoading ? (
        <Box role="status" aria-label={t("loading")} sx={Styles.loaderWrap}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          role="tabpanel"
          id={`analysis-tabpanel-${selectedTab}`}
          aria-labelledby={`analysis-tab-${selectedTab}`}
          sx={Styles.panel}
        >
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
        </Box>
      )}
    </Box>
  );
};

export default AnalysisComponent;
