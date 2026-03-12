import { LookupResponseDto } from "@/api-client";

export interface Data {
  id: string;
  work_order: string;
  sales_order: string;
  work_center: LookupResponseDto; // Isinya: { label: "Offset Printer 1", code: "OFFSET_PRINTER_1", ... }
  quantity_order: number;
  quantity_unit: LookupResponseDto; // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  release_date?: string;
  due_date: string;
  completed_date: string;
  job_priority: LookupResponseDto; // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: LookupResponseDto; // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}

type Order = "asc" | "desc";
export type ColumnId = keyof Data | "actions";

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: keyof Data;
}

interface HeadCell {
  disablePadding: boolean;
  id: ColumnId;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "job_lifecycle_state",
    numeric: false,
    disablePadding: false,
    label: "Job Lifecycle State",
  },
  {
    id: "work_order",
    numeric: false,
    disablePadding: false,
    label: "Work Order",
  },
  {
    id: "sales_order",
    numeric: false,
    disablePadding: false,
    label: "Sales Order",
  },
  {
    id: "work_center",
    numeric: false,
    disablePadding: false,
    label: "Work Center",
  },
  {
    id: "quantity_order",
    numeric: false,
    disablePadding: false,
    label: "Quantity Order",
  },
  {
    id: "planned_start_time",
    numeric: false,
    disablePadding: false,
    label: "Planned Start Time",
  },
  {
    id: "due_date",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "release_date",
    numeric: false,
    disablePadding: false,
    label: "Release Date",
  },

  {
    id: "job_priority",
    numeric: false,
    disablePadding: false,
    label: "Job Priority",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export const reportHeadCells: readonly HeadCell[] = [
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
  {
    id: "job_lifecycle_state",
    numeric: false,
    disablePadding: false,
    label: "Job Lifecycle State",
  },
  {
    id: "work_order",
    numeric: false,
    disablePadding: false,
    label: "Work Order",
  },
  {
    id: "sales_order",
    numeric: false,
    disablePadding: false,
    label: "Sales Order",
  },
  {
    id: "work_center",
    numeric: false,
    disablePadding: false,
    label: "Work Center",
  },
  {
    id: "quantity_order",
    numeric: false,
    disablePadding: false,
    label: "Quantity Order",
  },
  {
    id: "planned_start_time",
    numeric: false,
    disablePadding: false,
    label: "Planned Start Time",
  },
  {
    id: "due_date",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "release_date",
    numeric: false,
    disablePadding: false,
    label: "Release Date",
  },
  {
    id: "completed_date",
    numeric: false,
    disablePadding: false,
    label: "Completed Date",
  },
  {
    id: "job_priority",
    numeric: false,
    disablePadding: false,
    label: "Job Priority",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
];
