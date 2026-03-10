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
import GenericDialog from "../../dialog/GenericDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import TableActionMenu from "./TableActionMenu";
import useSwr from "swr";
import { JobRowData } from "@/interface/row-table.interface";
import { IJobOffsetPrinter } from "@/interface/job.interface";
import JobTableRow from "./JobTableRow";
import GenericModal from "@/components/modal/GenericModal";
import EditJobForm from "@/form/EditJobForm";
import JobConfirmationView from "@/components/view/JobConfirmationView";
import { filterJobs } from "@/utils/jobFilters";
import { getJobDialogConfig } from "@/components/dialog/jobDialogConfig";
import { commonApi } from "@/lib/api";
import { usePathname } from "next/navigation";

const fetcher = () =>
  commonApi.jobOffsetPrinterTaiyoControllerGetAll().then((res) => {
    console.log(res)
    return res;
  });

function createData(user: IJobOffsetPrinter): JobRowData {
  return {
    id: user.id,
    work_order: user.work_order,
    sales_order: user.sales_order,
    work_center: user.work_center,
    quantity_order: user.quantity_order,
    quantity_unit: user.quantity_unit,
    planned_start_time: user.planned_start_time,
    release_date: user.release_date,
    completed_date: user.complete_date,
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof JobRowData>("sales_order");
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<JobRowData | null>(null);
  const [modalType, setModalType] = useState<
    "edit" | "delete" | "cancel" | "release" | "completed" | null
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

  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");

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

    const jobsArray = Array.isArray(jobs) ? jobs : [];

    const filtered = jobsArray.filter((job) => {
      if (isJobManagement) {
        return (
          job.job_lifecycle_state.label !== "Cancelled" &&
          job.job_lifecycle_state.label !== "Completed"
        );
      } else {
        return (
          job.job_lifecycle_state.label !== "Scheduled" &&
          job.job_lifecycle_state.label !== "Released" &&
          job.job_lifecycle_state.label !== "Running" &&
          job.job_lifecycle_state.label !== "Suspended"
        );
      }
    });

    return filtered.map((job) => createData(job));
  }, [jobs, isJobManagement]);

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
    type: "edit" | "delete" | "cancel" | "release" | "completed",
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

  const handleCancelJob = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.jobOffsetPrinterTaiyoControllerCancel(id);
      showSnackbar("Job cancelled successfully", "success");
      closeAll();
      mutate();
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseJob = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.jobOffsetPrinterTaiyoControllerRelease(id);
      showSnackbar("Job reactivated successfully", "success");
      closeAll();
      mutate();
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCompletedJob = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.jobOffsetPrinterTaiyoControllerComplete(id);
      showSnackbar("Job completed successfully", "success");
      closeAll();
      mutate();
    } catch (error:any) {
      console.log(error)
      showSnackbar(error.response.data.message, "error")
    }
  }

  const handleDeleteJob = async (id: string) => {
    try {
      setLoading(true);
      await commonApi.jobOffsetPrinterTaiyoControllerRemove(id);
      showSnackbar("Job deleted successfully", "success");
      closeAll();
      mutate();
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
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
            onFilterLifecycle={(status) => {
              setLifecycleFilter(status);
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
                  visibleRows.map((row, index) => (
                    <JobTableRow
                      key={index}
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

      <TableActionMenu
        anchorEl={anchorEl}
        activeRow={activeRow}
        onClose={handleCloseMenu}
        onEdit={(row) => handleAction("edit", row)}
        onCancel={(row) => handleAction("cancel", row)}
        onRelease={(row) => handleAction("release", row)}
        onDelete={(row) => handleAction("delete", row)}
        onComplete={(row) => handleAction("completed", row)}
      />

      <GenericDialog
        open={
          modalType === "cancel" ||
          modalType === "delete" ||
          modalType === "release" ||
          modalType === "completed"
        }
        onClose={closeAll}
        title={dialogConfig.title}
        content={dialogConfig.content}
        subContent={dialogConfig.subContent}
        negativeText="Cancel"
        positiveText={dialogConfig.positiveText}
        onConfirm={() => {
          if (!activeRow) return;
          if (modalType === "cancel") handleCancelJob(activeRow.id);
          if (modalType === "release") handleReleaseJob(activeRow.id);
          if (modalType === "delete") handleDeleteJob(activeRow.id);
          if (modalType === "completed") handleCompletedJob(activeRow.id);
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
