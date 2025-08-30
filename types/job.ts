export type Status =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "REJECTED"
  | "OFFERED"
  | "ACCEPTED";

export interface Job {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  salary?: string | null;
  description?: string | null;
  status: Status;
  appliedAt: Date;
  updatedAt: Date;
  notes?: string | null;
}

export interface CreateJobData {
  company: string;
  position: string;
  location?: string;
  salary?: string;
  description?: string;
  notes?: string;
}

export interface UpdateJobData extends CreateJobData {
  status: Status;
}
