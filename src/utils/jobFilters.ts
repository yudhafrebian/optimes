import dayjs from "dayjs";
import { JobRowData } from "@/interface/row-table.interface";

export type JobFilters = {
  searchQuery: string;
  workOrderFilter: string;
  salesOrderFilter: string;
  machineFilter: string;
  plannedDateFilter: string;
  lifecycleFilter: string;
  priorityFilter: string;
};

export const filterJobs = (rows: JobRowData[], filters: JobFilters) => {
  const {
    searchQuery,
    workOrderFilter,
    salesOrderFilter,
    machineFilter,
    plannedDateFilter,
    lifecycleFilter,
    priorityFilter,
  } = filters;

  return rows.filter((row) => {
    const matchesSearch = row.work_order
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesWorkOrder =
      workOrderFilter === "All" || row.work_order === workOrderFilter;
    const matchesSalesOrder =
      salesOrderFilter === "All" || row.sales_order === salesOrderFilter;
    const matchesMachine =
      machineFilter === "All" || row.machine_id.label === machineFilter;
    const matchesPlannedDate =
      plannedDateFilter === "" ||
      (row.planned_start_time &&
        dayjs(row.planned_start_time).isSame(dayjs(plannedDateFilter), "day"));
    const matchesLifecycle =
      lifecycleFilter === "All" ||
      row.job_lifecycle_state.label === lifecycleFilter;
    const matchesPriority =
      priorityFilter === "All" || row.job_priority.label === priorityFilter;

    return (
      matchesSearch &&
      matchesWorkOrder &&
      matchesSalesOrder &&
      matchesMachine &&
      matchesPlannedDate &&
      matchesLifecycle &&
      matchesPriority
    );
  });
};
