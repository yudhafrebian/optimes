import dayjs from "dayjs";
import { JobRowData } from "@/interface/row-table.interface";

export type JobFilters = {
  searchQuery?: string;
  workOrderFilter: string;
  salesOrderFilter: string;
  machineFilter: string;
  plannedDateFilter: string;
  lifecycleFilter?: string;
  periodFilter?: string;
  priorityFilter: string;
};

export const filterJobs = (rows: JobRowData[], filters: JobFilters) => {
  const {
    searchQuery = "",
    workOrderFilter,
    salesOrderFilter,
    machineFilter,
    plannedDateFilter,
    lifecycleFilter = "All",
    periodFilter = "All",
    priorityFilter,
  } = filters;

  return rows.filter((row) => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const machineLabel = row.work_center?.label ?? "";
    const lifecycleLabel = row.job_lifecycle_state?.label ?? "";
    const priorityLabel = row.job_priority?.label ?? "";
    const noteLabel = row.notes ?? "";

    const matchesSearch =
      normalizedSearch === "" ||
      row.work_order?.toLowerCase().includes(normalizedSearch) ||
      row.sales_order?.toLowerCase().includes(normalizedSearch) ||
      machineLabel.toLowerCase().includes(normalizedSearch) ||
      noteLabel.toLowerCase().includes(normalizedSearch);

    const matchesWorkOrder =
      workOrderFilter === "All" || row.work_order === workOrderFilter;
    const matchesSalesOrder =
      salesOrderFilter === "All" || row.sales_order === salesOrderFilter;
    const matchesMachine =
      machineFilter === "All" || machineLabel === machineFilter;
    const matchesPlannedDate =
      plannedDateFilter === "" ||
      (row.planned_start_time &&
        dayjs(row.planned_start_time).isSame(dayjs(plannedDateFilter), "day"));
    const plannedStart = row.planned_start_time
      ? dayjs(row.planned_start_time)
      : null;
    const matchesLifecycle =
      lifecycleFilter === "All" || lifecycleLabel === lifecycleFilter;
    const matchesPeriod =
      periodFilter === "All" ||
      (plannedStart &&
        ((periodFilter === "Today" &&
          plannedStart.isSame(dayjs(), "day")) ||
          (periodFilter === "This Week" &&
            plannedStart.isSame(dayjs(), "week")) ||
          (periodFilter === "This Month" &&
            plannedStart.isSame(dayjs(), "month"))));
    const matchesPriority =
      priorityFilter === "All" || priorityLabel === priorityFilter;

    return (
      matchesLifecycle &&
      matchesSearch &&
      matchesWorkOrder &&
      matchesSalesOrder &&
      matchesMachine &&
      matchesPlannedDate &&
      matchesPeriod &&
      matchesPriority
    );
  });
};
