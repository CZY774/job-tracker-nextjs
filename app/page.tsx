"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { JobForm } from "@/components/job-form";
import { JobList } from "@/components/job-list";
import { StatusFilter } from "@/components/status-filter";
import { ThemeToggle } from "@/components/theme-toggle";
import { Download, Briefcase } from "lucide-react";
import { CreateJobData, Status } from "@/types/job";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddJob = async (data: CreateJobData) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "job-applications.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Job Tracker Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your job applications and interview status
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <JobForm onSubmit={handleAddJob} />
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>

        {/* Job List */}
        <JobList statusFilter={statusFilter} key={refreshTrigger} />
      </div>
    </div>
  );
}
