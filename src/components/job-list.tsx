"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job, JobStatus, UpdateJobData } from "@/types";
import { formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Building2, MapPin, DollarSign, Calendar, Trash2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  onUpdateJob: (id: string, data: UpdateJobData) => Promise<void>;
  onDeleteJob: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function JobList({
  jobs,
  onUpdateJob,
  onDeleteJob,
  isLoading,
}: JobListProps) {
  const [updatingJobs, setUpdatingJobs] = useState<Set<string>>(new Set());
  const [deletingJobs, setDeletingJobs] = useState<Set<string>>(new Set());

  const handleStatusChange = async (jobId: string, newStatus: JobStatus) => {
    setUpdatingJobs((prev) => new Set(prev).add(jobId));
    try {
      await onUpdateJob(jobId, { status: newStatus });
    } finally {
      setUpdatingJobs((prev) => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job application?"))
      return;

    setDeletingJobs((prev) => new Set(prev).add(jobId));
    try {
      await onDeleteJob(jobId);
    } finally {
      setDeletingJobs((prev) => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            No job applications yet. Add your first one above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{job.position}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{job.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    job.status
                  )}`}
                >
                  {getStatusLabel(job.status)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(job.id)}
                  disabled={deletingJobs.has(job.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {job.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Applied {formatDate(job.appliedDate)}</span>
              </div>
            </div>

            {job.notes && (
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                {job.notes}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Select
                  value={job.status}
                  onValueChange={(value) =>
                    handleStatusChange(job.id, value as JobStatus)
                  }
                  disabled={updatingJobs.has(job.id)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
                    <SelectItem value={JobStatus.WITHDRAWN}>
                      Withdrawn
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-muted-foreground">
                Updated {formatDate(job.updatedAt)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
