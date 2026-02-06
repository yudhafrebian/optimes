// src/interface/job.interface.ts

import { AccountResponseDto, CreateLookupDto, LookupResponseDto } from "@/api-client";

export interface IJobOffsetPrinter {
  id: string;
  work_order: string;
  sales_order: string;
  machine_id: LookupResponseDto;
  quantity_order: number;
  quantity_unit: LookupResponseDto;           // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  release_date?: string;
  due_date?: string;
  job_priority: LookupResponseDto;            // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: LookupResponseDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}