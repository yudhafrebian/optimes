"use client";

import {
  Alert,
  alpha,
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import GenericModal from "@/components/modal/GenericModal";
import { jobsApi, lookupApi } from "@/lib/api";
import {
  CreateJobOffsetPrinterTaiyoDto,
  JobOffsetPrinterTaiyoImportErrorDto,
  JobOffsetPrinterTaiyoListResponseDto,
  JobOffsetPrinterTaiyoUploadPreviewResponseDto,
  LookupResponseDto,
} from "@/api-client";
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
      jobsApi.jobOffsetPrinterTaiyoControllerGetAll(),
      lookupApi.lookupControllerFindAll("WORK_CENTER"),
      lookupApi.lookupControllerFindAll("JOB_LIFECYCLE_STATE"),
      lookupApi.lookupControllerFindAll("JOB_PRIORITY"),
    ]);

  return {
    orders: orderRes.data,
    workCenters: workCenterRes.data,
    lifecycles: lifecycleRes.data,
    priorities: priorityRes.data,
  };
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

    return (filterData?.orders ?? [])
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
  }, [filterData?.orders]);

  const salesOrderList = useMemo(() => {
    const seen = new Set<string>();

    return (filterData?.orders ?? [])
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
  }, [filterData?.orders]);

  const lifeCycleOptions = (filterData?.lifecycles ?? []).map((item) => ({
    label: item.label,
    value: item.label,
  }));

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
        await jobsApi.jobOffsetPrinterTaiyoControllerUploadExcelPreview(file);
      const previewRes = res.data;
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
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
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
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            {isJobManagement ? "Job List" : "Job Report List"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={onRefresh}
                color="primary"
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                color="success"
                onClick={() => setImportOpen(true)}
              >
                Import Excel
              </Button>
            )}
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add Job
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            alignItems: "center",
            width: "100%",
            p: 2,
            overflowX: "auto",
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
            sx={{ minWidth: 150 }}
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
            sx={{ minWidth: 150 }}
            renderInput={(params) => (
              <TextField {...params} label="Sales Order" />
            )}
          />

          <FormControl size="small" sx={{ minWidth: "150px" }}>
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
                sx: { width: 150 },
              },
            }}
          />
          {/* Filter Lifecycle */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-lifecycle-label">Lifecycle</InputLabel>
            <Select
              labelId="filter-lifecycle-label"
              label="Lifecycle"
              value={lifecycleFilter}
              onChange={(e) => onFilterLifecycle(e.target.value)}
            >
              <MenuItem value="All">All Lifecycle</MenuItem>
              {isJobManagement
                ? lifeCycleOptions
                    .map((l) => (
                      <MenuItem key={l.label} value={l.label}>
                        {l.label}
                      </MenuItem>
                    ))
                    .filter(
                      (t) =>
                        t.props.value !== "Closed" &&
                        t.props.value !== "Completed",
                    )
                : lifeCycleOptions
                    .map((l) => (
                      <MenuItem key={l.label} value={l.label}>
                        {l.label}
                      </MenuItem>
                    ))
                    .filter(
                      (t) =>
                        t.props.value !== "Scheduled" &&
                        t.props.value !== "Released" &&
                        t.props.value !== "Running" &&
                        t.props.value !== "Suspended",
                    )}
            </Select>
          </FormControl>
          {/* Filter Type */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
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
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

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
                {e.message}
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
