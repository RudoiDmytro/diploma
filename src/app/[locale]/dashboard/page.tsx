"use client";

import React, { useEffect, useState } from "react";
import AnalysisTab from "@/app/components/dashboard/AnalysisTab";

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
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen flex flex-row">
      <div className="flex flex-col w-full max-w-7xl">
        <AnalysisTab />
      </div>
    </main>
  );
};

export default Dashboard;
