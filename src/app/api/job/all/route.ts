import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1. Tentukan path file secara absolut dari root proyek
    const filePath = path.join(process.cwd(), "src/lib/jobs.json");

    // 2. Baca file secara sinkron (readFileSync)
    // 'utf-8' memastikan hasilnya berupa string, bukan Buffer
    const jsonData = fs.readFileSync(filePath, "utf-8");

    // 3. Parse string menjadi object JSON
    const jobs = JSON.parse(jsonData);

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error reading jobs.json:", error);
    
    return NextResponse.json(
      { message: "Failed to load database" },
      { status: 500 }
    );
  }
}