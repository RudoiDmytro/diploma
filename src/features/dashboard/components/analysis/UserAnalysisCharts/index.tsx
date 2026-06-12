"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import {
  getUserJobsAddedData,
  getUserAssessmentsAddedData,
  getUserAssessmentsCompletedData,
  getUserJobAnalysisData,
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
import { useSession } from "next-auth/react";
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
];

const AnalysisComponent = () => {
  const [selectedTab, setSelectedTab] = useState("jobsAdded");
  const [chartData, setChartData] = useState<any>();
  const [timeFrame, setTimeFrame] = useState("day");
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const chartRef = useRef<any>(null);
  const { data: session } = useSession();
  const t = useTranslations("A11y");
  const tDashboard = useTranslations("Dashboard");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (selectedTab === "jobsAdded") {
        const data = await getUserJobsAddedData(session!.user.id);
        setChartData(data);
      } else if (selectedTab === "assessmentsAdded") {
        const data = await getUserAssessmentsAddedData(session!.user.id);
        setChartData(data);
      } else if (selectedTab === "assessmentsCompleted") {
        const data = await getUserAssessmentsCompletedData(session!.user.id);
        setChartData(data);
      } else if (selectedTab === "jobAnalysis") {
        const data = await getUserJobAnalysisData(session!.user.id);
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
            id={`user-analysis-tab-${tab.value}`}
            aria-controls={`user-analysis-tabpanel-${tab.value}`}
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
          id={`user-analysis-tabpanel-${selectedTab}`}
          aria-labelledby={`user-analysis-tab-${selectedTab}`}
          sx={Styles.panel}
        >
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
        </Box>
      )}
    </Box>
  );
};

export default AnalysisComponent;
