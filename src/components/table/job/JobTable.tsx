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
import { LinearProgress } from "@mui/material";
import { useMemo, useState } from "react";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import TableRowSkeleton from "../../skeleton/TableRowSkeleton";
import GenericDialog from "../../dialog/GenericDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import TableActionMenu from "./TableActionMenu";
import useSwr from "swr";
import { JobRowData } from "@/interface/row-table.interface";
import { IJobOffsetPrinter } from "@/interface/job.interface";
import { apiClient } from "@/utils/apiHelper";
import JobTableRow from "./JobTableRow";
import GenericModal from "@/components/modal/GenericModal";
import EditJobForm from "@/form/EditJobForm";
import JobConfirmationView from "@/components/view/JobConfirmationView";
import { filterJobs } from "@/utils/jobFilters";
import { getJobDialogConfig } from "@/components/dialog/jobDialogConfig";

const fetcher = () =>
  apiClient.get("/job/all").then((res) => {
    return res.data;
  });

function createData(user: IJobOffsetPrinter): JobRowData {
  return {
    id: user.id,
    work_order: user.work_order,
    sales_order: user.sales_order,
    machine_id: user.machine_id,
    quantity_order: user.quantity_order,
    quantity_unit: user.quantity_unit,
    planned_start_time: user.planned_start_time,
    release_date: user.release_date,
    due_date: user.due_date,
    notes: user.notes,
    job_priority: user.job_priority,
    job_lifecycle_state: user.job_lifecycle_state,
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

export default function JobTableManagement() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof JobRowData>("sales_order");
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<JobRowData | null>(null);
  const [modalType, setModalType] = useState<
    "edit" | "delete" | "disable" | "enable" | null
  >(null);
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [workOrderFilter, setWorkOrderFilter] = useState<string>("All");
  const [salesOrderFilter, setSalesOrderFilter] = useState<string>("All");
  const [machineFilter, setMachineFilter] = useState<string>("All");
  const [plannedDateFilter, setPlannedDateFilter] = useState<string>("");
  const [lifecycleFilter, setLifecycleFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [jobData, setJobData] = useState<any>(null);

  const {
    data: jobs,
    mutate,
    isLoading,
    error,
  } = useSwr<IJobOffsetPrinter[]>("/job/all", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    onError: (err) => {
      console.log(err);
    },
  });

  const rows = useMemo(() => {
    if (!jobs) return [];

    const jobsArray = Array.isArray(jobs) ? jobs : [jobs];

    return jobsArray.map((job) => createData(job));
  }, [jobs]);

  const showSnackbar = useSnackbar();

  const handleSuccess = (data: any) => {
    setJobData(data);
    setStep("success");
  };

  const dialogConfig = getJobDialogConfig(modalType);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: JobRowData,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const closeAll = () => {
    setModalType(null);
    setActiveRow(null);
    setStep("form");
    setJobData(null);
  };

  const handleAction = (
    type: "edit" | "delete" | "disable" | "enable",
    row: JobRowData,
  ) => {
    setAnchorEl(null);
    setModalType(type);
    setActiveRow(row);
  };

  const filteredRows = useMemo(
    () =>
      filterJobs(rows, {
        searchQuery,
        workOrderFilter,
        salesOrderFilter,
        machineFilter,
        plannedDateFilter,
        lifecycleFilter,
        priorityFilter,
      }),
    [
      rows,
      searchQuery,
      workOrderFilter,
      salesOrderFilter,
      machineFilter,
      plannedDateFilter,
      lifecycleFilter,
      priorityFilter,
    ],
  );

  const handleDisableJob = async (id: string) => {
    try {
      setLoading(true);
      // await accountsApi.accountControllerDisable(id);
      showSnackbar("Job disabled successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to disable job", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEnableJob = async (id: string) => {
    try {
      setLoading(true);
      // await accountsApi.accountControllerEnable(id);
      showSnackbar("Job reactivated successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to reactivate job", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      setLoading(true);
      // await accountsApi.accountControllerDelete(id);
      showSnackbar("Job deleted successfully", "success");
      closeAll();
      mutate();
    } catch (error) {
      showSnackbar("Failed to delete job", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof JobRowData,
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
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
          <EnhancedTableToolbar
            onRefresh={mutate}
            workOrderFilter={workOrderFilter}
            salesOrderFilter={salesOrderFilter}
            machineFilter={machineFilter}
            plannedDateFilter={plannedDateFilter}
            lifecycleFilter={lifecycleFilter}
            priorityFilter={priorityFilter}
            onSearch={(val) => setSearchQuery(val)}
            onFilterWorkOrder={(workOrder) => {
              setWorkOrderFilter(workOrder), setPage(0);
            }}
            onFilterSalesOrder={(salesOrder) => {
              setSalesOrderFilter(salesOrder), setPage(0);
            }}
            onFilterMachine={(machine) => {
              setMachineFilter(machine), setPage(0);
            }}
            onFilterPlannedDate={(plannedDate) => {
              setPlannedDateFilter(plannedDate), setPage(0);
            }}
            onFilterLifecycle={(status) => {
              setLifecycleFilter(status), setPage(0);
            }}
            onFilterPriority={(priority) => {
              setPriorityFilter(priority), setPage(0);
            }}
          />
          <Box sx={{ height: 4 }}>{loading && <LinearProgress />}</Box>
          <TableContainer
            sx={{ overflowX: "auto", whiteSpace: "nowrap", maxHeight: 600 }}
          >
            <Table
              sx={{ minWidth: 1100, tableLayout: "auto" }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
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
                  visibleRows.map((row, index) => (
                    <JobTableRow
                      key={row.work_order}
                      row={row}
                      onOpenMenu={handleOpenMenu}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>

      <TableActionMenu
        anchorEl={anchorEl}
        activeRow={activeRow}
        onClose={handleCloseMenu}
        onEdit={(row) => handleAction("edit", row)}
        onDisable={(row) => handleAction("disable", row)}
        onEnable={(row) => handleAction("enable", row)}
        onDelete={(row) => handleAction("delete", row)}
      />

      <GenericDialog
        open={
          modalType === "disable" ||
          modalType === "delete" ||
          modalType === "enable"
        }
        onClose={closeAll}
        title={dialogConfig.title}
        content={dialogConfig.content}
        subContent={dialogConfig.subContent}
        negativeText="Cancel"
        positiveText={dialogConfig.positiveText}
        onConfirm={() => {
          if (!activeRow) return;
          if (modalType === "disable") handleDisableJob(activeRow.id);
          if (modalType === "enable") handleEnableJob(activeRow.id);
          if (modalType === "delete") handleDeleteJob(activeRow.id);
        }}
        onRefresh={mutate}
      />

      <GenericModal
        open={modalType === "edit"}
        onClose={closeAll}
        title="Edit Job"
        maxWidth={step === "form" ? 1000 : 400}
      >
        {activeRow && (
          <>
            {step === "form" ? (
              <EditJobForm
                data={activeRow}
                onSuccess={(data) => {
                  handleSuccess(data);
                  setStep("success");
                }}
                onCancel={closeAll}
              />
            ) : (
              <JobConfirmationView
                data={jobData}
                onSuccess={closeAll}
                onBack={() => setStep("form")}
                type="edit"
              />
            )}
          </>
        )}
      </GenericModal>
    </>
  );
}
