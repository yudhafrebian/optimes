import { LookupResponseDto } from "@/api/generated/common-service";

export interface UserRowData {
  id: string;
  username: string;
  lifecycle: string;
  role: string;
  account_type: string;
  account_expiry_date: string;
  password_last_changed: string;
  password_expiry_time: string;
  must_change_password: boolean;
  last_login: string;
  full_name: string;
}

export interface JobRowData {
  id: string;
  work_order: string;
  sales_order: string;
  work_center: LookupResponseDto;
  quantity_order: number;
  quantity_unit: LookupResponseDto;           // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  release_date?: string;
  completed_date?: string;
  due_date?: string;
  job_priority: LookupResponseDto;            // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: LookupResponseDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}

export interface OperatorRowData {
  id: string;
  work_center: LookupResponseDto;
  work_order: string;
  sales_order: string;
  quantity_order: number;
  quantity_unit: LookupResponseDto;           // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;           // Isinya: { label: "High", code: "HIGH", ... }
  release_date?: string;
  job_lifecycle_state: LookupResponseDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}

export interface ExecutionHistoryRowData {
  id: string;
  event_path: string;
  start_ts: string;
  end_ts?: string;
  status: string;
  severity: string;
  context: string;
  notes_on_open?: string;
  notes_on_close?: string;
}

export interface JobFiltersData {
  id: string;
  work_order: string;
  sales_order: string;
  work_center?: LookupResponseDto;
  quantity_order: number;
  quantity_unit: LookupResponseDto;           // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  release_date?: string;
  due_date?: string;
  job_priority?: LookupResponseDto;            // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: LookupResponseDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}
