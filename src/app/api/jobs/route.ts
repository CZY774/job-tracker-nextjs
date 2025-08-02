import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { JobStatus } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const jobs = await prisma.job.findMany({
      where: status ? { status: status as JobStatus } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, position, location, salary, notes } = body;

    if (!company || !position) {
      return NextResponse.json(
        { error: "Company and position are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        company,
        position,
        location: location || null,
        salary: salary || null,
        notes: notes || null,
        status: JobStatus.APPLIED,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
