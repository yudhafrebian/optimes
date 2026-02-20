import dayjs from "dayjs";
import { JobFiltersData, JobRowData, OperatorRowData } from "@/interface/row-table.interface";

export type JobFilters = {
  workOrderFilter: string;
  salesOrderFilter: string;
  periodFilter: string;
};

export const operatorFilter = (rows: OperatorRowData[], filters: JobFilters) => {
  const {
    workOrderFilter,
    salesOrderFilter,
    periodFilter,
  } = filters;

  return rows.filter((row) => {
    const matchesWorkOrder =
      workOrderFilter === "All" || row.work_order === workOrderFilter;
    const matchesSalesOrder =
      salesOrderFilter === "All" || row.sales_order === salesOrderFilter;
    const plannedStart = row.planned_start_time
      ? dayjs(row.planned_start_time)
      : null;
    const matchesPeriod =
      periodFilter === "All" ||
      (plannedStart &&
        ((periodFilter === "Today" &&
          plannedStart.isSame(dayjs(), "day")) ||
          (periodFilter === "This Week" &&
            plannedStart.isSame(dayjs(), "week")) ||
          (periodFilter === "This Month" &&
            plannedStart.isSame(dayjs(), "month"))));

    return (
      matchesWorkOrder &&
      matchesSalesOrder &&
      matchesPeriod
    );
  });
};
