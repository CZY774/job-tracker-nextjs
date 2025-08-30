import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { updatedAt: "desc" },
    });

    // Convert to CSV
    const headers = [
      "Company",
      "Position",
      "Location",
      "Salary",
      "Status",
      "Applied At",
      "Notes",
    ];
    const csvRows = [
      headers.join(","),
      ...jobs.map((job) =>
        [
          `"${job.company}"`,
          `"${job.position}"`,
          `"${job.location || ""}"`,
          `"${job.salary || ""}"`,
          job.status,
          job.appliedAt.toISOString().split("T")[0],
          `"${job.notes || ""}"`,
        ].join(",")
      ),
    ];

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="job-applications.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
