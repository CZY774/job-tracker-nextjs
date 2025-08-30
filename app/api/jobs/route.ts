import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Status } from "@/types/job";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as Status | null;

    const jobs = await prisma.job.findMany({
      where: status ? { status } : undefined,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const job = await prisma.job.create({
      data: {
        company: data.company,
        position: data.position,
        location: data.location || null,
        salary: data.salary || null,
        description: data.description || null,
        notes: data.notes || null,
        status: data.status || "APPLIED",
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const job = await prisma.job.update({
      where: { id },
      data: {
        company: updateData.company,
        position: updateData.position,
        location: updateData.location || null,
        salary: updateData.salary || null,
        description: updateData.description || null,
        notes: updateData.notes || null,
        status: updateData.status,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID required" }, { status: 400 });
    }

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
