"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobForm } from "@/components/job-form";
import { JobList } from "@/components/job-list";
import { Job, JobStatus, CreateJobData, UpdateJobData } from "@/types";
import { Moon, Sun, Download, Filter } from "lucide-react";
import Papa from "papaparse";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const { theme, setTheme } = useTheme();

  // Fetch jobs
  const fetchJobs = async (status?: string) => {
    try {
      const url =
        status && status !== "all" ? `/api/jobs?status=${status}` : "/api/jobs";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const jobsData = await response.json();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // Filter jobs
  const filterJobs = (status: string) => {
    if (status === "all") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.status === status));
    }
  };

  // Handle filter change
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    filterJobs(status);
  };

  // Add new job
  const handleAddJob = async (data: CreateJobData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create job");

      await fetchJobs();
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update job
  const handleUpdateJob = async (id: string, data: UpdateJobData) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update job");

      await fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Delete job
  const handleDeleteJob = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");

      await fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const csvData = filteredJobs.map((job) => ({
      Company: job.company,
      Position: job.position,
      Location: job.location || "",
      Salary: job.salary || "",
      Status: job.status,
      "Applied Date": new Date(job.appliedDate).toLocaleDateString("id-ID"),
      Notes: job.notes || "",
      "Created At": new Date(job.createdAt).toLocaleDateString("id-ID"),
      "Updated At": new Date(job.updatedAt).toLocaleDateString("id-ID"),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `job-applications-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === JobStatus.APPLIED).length,
    interviews: jobs.filter(
      (j) =>
        j.status === JobStatus.INTERVIEW_SCHEDULED ||
        j.status === JobStatus.INTERVIEW_COMPLETED
    ).length,
    offers: jobs.filter((j) => j.status === JobStatus.OFFER_RECEIVED).length,
    rejected: jobs.filter((j) => j.status === JobStatus.REJECTED).length,
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs(statusFilter);
  }, [jobs, statusFilter]);

  if (isLoadingJobs) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Job Tracker Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your job applications and interview progress
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">
              Total Applications
            </div>
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <div className="text-2xl font-bold text-blue-600">
              {stats.applied}
            </div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.interviews}
            </div>
            <div className="text-sm text-muted-foreground">Interviews</div>
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {stats.offers}
            </div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </div>
          <div className="bg-card text-card-foreground p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Add Job Form */}
        <div className="mb-8">
          <JobForm onSubmit={handleAddJob} isLoading={isLoading} />
        </div>

        {/* Filters and Export */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={statusFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={JobStatus.APPLIED}>Applied</SelectItem>
                <SelectItem value={JobStatus.INTERVIEW_SCHEDULED}>
                  Interview Scheduled
                </SelectItem>
                <SelectItem value={JobStatus.INTERVIEW_COMPLETED}>
                  Interview Completed
                </SelectItem>
                <SelectItem value={JobStatus.OFFER_RECEIVED}>
                  Offer Received
                </SelectItem>
                <SelectItem value={JobStatus.REJECTED}>Rejected</SelectItem>
                <SelectItem value={JobStatus.WITHDRAWN}>Withdrawn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleExportCSV}
            variant="outline"
            disabled={filteredJobs.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Jobs List */}
        <JobList
          jobs={filteredJobs}
          onUpdateJob={handleUpdateJob}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </div>
  );
}
