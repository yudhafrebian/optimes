"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LinearProgress, useMediaQuery, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import TableRowSkeleton from "../../skeleton/TableRowSkeleton";
import { useSnackbar } from "@/hooks/useSnackbar";
import useSwr from "swr";
import { OperatorRowData } from "@/interface/row-table.interface";
import { IJobOffsetPrinter } from "@/interface/job.interface";
import { commonApi } from "@/lib/api";
import { getJobDialogConfig } from "@/components/dialog/jobDialogConfig";
import { operatorFilter } from "@/utils/operatorFilter";
import OperatorTableRow from "./OperatorTableRow";

const fetcher = () => commonApi.jobOffsetPrinterTaiyoControllerGetAll();

function createData(user: IJobOffsetPrinter): OperatorRowData {
  return {
    id: user.id,
    work_order: user.work_order,
    sales_order: user.sales_order,
    quantity_order: user.quantity_order,
    quantity_unit: user.quantity_unit,
    planned_start_time: user.planned_start_time,
    notes: user.notes,
    job_lifecycle_state: user.job_lifecycle_state,
    work_center: user.work_center,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T>(
  order: Order,
  orderBy: keyof T,
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function OperatorTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof OperatorRowData>("sales_order");
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [workOrderFilter, setWorkOrderFilter] = useState<string>("All");
  const [salesOrderFilter, setSalesOrderFilter] = useState<string>("All");
  const [machineFilter, setMachineFilter] = useState<string>("All");
  const [plannedDateFilter, setPlannedDateFilter] = useState<string>("");
  const [periodFilter, setPeriodFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

  const {
    data: jobs,
    mutate,
    isLoading,
    error,
  } = useSwr<IJobOffsetPrinter[]>("jobs", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    onError: (err) => {
      console.log(err);
    },
  });

  const rows = useMemo(() => {
    if (!jobs) return [];

    const jobsArray = Array.isArray(jobs) ? jobs : [jobs];

    return jobsArray
      .map((job) => createData(job))
      .filter((item) => {
        const lifecycleLabel = item.job_lifecycle_state?.label;
        return lifecycleLabel === "Released" || lifecycleLabel === "Running";
      });
  }, [jobs]);



  const filteredRows = useMemo(
    () =>
      operatorFilter(rows, {
        workOrderFilter,
        salesOrderFilter,
        periodFilter,
      }),
    [rows, workOrderFilter, salesOrderFilter, periodFilter],
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OperatorRowData,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
          <EnhancedTableToolbar
            data={rows}
            onRefresh={mutate}
            workOrderFilter={workOrderFilter}
            salesOrderFilter={salesOrderFilter}
            machineFilter={machineFilter}
            plannedDateFilter={plannedDateFilter}
            periodFilter={periodFilter}
            priorityFilter={priorityFilter}
            onSearch={(val) => setSearchQuery(val)}
            onFilterWorkOrder={(workOrder) => {
              setWorkOrderFilter(workOrder);
              setPage(0);
            }}
            onFilterSalesOrder={(salesOrder) => {
              setSalesOrderFilter(salesOrder);
              setPage(0);
            }}
            onFilterMachine={(machine) => {
              setMachineFilter(machine);
              setPage(0);
            }}
            onFilterPlannedDate={(plannedDate) => {
              setPlannedDateFilter(plannedDate);
              setPage(0);
            }}
            onFilterPeriod={(period) => {
              setPeriodFilter(period);
              setPage(0);
            }}
            onFilterPriority={(priority) => {
              setPriorityFilter(priority);
              setPage(0);
            }}
          />
          <Box sx={{ height: 4 }}>{loading && <LinearProgress />}</Box>
          <TableContainer
            sx={{ overflowX: "auto", whiteSpace: "nowrap", maxHeight: 600 }}
          >
            <Table
              sx={{ minWidth: isSmallScreen ? 900 : 1100, tableLayout: "auto" }}
              aria-labelledby="tableTitle"
              size="small"
              stickyHeader
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {(isLoading && rows.length === 0) || loading ? (
                  <TableRowSkeleton rows={rowsPerPage} />
                ) : (
                  visibleRows.map((row) => (
                    <OperatorTableRow key={row.id} row={row} />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-toolbar": {
                flexWrap: { xs: "wrap", sm: "nowrap" },
                justifyContent: { xs: "center", sm: "flex-end" },
                rowGap: 1,
                px: { xs: 1, sm: 2 },
              },
            }}
          />
        </Paper>
      </Box>
    </>
  );
}
