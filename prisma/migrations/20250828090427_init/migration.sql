-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('APPLIED', 'SCREENING', 'INTERVIEW', 'REJECTED', 'OFFERED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT,
    "salary" TEXT,
    "description" TEXT,
    "status" "public"."Status" NOT NULL DEFAULT 'APPLIED',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
