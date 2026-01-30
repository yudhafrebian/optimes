// src/interface/job.interface.ts

import { AccountResponseDto, CreateLookupDto } from "@/api-client";

export interface IJobOffsetPrinter {
  id: string;
  work_order: string;
  sales_order: string;
  product_name: string;
  quantity_order: number;
  quantity_unit: CreateLookupDto;           // Isinya: { label: "BK", code: "BK", ... }
  product_count_per_meter: number;
  assigned_entity: CreateLookupDto;         // Mesin
  assigned_operator_1?: AccountResponseDto;
  assigned_operator_2?: AccountResponseDto;
  planned_start_time: string;
  estimated_production_time_in_minute: number;
  planned_end_time: string;
  job_priority: CreateLookupDto;            // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: CreateLookupDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}