"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import AnalysisTab from "@/features/dashboard/components/UserAnalysisTab";
import AddedJobsTab from "@/features/dashboard/components/AddedJobsTab";
import AddedAssessmentsTab from "@/features/dashboard/components/AddedAssessmentsTab";
import AppliedJobsTab from "@/features/dashboard/components/AppliedJobsTab";
import PassedAssessmentsTab from "@/features/dashboard/components/PassedAssessmentsTab";
import Styles from "./page.styles";

const TABS = [
  { key: "analysis", label: "Analysis" },
  { key: "addedJobs", label: "Added Jobs" },
  { key: "addedAssessments", label: "Added Assessments" },
  { key: "appliedJobs", label: "Applied Jobs" },
  { key: "passedAssessments", label: "Passed Assessments" },
] as const;

const Dashboard: React.FC = () => {
  const t = useTranslations("A11y");
  const tDashboard = useTranslations("Dashboard");
  const [activeTab, setActiveTab] = useState("analysis");
  const [board, setBoard] = useState({
    jobs: [],
    assessments: [],
    applications: [],
    results: [],
  });
  const [, setLoading] = useState(true);
  const [, setError] = useState("");

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        console.log(data);
        setBoard(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchValues();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "analysis":
        return <AnalysisTab />;
      case "addedJobs":
        return <AddedJobsTab jobs={board.jobs} />;
      case "addedAssessments":
        return <AddedAssessmentsTab assessments={board.assessments} />;
      case "appliedJobs":
        return <AppliedJobsTab applications={board.applications} />;
      case "passedAssessments":
        return <PassedAssessmentsTab results={board.results} />;
      default:
        return <AnalysisTab />;
    }
  };

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box component="aside" sx={Styles.sidebar}>
        <Box component="nav" aria-label={t("dashboard_navigation")}>
          <Box component="ul" sx={Styles.navList}>
            {TABS.map((tab) => (
              <Box component="li" key={tab.key} sx={Styles.navItem}>
                <Button
                  variant="text"
                  onClick={() => setActiveTab(tab.key)}
                  aria-current={activeTab === tab.key ? "page" : undefined}
                  sx={[
                    Styles.navButton,
                    activeTab === tab.key && Styles.navButtonActive,
                  ]}
                >
                  {tab.label}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={Styles.content}>
        <Typography variant="h1" component="h1" sx={Styles.pageTitle}>
          {tDashboard("title")}
        </Typography>
        {renderTab()}
      </Box>
    </Box>
  );
};

export default Dashboard;
