"use client";

import { useState, useEffect } from "react";
import { JobCard } from "./job-card";
import { Job, CreateJobData, UpdateJobData, Status } from "@/types/job";

interface JobListProps {
  statusFilter: Status | "ALL";
}

export function JobList({ statusFilter }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const params = statusFilter !== "ALL" ? `?status=${statusFilter}` : "";
      const response = await fetch(`/api/jobs${params}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const handleUpdate = async (id: string, data: UpdateJobData) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });

      if (response.ok) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchJobs();
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {statusFilter !== "ALL"
            ? `No jobs found with status "${statusFilter}"`
            : "No job applications yet. Add your first one!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
