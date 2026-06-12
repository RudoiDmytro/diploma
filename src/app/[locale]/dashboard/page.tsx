"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AnalysisTab from "@/features/dashboard/components/AnalysisTab";
import Styles from "./page.styles";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analysis");
  const [board, setBoard] = useState({
    jobs: [],
    assessments: [],
    applications: [],
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <Box component="main" id="main-content" sx={Styles.main}>
      <Box sx={Styles.inner}>
        <AnalysisTab />
      </Box>
    </Box>
  );
};

export default Dashboard;
