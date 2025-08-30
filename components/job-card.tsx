"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  MapPin,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import { CreateJobData, Job, UpdateJobData } from "@/types/job";
import { JobForm } from "./job-form";

interface JobCardProps {
  job: Job;
  onUpdate: (id: string, data: UpdateJobData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const statusColors = {
  APPLIED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  SCREENING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  INTERVIEW:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  OFFERED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  ACCEPTED:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function JobCard({ job, onUpdate, onDelete }: JobCardProps) {
  const handleUpdate = async (data: UpdateJobData | CreateJobData) => {
    if ("status" in data) {
      await onUpdate(job.id, data);
    } else {
      console.warn(
        "handleUpdate received CreateJobData, which is unexpected in JobCard."
      );
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this job application?")) {
      await onDelete(job.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">{job.position}</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">
            {job.company}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={statusColors[job.status]}>{job.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <JobForm
                job={job}
                onSubmit={handleUpdate}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {job.location && (
            <div className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              {job.location}
            </div>
          )}
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="mr-1 h-3 w-3" />
              {job.salary}
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(job.appliedAt).toLocaleDateString()}
          </div>
        </div>

        {job.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
        )}

        {job.notes && (
          <div className="mt-2 p-2 bg-muted rounded text-sm">
            <strong>Notes:</strong> {job.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
