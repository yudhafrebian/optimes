"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { LinearProgress, useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { useAtom } from "jotai";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import TableRowSkeleton from "../../../skeleton/TableRowSkeleton";
import JobHistoryTableRow from "./JobHistoryTableRow";
import { loadedDataAtom } from "@/atoms/loader.atom";
import { ExecutionHistoryRowData } from "@/interface/row-table.interface";
import { assetsApi } from "@/lib/api";
import { EventRow } from "@/api/generated/assets-service";

function createData(event: EventRow): ExecutionHistoryRowData {
  return {
    id: event.id,
    event_path: event.event_path,
    start_ts: event.start_ts,
    end_ts: event.end_ts ?? undefined,
    status: event.status ?? "-",
    severity: event.severity ?? "-",
    context: JSON.stringify(event.context ?? {}),
    notes_on_open: event.notes_on_open ?? "-",
    notes_on_close: event.notes_on_close ?? "-",
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

export default function JobHistoryTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof ExecutionHistoryRowData>("start_ts");
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading] = useState<boolean>(false);

  const [activityFilter, setActivityFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [periodFilter, setPeriodFilter] = useState<string>("All");

  const [loaderData] = useAtom(loadedDataAtom);

  const pattern =
    loaderData.work_center.code && loaderData.work_order
      ? `${loaderData.work_center.code}/Job/${loaderData.work_order}/Lifecycle/*`
      : null;

  const { data, mutate, isLoading } = useSWR(
    pattern ? ["event-history-table", pattern] : null,
    async ([, eventPattern]) =>
      assetsApi.queryEvents({
        pattern: eventPattern,
      }),
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
    },
  );

  const rows = useMemo(() => {
    if (!data?.rows) return [];
    return data.rows.map((event) => createData(event));
  }, [data]);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const activity = row.event_path.split("/").slice(-1)[0] ?? "-";
        const matchesActivity =
          activityFilter === "All" || activity === activityFilter;
        const matchesStatus =
          statusFilter === "All" || row.status === statusFilter;

        const start = row.start_ts ? dayjs(row.start_ts) : null;
        const matchesPeriod =
          periodFilter === "All" ||
          (start &&
            ((periodFilter === "Today" && start.isSame(dayjs(), "day")) ||
              (periodFilter === "This Week" && start.isSame(dayjs(), "week")) ||
              (periodFilter === "This Month" && start.isSame(dayjs(), "month"))));

        return Boolean(matchesActivity && matchesStatus && matchesPeriod);
      }),
    [rows, activityFilter, statusFilter, periodFilter],
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ExecutionHistoryRowData,
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
        <EnhancedTableToolbar
          data={rows}
          onRefresh={() => {
            void mutate();
          }}
          activityFilter={activityFilter}
          statusFilter={statusFilter}
          periodFilter={periodFilter}
          onFilterActivity={(value) => {
            setActivityFilter(value);
            setPage(0);
          }}
          onFilterStatus={(value) => {
            setStatusFilter(value);
            setPage(0);
          }}
          onFilterPeriod={(value) => {
            setPeriodFilter(value);
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
                visibleRows.map((row) => <JobHistoryTableRow key={row.id} row={row} />)
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

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        sx={{ display: { xs: "none", sm: "inline-flex" } }}
      /> */}
    </Box>
  );
}
