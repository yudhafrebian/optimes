import { AccountResponseDto } from "@/api-client";

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
  work_order: string;
  sales_order: string;
  product_name: string; //temporary, might be changed
  assigned_entity: string;
  quantity_order: number;
  planned_start_time: string;
  job_lifecycle_state: string;
  assigned_operator_1: AccountResponseDto;
  assigned_operator_2?: AccountResponseDto;
}
