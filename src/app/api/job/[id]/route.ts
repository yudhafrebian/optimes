import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  try {
    const filePath = path.join(process.cwd(), "src/lib/jobs.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const jobs = JSON.parse(jsonData) as Array<{ id?: string }>;

    const job = jobs.find((item) => item.id === params.id);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error reading jobs.json:", error);
    return NextResponse.json(
      { message: "Failed to load database" },
      { status: 500 },
    );
  }
}
