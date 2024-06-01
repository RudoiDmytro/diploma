"use client";

import React, { useEffect, useState } from "react";
import AnalysisTab from "@/app/components/profile/AnalysisTab";
import AddedJobsTab from "@/app/components/profile/AddedJobsTab";
import AddedAssessmentsTab from "@/app/components/profile/AddedAssessmentsTab";
import AppliedJobsTab from "@/app/components/profile/AppliedJobsTab";
import PassedAssessmentsTab from "@/app/components/profile/PassedAssessmentsTab";

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
    <main className="px-3 m-auto max-w-7xl my-10 space-y-10 min-h-screen flex flex-row">
      <aside className="flex flex-col fixed top-20 left-0 ml-8 mt-10">
        <nav>
          <ul className="space-y-5">
            <li onClick={() => setActiveTab("analysis")}>Analysis</li>
            <li onClick={() => setActiveTab("addedJobs")}>Added Jobs</li>
            <li onClick={() => setActiveTab("addedAssessments")}>
              Added Assessments
            </li>
            <li onClick={() => setActiveTab("appliedJobs")}>Applied Jobs</li>
            <li onClick={() => setActiveTab("passedAssessments")}>
              Passed Assessments
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex flex-col ml-[25%]">{renderTab()}</div>
    </main>
  );
};

export default Dashboard;
