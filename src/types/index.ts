export enum JobStatus {
  APPLIED = "APPLIED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
  OFFER_RECEIVED = "OFFER_RECEIVED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}

export interface Job {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  salary?: string | null;
  status: JobStatus;
  appliedDate: Date;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobData {
  company: string;
  position: string;
  location?: string;
  salary?: string;
  notes?: string;
}

export interface UpdateJobData {
  status?: JobStatus;
  company?: string;
  position?: string;
  location?: string;
  salary?: string;
  notes?: string;
}
