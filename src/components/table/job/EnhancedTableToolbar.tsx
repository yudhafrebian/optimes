"use client";

import {
  Alert,
  AlertTitle,
  alpha,
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import GenericModal from "@/components/modal/GenericModal";
import { commonApi } from "@/lib/api";
import {
  CreateJobOffsetPrinterTaiyoDto,
  JobOffsetPrinterTaiyoImportErrorDto,
  JobOffsetPrinterTaiyoListResponseDto,
  JobOffsetPrinterTaiyoUploadPreviewResponseDto,
  LookupResponseDto,
} from "@/api/generated/common-service";
import CreateJobForm, { defaultJobFormValues } from "@/form/CreateJobForm";
import JobConfirmationView from "@/components/view/JobConfirmationView";
import ImportForm from "@/form/ImportForm";
import { useSnackbar } from "@/hooks/useSnackbar";
import { usePathname } from "next/navigation";
import useSwr from "swr";
import ImportPreviewTable from "./ImportPreviewTable";

interface EnhancedTableToolbarProps {
  workOrderFilter: string;
  salesOrderFilter: string;
  machineFilter: string;
  plannedDateFilter: string;
  lifecycleFilter: string;
  priorityFilter: string;
  onSearch: (value: string) => void;
  onFilterWorkOrder: (workOrder: string) => void;
  onFilterSalesOrder: (salesOrder: string) => void;
  onFilterMachine: (machine: string) => void;
  onFilterPlannedDate: (plannedDate: string) => void;
  onFilterLifecycle: (lifecycle: string) => void;
  onFilterPriority: (priority: string) => void;
  onRefresh: () => void;
}

type FilterData = {
  orders: JobOffsetPrinterTaiyoListResponseDto[];
  workCenters: LookupResponseDto[];
  lifecycles: LookupResponseDto[];
  priorities: LookupResponseDto[];
};

const fetchFilterData = async (): Promise<FilterData> => {
  const [orderRes, workCenterRes, lifecycleRes, priorityRes] =
    await Promise.all([
      commonApi.jobOffsetPrinterTaiyoControllerGetAll(),
      commonApi.lookupControllerFindAll({ type: "WORK_CENTER" }),
      commonApi.lookupControllerFindAll({ type: "JOB_LIFECYCLE_STATE" }),
      commonApi.lookupControllerFindAll({ type: "JOB_PRIORITY" }),
    ]);

  return {
    orders: orderRes,
    workCenters: workCenterRes,
    lifecycles: lifecycleRes,
    priorities: priorityRes,
  };
};

const formatImportErrorValue = (
  value?: JobOffsetPrinterTaiyoImportErrorDto["value"],
): string => {
  if (!value) return "-";

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    onRefresh,
    onSearch,
    workOrderFilter,
    salesOrderFilter,
    machineFilter,
    plannedDateFilter,
    lifecycleFilter,
    priorityFilter,
    onFilterWorkOrder,
    onFilterSalesOrder,
    onFilterMachine,
    onFilterPlannedDate,
    onFilterLifecycle,
    onFilterPriority,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [jobData, setJobData] =
    useState<CreateJobOffsetPrinterTaiyoDto>(defaultJobFormValues);
  const [draftJobData, setDraftJobData] =
    useState<CreateJobOffsetPrinterTaiyoDto>(defaultJobFormValues);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [importOpen, setImportOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewData, setPreviewData] =
    useState<JobOffsetPrinterTaiyoUploadPreviewResponseDto>(
      {} as JobOffsetPrinterTaiyoUploadPreviewResponseDto,
    );
  const [errMessage, setErrMessage] = useState<
    JobOffsetPrinterTaiyoImportErrorDto[]
  >([]);

  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");
  const showSnackbar = useSnackbar();

  const { data: filterData } = useSwr<FilterData>(
    "job-toolbar-filter-data",
    fetchFilterData,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
      onError: (error) => {
        console.error("Failed to fetch filters:", error);
      },
    },
  );

  const workOrderList = useMemo(() => {
    const seen = new Set<string>();
    const filtered = isJobManagement
      ? (filterData?.orders ?? []).filter(
          (state) =>
            state.job_lifecycle_state.label !== "Completed" &&
            state.job_lifecycle_state.label !== "Closed",
        )
      : (filterData?.orders ?? []).filter(
          (state) =>
            state.job_lifecycle_state.label !== "Scheduled" &&
            state.job_lifecycle_state.label !== "Released" &&
            state.job_lifecycle_state.label !== "Running" &&
            state.job_lifecycle_state.label !== "Suspended",
        );

    return filtered
      .map((item) => item.work_order)
      .filter((workOrder): workOrder is string => Boolean(workOrder))
      .filter((workOrder) => {
        if (seen.has(workOrder)) return false;
        seen.add(workOrder);
        return true;
      })
      .map((workOrder) => ({
        label: workOrder,
        value: workOrder,
      }));
  }, [filterData?.orders, isJobManagement]);

  const salesOrderList = useMemo(() => {
    const seen = new Set<string>();

    const filtered = isJobManagement
      ? (filterData?.orders ?? []).filter(
          (state) =>
            state.job_lifecycle_state.label !== "Completed" &&
            state.job_lifecycle_state.label !== "Closed",
        )
      : (filterData?.orders ?? []).filter(
          (state) =>
            state.job_lifecycle_state.label !== "Scheduled" &&
            state.job_lifecycle_state.label !== "Released" &&
            state.job_lifecycle_state.label !== "Running" &&
            state.job_lifecycle_state.label !== "Suspended",
        );

    return filtered
      .map((item) => item.sales_order)
      .filter((salesOrder): salesOrder is string => Boolean(salesOrder))
      .filter((salesOrder) => {
        if (seen.has(salesOrder)) return false;
        seen.add(salesOrder);
        return true;
      })
      .map((salesOrder) => ({
        label: salesOrder,
        value: salesOrder,
      }));
  }, [filterData?.orders, isJobManagement]);

  const lifeCycleOptions = (filterData?.lifecycles ?? []).map((item) => ({
    label: item.label,
    value: item.label,
  }));

  const filteredLifecycleOptions = isJobManagement
    ? lifeCycleOptions.filter(
        (item) => item.value !== "Closed" && item.value !== "Completed",
      )
    : lifeCycleOptions.filter(
        (item) =>
          item.value !== "Scheduled" &&
          item.value !== "Released" &&
          item.value !== "Running" &&
          item.value !== "Suspended",
      );

  const priorityOptions = (filterData?.priorities ?? []).map((item) => ({
    label: item.label,
    value: item.label,
  }));

  const workOrderOptions = [
    { label: "All Work Order", value: "All" },
    ...workOrderList,
  ];

  const salesOrderOptions = [
    { label: "All Sales Order", value: "All" },
    ...salesOrderList,
  ];

  const handleOpen = () => {
    setStep("form");
    setOpen(true);
  };

  const handleSuccess = (data: any) => {
    setJobData(data);
    setStep("success");
  };

  const handleClose = () => {
    setOpen(false);
    setDraftJobData(defaultJobFormValues);
    setTimeout(() => setStep("form"), 300);
  };

  const handleBack = () => {
    setStep("form");
  };

  const isFiltered =
    workOrderFilter !== "All" ||
    salesOrderFilter !== "All" ||
    machineFilter !== "All" ||
    plannedDateFilter !== "" ||
    lifecycleFilter !== "All" ||
    priorityFilter !== "All";

  const handleReset = () => {
    onFilterWorkOrder("All");
    onFilterSalesOrder("All");
    onFilterMachine("All");
    onFilterPlannedDate("");
    onFilterLifecycle("All");
    onFilterPriority("All");
    onSearch("");
    setSearchTerm("");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleImportPreview = async (file: File) => {
    try {
      setLoading(true);
      setErrMessage([]);
      const res =
        await commonApi.jobOffsetPrinterTaiyoControllerUploadExcelPreview({
          file,
        });
      const previewRes = res;
      setPreviewData(previewRes);

      if (previewRes.errors.length > 0) {
        setErrMessage(previewRes.errors);
        return;
      }
      showSnackbar("Preview ready", "success");
      setImportOpen(false);
      setPreviewOpen(true);
    } catch (error) {
      console.error("Import failed:", error);
      showSnackbar("Import failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { xs: 1, sm: 2 },
        pr: { xs: 1, sm: 1 },
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            {isJobManagement ? "Job List" : "Job Report List"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              width: { xs: "100%", sm: "auto" },
              flexWrap: "wrap",
            }}
          >
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={onRefresh}
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  width: { xs: 40, sm: "auto" },
                  height: 40,
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton
                onClick={() => setFilterDrawerOpen(true)}
                color={isFiltered ? "primary" : "default"}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  width: { xs: 40, sm: "auto" },
                  height: 40,
                  display: { xs: "inline-flex", md: "none" },
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                color="success"
                onClick={() => setImportOpen(true)}
                sx={{ flexGrow: { xs: 1, sm: 0 } }}
              >
                Import Excel
              </Button>
            )}
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{ flexGrow: { xs: 1, sm: 0 } }}
              >
                Add Job
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
            alignItems: "center",
            width: "100%",
            p: { xs: 0, sm: 2 },
            pt: { xs: 1, sm: 2 },
            pb: { xs: 1, sm: 2 },
            overflowX: { xs: "visible", md: "auto" },
          }}
        >
          <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              workOrderOptions.find(
                (option) => option.value === workOrderFilter,
              ) ?? null
            }
            onChange={(e, newValue) => onFilterWorkOrder(newValue?.value ?? "")}
            options={workOrderOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              minWidth: { xs: "100%", sm: 220, md: 150 },
              width: { xs: "100%", sm: 220, md: 180 },
              flex: "0 0 auto",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Work Order" />
            )}
          />
          <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              salesOrderOptions.find(
                (option) => option.value === salesOrderFilter,
              ) ?? null
            }
            onChange={(e, newValue) =>
              onFilterSalesOrder(newValue?.value ?? "")
            }
            options={salesOrderOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              minWidth: { xs: "100%", sm: 220, md: 150 },
              width: { xs: "100%", sm: 220, md: 180 },
              flex: "0 0 auto",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Sales Order" />
            )}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 220, md: 150 },
              width: { xs: "100%", sm: 220, md: 170 },
            }}
          >
            <InputLabel id="filter-work_center-label">Work Center</InputLabel>
            <Select
              labelId="filter-work_center-label"
              label="Work Center"
              value={machineFilter}
              onChange={(e) => onFilterMachine(e.target.value)}
            >
              <MenuItem value="All">All Work Center</MenuItem>
              {(filterData?.workCenters ?? []).map((t) => (
                <MenuItem key={t.code} value={t.label}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Planned Date"
            value={plannedDateFilter ? dayjs(plannedDateFilter) : null}
            onChange={(value) =>
              onFilterPlannedDate(value ? value.format("YYYY-MM-DD") : "")
            }
            slotProps={{
              textField: {
                size: "small",
                sx: {
                  width: { xs: "100%", sm: 220, md: 150 },
                },
              },
            }}
          />
          {/* Filter Lifecycle */}
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 220, md: 150 },
              width: { xs: "100%", sm: 220, md: 170 },
            }}
          >
            <InputLabel id="filter-lifecycle-label">Lifecycle</InputLabel>
            <Select
              labelId="filter-lifecycle-label"
              label="Lifecycle"
              value={lifecycleFilter}
              onChange={(e) => onFilterLifecycle(e.target.value)}
            >
              <MenuItem value="All">All Lifecycle</MenuItem>
              {filteredLifecycleOptions.map((l) => (
                <MenuItem key={l.label} value={l.label}>
                  {l.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Filter Type */}
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 220, md: 150 },
              width: { xs: "100%", sm: 220, md: 170 },
            }}
          >
            <InputLabel id="filter-priority-label">Priority</InputLabel>
            <Select
              labelId="filter-priority-label"
              label="Priority"
              value={priorityFilter}
              onChange={(e) => onFilterPriority(e.target.value)}
            >
              <MenuItem value="All">All Priority</MenuItem>
              {priorityOptions.map((t) => (
                <MenuItem key={t.label} value={t.label}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Reset Action */}
          {isFiltered && (
            <Tooltip title="Reset Filters">
              <IconButton
                onClick={handleReset}
                color="error"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  flex: "0 0 auto",
                  alignSelf: { xs: "flex-end", md: "center" },
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
            pb: 3,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 680,
            mx: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            <Autocomplete<{ label: string; value: string }, false, false, false>
              disablePortal
              size="small"
              value={
                workOrderOptions.find(
                  (option) => option.value === workOrderFilter,
                ) ?? null
              }
              onChange={(e, newValue) =>
                onFilterWorkOrder(newValue?.value ?? "")
              }
              options={workOrderOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField {...params} label="Work Order" />
              )}
            />
            <Autocomplete<{ label: string; value: string }, false, false, false>
              disablePortal
              size="small"
              value={
                salesOrderOptions.find(
                  (option) => option.value === salesOrderFilter,
                ) ?? null
              }
              onChange={(e, newValue) =>
                onFilterSalesOrder(newValue?.value ?? "")
              }
              options={salesOrderOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField {...params} label="Sales Order" />
              )}
            />
            <FormControl size="small">
              <InputLabel id="mobile-filter-work_center-label">
                Work Center
              </InputLabel>
              <Select
                labelId="mobile-filter-work_center-label"
                label="Work Center"
                value={machineFilter}
                onChange={(e) => onFilterMachine(e.target.value)}
              >
                <MenuItem value="All">All Work Center</MenuItem>
                {(filterData?.workCenters ?? []).map((t) => (
                  <MenuItem key={t.code} value={t.label}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="Planned Date"
              value={plannedDateFilter ? dayjs(plannedDateFilter) : null}
              onChange={(value) =>
                onFilterPlannedDate(value ? value.format("YYYY-MM-DD") : "")
              }
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
            <FormControl size="small">
              <InputLabel id="mobile-filter-lifecycle-label">
                Lifecycle
              </InputLabel>
              <Select
                labelId="mobile-filter-lifecycle-label"
                label="Lifecycle"
                value={lifecycleFilter}
                onChange={(e) => onFilterLifecycle(e.target.value)}
              >
                <MenuItem value="All">All Lifecycle</MenuItem>
                {filteredLifecycleOptions.map((l) => (
                  <MenuItem key={l.label} value={l.label}>
                    {l.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="mobile-filter-priority-label">
                Priority
              </InputLabel>
              <Select
                labelId="mobile-filter-priority-label"
                label="Priority"
                value={priorityFilter}
                onChange={(e) => onFilterPriority(e.target.value)}
              >
                <MenuItem value="All">All Priority</MenuItem>
                {priorityOptions.map((t) => (
                  <MenuItem key={t.label} value={t.label}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => setFilterDrawerOpen(false)}
            >
              Close
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleReset}
              disabled={!isFiltered}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Drawer>

      <GenericModal
        open={open}
        onClose={handleClose}
        title={step === "form" ? "Create Job" : "Create Job Confirmation"}
        maxWidth={step === "form" ? 1000 : 400}
      >
        {step === "form" ? (
          <CreateJobForm
            onCancel={handleClose}
            onSuccess={(data) => {
              handleSuccess(data);
            }}
            initialValues={draftJobData}
            onValuesChange={setDraftJobData}
          />
        ) : (
          <JobConfirmationView
            data={jobData}
            onBack={handleBack}
            onSuccess={() => {
              onRefresh();
              handleClose();
            }}
            type="create"
          />
        )}
      </GenericModal>

      <GenericModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Import Job File"
        maxWidth={600}
        maxHeight={600}
      >
        {loading && <LinearProgress />}
        <ImportForm
          onSubmit={handleImportPreview}
          onCancel={() => {
            setImportOpen(false);
            setErrMessage([]);
          }}
        />

        <Box sx={{ maxHeight: 200, overflowY: "auto", mt: 2 }}>
          {errMessage.length > 0 &&
            errMessage.map((e, idx) => (
              <Alert sx={{ mt: 1 }} key={idx} severity="error">
                <Box>{e.message}</Box>
                <Box sx={{ mt: 0.5 }}>
                  Field: {e.field} - {formatImportErrorValue(e.value)} | Row: {e.row}
                </Box>
              </Alert>
            ))}
        </Box>
      </GenericModal>

      <GenericModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Preview Job File"
        maxWidth={1000}
      >
        <ImportPreviewTable
          data={previewData}
          onClose={() => setPreviewOpen(false)}
        />
      </GenericModal>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
