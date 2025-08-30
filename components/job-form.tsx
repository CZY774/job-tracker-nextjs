"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Job, CreateJobData, UpdateJobData, Status } from "@/types/job";

interface JobFormProps {
  job?: Job;
  onSubmit: (data: CreateJobData | UpdateJobData) => Promise<void>;
  trigger?: React.ReactNode;
}

const statusOptions = [
  { value: "APPLIED", label: "Applied" },
  { value: "SCREENING", label: "Screening" },
  { value: "INTERVIEW", label: "Interview" },
  { value: "OFFERED", label: "Offered" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "REJECTED", label: "Rejected" },
];

export function JobForm({ job, onSubmit, trigger }: JobFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: job?.company || "",
    position: job?.position || "",
    location: job?.location || "",
    salary: job?.salary || "",
    description: job?.description || "",
    status: job?.status || ("APPLIED" as Status),
    notes: job?.notes || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = job
        ? ({ ...formData, status: formData.status } as UpdateJobData)
        : (formData as CreateJobData);

      await onSubmit(submitData);
      setOpen(false);
      if (!job) {
        setFormData({
          company: "",
          position: "",
          location: "",
          salary: "",
          description: "",
          status: "APPLIED",
          notes: "",
        });
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {job ? "Edit Job Application" : "Add New Job Application"}
          </DialogTitle>
          <DialogDescription>
            {job
              ? "Update your job application details."
              : "Add a new job application to track."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                placeholder="e.g., $80,000 - $100,000"
              />
            </div>
          </div>

          {job && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Status) =>
                  handleInputChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              className="min-h-[60px]"
              placeholder="Interview date, contact person, etc."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : job ? "Update" : "Add Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
